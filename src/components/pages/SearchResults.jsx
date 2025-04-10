import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSearch } from '../../contexts/SearchContext';
import ProductCard from '../search/ProductCard';

const SearchResults = () => {
  const location = useLocation();
  const { searchResults: contextResults, loading, error, selectedImage } = useSearch();
  
  // Use location state if available, otherwise use context state
  const { results, message } = location.state || { 
    results: contextResults, 
    message: error || 'No results found'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#9d4e4e] border-t-transparent"></div>
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
            to="/visual-search"
            className="inline-block bg-[#9d4e4e] hover:bg-[#8a3d3d] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-4">Search Results</h1>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-[#9d4e4e]">
              {message}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {results.length} {results.length === 1 ? 'item' : 'items'} found
            </span>
          </div>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                similarity={product.similarity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No similar items found. Try uploading a different image.
            </p>
            <Link
              to="/visual-search"
              className="inline-block px-6 py-3 bg-[#9d4e4e] text-white rounded-lg hover:bg-[#8a3d3d] transition-colors"
            >
              Try Another Search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 