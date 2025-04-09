const mongoose = require('mongoose');
const { Schema } = mongoose;

// Product Schema
const productSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  features: Array,
  metalType: String,
  stoneType: String,
  style: String,
});

const Product = mongoose.model('Product', productSchema);

// Sample data
const sampleProducts = [
  {
    name: "Diamond Solitaire Ring",
    price: 2999.99,
    image: "https://example.com/images/ring1.jpg",
    category: "Rings",
    features: Array.from({length: 512}, () => Math.random()), // Placeholder feature vector
    metalType: "White Gold",
    stoneType: "Diamond",
    style: "Classic"
  },
  {
    name: "Pearl Drop Earrings",
    price: 599.99,
    image: "https://example.com/images/earrings1.jpg",
    category: "Earrings",
    features: Array.from({length: 512}, () => Math.random()), // Placeholder feature vector
    metalType: "Yellow Gold",
    stoneType: "Pearl",
    style: "Modern"
  },
  {
    name: "Sapphire Tennis Bracelet",
    price: 1499.99,
    image: "https://example.com/images/bracelet1.jpg",
    category: "Bracelets",
    features: Array.from({length: 512}, () => Math.random()), // Placeholder feature vector
    metalType: "White Gold",
    stoneType: "Sapphire",
    style: "Luxury"
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jewellery_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${result.length} sample products`);
    
    console.log('Sample data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(error => {
  console.error('MongoDB connection error:', error);
}); 