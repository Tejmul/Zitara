const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const { createCanvas, loadImage } = require('canvas');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jewellery_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  images: [{ url: String }],
  category: String,
  features: Array,
  metalType: String,
  stoneType: String,
  style: String,
});

const Product = mongoose.model('Product', productSchema);

// Multer configuration for image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

// Load pre-trained model
let model;
let modelLoaded = false;

async function loadModel() {
  try {
    const modelPath = 'file://' + path.join(__dirname, 'model', 'model.json');
    model = await tf.loadLayersModel(modelPath);
    modelLoaded = true;
    console.log('AI model loaded successfully');
  } catch (error) {
    console.error('Error loading AI model:', error);
    console.log('Note: Please run create_model.js first to generate the model files');
    modelLoaded = false;
  }
}

// Initialize model before starting server
async function initializeServer() {
  await loadModel();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Model status: ${modelLoaded ? 'Loaded successfully' : 'Failed to load'}`);
  });
}

// Extract features from image
async function extractFeatures(imageBuffer) {
  if (!model) {
    throw new Error('AI model not loaded');
  }

  try {
    // Create canvas and load image
    const canvas = createCanvas(224, 224);
    const ctx = canvas.getContext('2d');
    const image = await loadImage(imageBuffer);
    
    // Draw and preprocess image
    ctx.drawImage(image, 0, 0, 224, 224);
    let tensor = tf.browser.fromPixels(canvas)
      .toFloat()
      .div(255.0) // Normalize to [0,1]
      .expandDims();
    
    // Get features from model
    const features = await model.predict(tensor).data();
    
    // Clean up
    tensor.dispose();
    
    return Array.from(features);
  } catch (error) {
    console.error('Error extracting features:', error);
    throw new Error('Failed to process image: ' + error.message);
  }
}

// API Routes
app.post('/api/visual-search', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    if (!modelLoaded) {
      return res.status(503).json({ 
        message: 'AI model not ready. Please try again in a few moments.',
        modelStatus: 'not_loaded'
      });
    }

    // Extract features from uploaded image
    const features = await extractFeatures(req.file.buffer);

    // Find similar products
    const products = await Product.find({});
    
    if (!products.length) {
      return res.status(404).json({ 
        message: 'No products available for comparison',
        results: []
      });
    }

    const similarProducts = products
      .map(product => ({
        ...product.toObject(),
        similarity: calculateSimilarity(features, product.features)
      }))
      .filter(product => product.similarity > 50) // Only return products with >50% similarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6);

    res.json({
      results: similarProducts,
      total: similarProducts.length,
      message: similarProducts.length ? 'Similar products found' : 'No similar products found'
    });
  } catch (error) {
    console.error('Visual search error:', error);
    res.status(500).json({ 
      message: error.message || 'Error processing image',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Calculate cosine similarity between feature vectors
function calculateSimilarity(features1, features2) {
  if (!features1 || !features2 || features1.length !== features2.length) {
    throw new Error('Invalid feature vectors');
  }

  const dotProduct = features1.reduce((sum, val, i) => sum + val * features2[i], 0);
  const magnitude1 = Math.sqrt(features1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(features2.reduce((sum, val) => sum + val * val, 0));
  
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }
  
  return (dotProduct / (magnitude1 * magnitude2)) * 100;
}

// Product routes
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

app.post('/api/products/similar', async (req, res) => {
  try {
    const { features } = req.body;
    
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ message: 'Invalid feature vector' });
    }

    const products = await Product.find({});
    
    if (!products.length) {
      return res.status(404).json({ 
        message: 'No products available for comparison',
        results: []
      });
    }

    const similarProducts = products
      .map(product => ({
        ...product.toObject(),
        similarity: calculateSimilarity(features, product.features)
      }))
      .filter(product => product.similarity > 50)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6);

    res.json({
      results: similarProducts,
      total: similarProducts.length,
      message: similarProducts.length ? 'Similar products found' : 'No similar products found'
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error finding similar products',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Maximum size is 10MB.' });
    }
    return res.status(400).json({ message: 'Error uploading file.' });
  }
  
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Remove the old app.listen call and replace with initializeServer
initializeServer().catch(err => {
  console.error('Failed to initialize server:', err);
  process.exit(1);
}); 