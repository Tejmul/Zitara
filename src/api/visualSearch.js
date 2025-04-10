import axios from 'axios';

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

      // Update API URL with active port
      const activePort = await findActivePort();
      apiClient.defaults.baseURL = `http://localhost:${activePort}/api`;

      // Make the visual search request
      const response = await apiClient.post('/visual-search', formData);

      // Validate response
      if (!response.data) {
        throw new Error('Failed to process image');
      }

      return {
        success: true,
        results: Array.isArray(response.data) ? response.data : [response.data],
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

      // Update API URL with active port
      const activePort = await findActivePort();
      apiClient.defaults.baseURL = `http://localhost:${activePort}/api`;

      // Make the visual search request
      const response = await apiClient.post('/visual-search/base64', {
        image: base64Image
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Validate response
      if (!response.data) {
        throw new Error('Failed to process image');
      }

      return {
        success: true,
        results: Array.isArray(response.data) ? response.data : [response.data],
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
      const response = await axios.get(`${API_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product details');
    }
  },

  // Get similar products based on features
  getSimilarProducts: async (features) => {
    try {
      const response = await axios.post(`${API_URL}/products/similar`, { features });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch similar products');
    }
  }
}; 