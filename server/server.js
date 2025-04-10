const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');

const app = express();
const port = 3001;

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jewelry_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Product Schema
const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  features: [Number],
  metalType: String,
  stoneType: String
});

const Product = mongoose.model('Product', ProductSchema);

// Load the AI model
let model;
async function loadModel() {
  try {
    // Load MobileNet model for feature extraction
    model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    console.log('Model loaded successfully');
    return true;
  } catch (error) {
    console.error('Error loading model:', error);
    return false;
  }
}

// Load model at startup
loadModel().then(() => {
  console.log('Initial model load completed');
}).catch(err => {
  console.error('Failed to load model at startup:', err);
});

// Function to extract features from an image
async function extractFeatures(imageBuffer) {
  try {
    // Resize image to 224x224 (MobileNet input size) and convert to RGB
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(224, 224, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .removeAlpha()
      .toFormat('jpeg')
      .toBuffer();

    // Convert buffer to tensor
    const imageTensor = tf.node.decodeImage(resizedImageBuffer, 3)
      .expandDims(0)
      .toFloat()
      .div(255.0);

    // Get features from the second-to-last layer
    const features = model.predict(imageTensor);
    const featuresArray = await features.data();

    // Convert 1024 features to 512 by taking every other feature
    const reducedFeatures = Array.from(featuresArray).filter((_, i) => i % 2 === 0);

    // Normalize the features
    const magnitude = Math.sqrt(reducedFeatures.reduce((sum, val) => sum + val * val, 0));
    const normalizedFeatures = reducedFeatures.map(val => val / magnitude);

    // Cleanup
    imageTensor.dispose();
    features.dispose();

    return normalizedFeatures;
  } catch (error) {
    console.error('Error extracting features:', error);
    throw new Error('Failed to process image: ' + error.message);
  }
}

// Function to calculate cosine similarity
function cosineSimilarity(vec1, vec2) {
  if (!vec1 || !vec2 || vec1.length !== vec2.length) {
    console.error('Invalid vectors for similarity calculation:', { vec1Length: vec1?.length, vec2Length: vec2?.length });
    return 0;
  }
  
  // Both vectors should already be normalized
  const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
  return dotProduct;
}

// Visual search endpoint
app.post('/api/visual-search', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    if (!model) {
      const loaded = await loadModel();
      if (!loaded) {
        return res.status(503).json({ error: 'AI model failed to load' });
      }
    }

    // Extract features from the uploaded image
    const features = await extractFeatures(req.file.buffer);
    console.log('Extracted features length:', features.length);

    // Get all products from the database
    const products = await Product.find({});
    console.log('Found products:', products.length);

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found in database' });
    }

    // Calculate similarity scores and add confidence percentage
    const results = products.map(product => {
      const similarity = cosineSimilarity(features, product.features);
      return {
        ...product.toObject(),
        similarity,
        confidence: Math.round(similarity * 100)
      };
    });

    // Sort by similarity score (descending) and filter results with at least 25% confidence
    const filteredResults = results
      .filter(result => result.confidence >= 25)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);

    console.log('Filtered results:', filteredResults.length);
    console.log('Confidence scores:', filteredResults.map(r => r.confidence));

    if (filteredResults.length === 0) {
      return res.status(404).json({ error: 'No similar products found' });
    }

    res.json(filteredResults);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: error.message || 'Failed to process image' });
  }
});

// Visual search endpoint for base64 images
app.post('/api/visual-search/base64', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    if (!model) {
      const loaded = await loadModel();
      if (!loaded) {
        return res.status(503).json({ error: 'AI model failed to load' });
      }
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');

    // Extract features from the image
    const features = await extractFeatures(imageBuffer);

    // Get all products from the database
    const products = await Product.find({});

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found in database' });
    }

    // Calculate similarity scores and add confidence percentage
    const results = products.map(product => {
      const similarity = cosineSimilarity(features, product.features);
      return {
        ...product.toObject(),
        similarity,
        confidence: Math.round(similarity * 100)
      };
    });

    // Sort by similarity score (descending) and filter results with at least 10% confidence
    const filteredResults = results
      .filter(result => result.confidence >= 10)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);

    if (filteredResults.length === 0) {
      return res.status(404).json({ error: 'No similar products found' });
    }

    res.json(filteredResults);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: error.message || 'Failed to process image' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', modelLoaded: !!model });
});

// Get all products endpoint
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 