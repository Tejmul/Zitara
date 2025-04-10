import React from 'react';

const DiamondPattern = ({ className = '', opacity = 0.1 }) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diamond" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0L20 10L10 20L0 10Z" fill="#9d4e4e" fillOpacity="0.05"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamond)"/>
      </svg>
    </div>
  );
};

export default DiamondPattern; 