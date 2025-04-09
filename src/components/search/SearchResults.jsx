// src/components/search/SearchResults.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../../contexts/SearchContext';

const SearchResults = () => {
  const { searchResults, loading, error, selectedImage } = useSearch();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Analyzing your image...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/search"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  if (!searchResults.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any similar items in our collection. Try uploading a different image or adjusting your search criteria.
          </p>
          <Link
            to="/search"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Try Another Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {selectedImage && (
              <div className="w-full md:w-1/4">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={selectedImage}
                    alt="Search reference"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Similar Items Found</h2>
              <p className="text-gray-600">
                We found {searchResults.length} items that match your search. Results are sorted by similarity.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {Math.round(product.similarity * 100)}% Match
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</p>
                  <span className="text-sm text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/search"
            className="inline-flex items-center px-8 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            New Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;