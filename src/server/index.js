const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./config/database');
const User = require('./models/User');
const { Product, ProductImage } = require('./models/Product');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection and model synchronization
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
    // Sync all models
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/search', require('./routes/search'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
