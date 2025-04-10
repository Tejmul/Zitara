const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function testVisualSearch() {
  try {
    // Read the image file
    const imageBase64 = fs.readFileSync(path.join(__dirname, 'test-images/diamond-ring.jpg'), 'base64');
    
    // Make the request
    const response = await axios.post('http://localhost:3005/api/visual-search/base64', {
      image: `data:image/jpeg;base64,${imageBase64}`
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Search Results:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testVisualSearch(); 