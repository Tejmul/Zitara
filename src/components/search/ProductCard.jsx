// src/components/search/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  // Calculate match percentage based on similarity score (0-1)
  const matchPercentage = Math.round(product.similarity * 100);
  
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="product-image" 
          loading="lazy"
        />
        
        <button 
          className="favorite-button" 
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart className="favorite-icon active" /> : <FaRegHeart className="favorite-icon" />}
        </button>
        
        {matchPercentage > 70 && (
          <div className="match-badge">
            {matchPercentage}% Match
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-material">{product.material}</span>
        </div>
        
        <div className="product-footer">
          <div className="product-price">${product.price.toLocaleString()}</div>
          
          {product.rating && (
            <div className="product-rating">
              <FaStar className="rating-star" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;