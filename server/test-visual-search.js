const axios = require('axios');

// Base64 string of a diamond ring image (this is just a small sample for testing)
const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

async function testVisualSearch() {
  try {
    const response = await axios.post('http://localhost:3004/api/visual-search', {
      image: base64Image
    });
    console.log('Similar products:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testVisualSearch(); 