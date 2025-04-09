import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const visualSearchService = {
  // Upload image and get similar products
  searchByImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.post(`${API_URL}/visual-search`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to process image');
    }
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