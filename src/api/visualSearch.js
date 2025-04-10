import axios from 'axios';
import { dummyProducts } from '../data/dummyProducts';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3004/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('Response error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    throw error;
  }
);

// Function to simulate image comparison
const compareImages = (image1, image2) => {
  // Check if the images are the same URL
  if (image1 === image2) {
    return 1.0; // Perfect match
  }
  
  // Extract image URLs from the dummy products
  const dummyImageUrls = dummyProducts.map(product => product.image);
  
  // Check if the uploaded image URL matches any of the dummy product images
  if (dummyImageUrls.includes(image1)) {
    // If the uploaded image is one of our dummy products, give it a high similarity
    return 0.95;
  }
  
  // For other cases, generate a random similarity score
  // but make it lower than exact matches
  return Math.random() * 0.3 + 0.5; // Random score between 0.5 and 0.8
};

// Function to check if a port is available
const checkPort = async (port) => {
  try {
    const response = await fetch(`http://localhost:${port}/api/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Function to find the active server port
const findActivePort = async () => {
  const ports = [3001, 3002, 3003, 3004, 3005];
  for (const port of ports) {
    if (await checkPort(port)) {
      return port;
    }
  }
  return 3001; // Default fallback
};

const getApiUrl = async () => {
  const port = await findActivePort();
  return `http://localhost:${port}/api`;
};

export const visualSearchService = {
  // Upload image and get similar products
  searchByImage: async (formData) => {
    try {
      // Validate inputs
      if (!formData || !(formData instanceof FormData)) {
        throw new Error('Invalid form data');
      }
      
      if (!formData.get('image')) {
        throw new Error('No image selected');
      }

      // Get the image file
      const imageFile = formData.get('image');
      
      // Create a URL for the image
      const imageUrl = URL.createObjectURL(imageFile);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if the uploaded image matches any of our dummy products
      const matchingProduct = dummyProducts.find(product => {
        // In a real implementation, we would compare image features
        // For this demo, we'll check if the image URL is in our dummy data
        return product.image === imageUrl;
      });
      
      // Find similar products from dummy data
      let similarProducts;
      
      if (matchingProduct) {
        // If we found an exact match, prioritize it and similar items
        similarProducts = dummyProducts
          .map(product => {
            // Give the exact match a perfect score
            if (product.id === matchingProduct.id) {
              return { ...product, similarity: 1.0 };
            }
            
            // Give similar items (same category, metal type, or stone type) higher scores
            const isSimilarCategory = product.category === matchingProduct.category;
            const isSimilarMetal = product.metalType === matchingProduct.metalType;
            const isSimilarStone = product.stoneType === matchingProduct.stoneType;
            
            let similarity = 0.5; // Base similarity
            
            if (isSimilarCategory) similarity += 0.2;
            if (isSimilarMetal) similarity += 0.15;
            if (isSimilarStone) similarity += 0.15;
            
            return { ...product, similarity };
          })
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 8); // Return top 8 matches
      } else {
        // If no exact match, use the compareImages function
        similarProducts = dummyProducts
          .map(product => ({
            ...product,
            similarity: compareImages(imageUrl, product.image)
          }))
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 8); // Return top 8 matches
      }
      
      // Clean up the object URL
      URL.revokeObjectURL(imageUrl);
      
      return {
        success: true,
        results: similarProducts,
        message: 'Search completed successfully'
      };
    } catch (error) {
      console.error('Visual search error:', error);
      throw visualSearchService.handleError(error);
    }
  },

  // Search by base64 image
  searchByBase64Image: async (base64Image) => {
    try {
      if (!base64Image) {
        throw new Error('No image data provided');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Find similar products from dummy data
      const similarProducts = dummyProducts
        .map(product => ({
          ...product,
          similarity: compareImages(base64Image, product.image)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 8); // Return top 8 matches
      
      return {
        success: true,
        results: similarProducts,
        message: 'Search completed successfully'
      };
    } catch (error) {
      console.error('Visual search error:', error);
      throw visualSearchService.handleError(error);
    }
  },

  // Error handler
  handleError: (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return new Error('Please select a valid image');
        case 503:
          return new Error('AI model is initializing. Please try again in a few moments.');
        case 404:
          return new Error('No matching products found');
        default:
          return new Error(error.response?.data?.error || 'Failed to process image');
      }
    }
    return error;
  },

  // Get product details by ID
  getProductById: async (productId) => {
    try {
      // Find product in dummy data
      const product = dummyProducts.find(p => p.id === productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product details');
    }
  },

  // Get similar products based on features
  getSimilarProducts: async (features) => {
    try {
      // Find similar products in dummy data based on features
      const similarProducts = dummyProducts
        .filter(product => 
          (features.metalType && product.metalType === features.metalType) ||
          (features.stoneType && product.stoneType === features.stoneType) ||
          (features.category && product.category === features.category)
        )
        .slice(0, 4);
      
      return similarProducts;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch similar products');
    }
  }
}; 