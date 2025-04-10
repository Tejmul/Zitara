import React from 'react';
import { Link } from 'react-router-dom';

// Collections data with images from our dummy data
const collections = [
  {
    id: 1,
    name: 'RINGS',
    link: '/rings',
    image: 'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg',
    description: 'Timeless engagement rings and statement pieces crafted with precision'
  },
  {
    id: 2,
    name: 'NECKLACES',
    link: '/necklaces',
    image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg',
    description: 'Elegant necklaces designed for memorable moments'
  },
  {
    id: 3,
    name: 'EARRINGS',
    link: '/earrings',
    image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg',
    description: 'From classic studs to statement pieces that define your style'
  },
  {
    id: 4,
    name: 'BRACELETS',
    link: '/bracelets',
    image: 'https://psjewellery.in/cdn/shop/products/1nO0Oc-Zg_HUG8jWdTE4yhh8_tKeqXu8T.jpg?v=1708677795',
    description: 'Handcrafted bracelets that elevate every occasion'
  }
];

const CuratedCollections = () => {
  const handleImageError = (e) => {
    e.target.src = '/placeholder-image.jpg';
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-light tracking-wider text-gray-900 mb-12">
          CURATED COLLECTIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={collection.image}
                  alt={collection.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="text-lg tracking-[0.2em] font-light text-gray-900 mb-3">
                  {collection.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto mb-4">
                  {collection.description}
                </p>
                <div className="inline-flex items-center justify-center space-x-2 text-[#9d4e4e] group">
                  <span className="text-xs tracking-[0.2em] uppercase font-medium transition-colors group-hover:text-[#7a3d3d]">
                    Discover Collection
                  </span>
                  <svg 
                    className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections; 