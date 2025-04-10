import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import '../styles/filters.css';

const ZitharaJewelry = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    price: '',
    metal: '',
    stone: '',
    style: ''
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 300);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredProducts = products.filter(product => {
    if (filters.price && product.price > parseFloat(filters.price)) return false;
    if (filters.metal && product.metalType !== filters.metal) return false;
    if (filters.stone && product.stoneType !== filters.stone) return false;
    if (filters.style && product.style !== filters.style) return false;
    return true;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9d4e4e]"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-8">
      <p className="text-red-500">{error}</p>
      <button 
        onClick={fetchProducts}
        className="mt-4 px-4 py-2 bg-[#9d4e4e] text-white rounded hover:bg-[#8a3d3d]"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 lg:w-72">
          <div className="sticky top-4 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-[#1a1a1a]">Filters</h2>
            
            {/* Price Filter */}
            <div className="filter-section">
              <h3 className="filter-title">Price Range</h3>
              <div className="filter-options">
                {['1000', '2000', '3000', '4000'].map(price => (
                  <label key={price} className="filter-option">
                    <input
                      type="radio"
                      name="price"
                      value={price}
                      checked={filters.price === price}
                      onChange={(e) => handleFilterChange('price', e.target.value)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label">Under ${price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Metal Type Filter */}
            <div className="filter-section">
              <h3 className="filter-title">Metal Type</h3>
              <div className="filter-options">
                {['white-gold', 'yellow-gold', 'rose-gold'].map(metal => (
                  <label key={metal} className="filter-option">
                    <input
                      type="radio"
                      name="metal"
                      value={metal}
                      checked={filters.metal === metal}
                      onChange={(e) => handleFilterChange('metal', e.target.value)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label capitalize">{metal.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stone Type Filter */}
            <div className="filter-section">
              <h3 className="filter-title">Stone Type</h3>
              <div className="filter-options">
                {['diamond', 'pearl', 'sapphire', 'ruby', 'emerald'].map(stone => (
                  <label key={stone} className="filter-option">
                    <input
                      type="radio"
                      name="stone"
                      value={stone}
                      checked={filters.stone === stone}
                      onChange={(e) => handleFilterChange('stone', e.target.value)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label capitalize">{stone}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Style Filter */}
            <div className="filter-section">
              <h3 className="filter-title">Style</h3>
              <div className="filter-options">
                {['classic', 'modern', 'vintage', 'contemporary'].map(style => (
                  <label key={style} className="filter-option">
                    <input
                      type="radio"
                      name="style"
                      value={style}
                      checked={filters.style === style}
                      onChange={(e) => handleFilterChange('style', e.target.value)}
                      className="filter-checkbox"
                    />
                    <span className="filter-label capitalize">{style}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() => setFilters({ price: '', metal: '', stone: '', style: '' })}
              className="w-full mt-6 px-4 py-2 text-sm text-[#9d4e4e] border border-[#9d4e4e] rounded hover:bg-[#9d4e4e] hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#1a1a1a]/60">No products match your filters</p>
              <button
                onClick={() => setFilters({ price: '', metal: '', stone: '', style: '' })}
                className="mt-4 px-4 py-2 text-sm text-[#9d4e4e] border border-[#9d4e4e] rounded hover:bg-[#9d4e4e] hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#9d4e4e] text-white rounded-full shadow-lg hover:bg-[#8a3d3d] transition-colors"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ZitharaJewelry; 