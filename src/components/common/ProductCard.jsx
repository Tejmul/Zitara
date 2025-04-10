import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Quick view:', product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Add to cart:', product.id);
  };

  // Format price with commas and ensure 2 decimal places
  const formatPrice = (price) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Format category name
  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageError ? '/placeholder-image.jpg' : product.image}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Category Label */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs uppercase tracking-wider font-medium text-[#1a1a1a] rounded-full shadow-sm">
            {formatCategory(product.category)}
          </span>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-4">
            <button
              onClick={handleQuickView}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5 text-[#1a1a1a]" />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#1a1a1a]" />
            </button>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 ${isFavorite(product.id) ? 'text-[#9d4e4e] fill-current' : 'text-[#1a1a1a]'}`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block group">
          <h3 className="font-serif text-lg text-[#1a1a1a] mb-2 group-hover:text-[#9d4e4e] transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-[#9d4e4e] font-medium tracking-wide">
              ${formatPrice(product.price)}
            </p>
            <div className="flex items-center space-x-2">
              {product.metalType && (
                <span className="text-sm font-medium text-[#1a1a1a]/70">
                  {product.metalType.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              )}
              {product.stoneType && (
                <>
                  <span className="text-[#1a1a1a]/30">•</span>
                  <span className="text-sm font-medium text-[#1a1a1a]/70">
                    {product.stoneType.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 