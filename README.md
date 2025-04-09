# Visual Search Jewellery

A modern e-commerce platform for jewelry with visual search capabilities. Users can search for jewelry items by uploading images, and the platform will find similar items using AI-powered visual search.

## Features

- Visual search functionality using AI
- Comprehensive jewelry catalog
- Advanced filtering options (metal type, stone, style, price range)
- Responsive design
- Product quick view
- Wishlist functionality

## Tech Stack

- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express
- AI Model: TensorFlow.js
- Image Processing: Canvas API
- State Management: React Context
- Routing: React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd visual-search-jewellery
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install
```

3. Create the AI model:
```bash
cd server
node create_model.js
```

4. Start the development servers:
```bash
# Start the backend server (from the server directory)
npm run server

# Start the frontend development server (from the root directory)
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:3001
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
