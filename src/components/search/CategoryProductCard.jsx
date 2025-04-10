import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

const CategoryProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const handleImageError = () => {
    setImageError(true);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="block relative">
        <div className="relative aspect-square">
          <img
            src={imageError ? '/placeholder-image.jpg' : product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 ${isFavorite(product.id) ? 'text-[#9d4e4e] fill-current' : 'text-gray-600'}`}
            />
          </button>
        </div>
        
        <div className="p-4">
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-[#9d4e4e]/80">
              {product.category}
            </span>
          </div>
          
          {/* Product Name */}
          <h3 className="font-serif text-base sm:text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          
          {/* Product Details */}
          <div className="flex flex-col gap-2">
            {/* Price */}
            <div className="text-lg font-medium text-[#9d4e4e]">
              ${product.price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </div>
            
            {/* Metal and Stone Type */}
            <div className="flex items-center text-sm text-gray-600 font-medium">
              {product.metalType && (
                <span className="capitalize">
                  {product.metalType.replace(/-/g, ' ')}
                </span>
              )}
              {product.metalType && product.stoneType && (
                <span className="mx-2 text-gray-400">•</span>
              )}
              {product.stoneType && (
                <span className="capitalize">
                  {product.stoneType.replace(/-/g, ' ')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductCard; 