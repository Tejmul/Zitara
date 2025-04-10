import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Heart, ShoppingBag, ChevronDown, ChevronUp, X, Plus, Minus, ArrowUpCircle } from 'lucide-react';
import CategoryProductCard from '../search/CategoryProductCard';
import { dummyProducts } from '../../data/dummyProducts';

const CategoryPage = ({ category: propCategory }) => {
  const { category: urlCategory } = useParams();
  const [priceRange, setPriceRange] = useState([799, 1599]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filters, setFilters] = useState({
    metalType: '',
    stoneType: '',
    priceRange: 'all'
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [isLoading, setIsLoading] = useState(false);

  // Use the prop category if available, otherwise use the URL category
  const categoryName = propCategory || urlCategory || '';

  const products = dummyProducts.filter(product => 
    product.category && product.category.toLowerCase() === categoryName.toLowerCase()
  );

  const filteredProducts = products.filter(product => {
    if (filters.metalType && product.metalType !== filters.metalType) return false;
    if (filters.stoneType && product.stoneType !== filters.stoneType) return false;
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });

  const metalTypes = [...new Set(products.map(product => product.metalType).filter(Boolean))];
  const stoneTypes = [...new Set(products.map(product => product.stoneType).filter(Boolean))];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (type, value) => {
    setIsLoading(true);
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleSortChange = (value) => {
    setIsLoading(true);
    setSortBy(value);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{categoryName} Collection</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select
            className="p-2 border rounded-md"
            value={filters.metalType}
            onChange={(e) => setFilters(prev => ({ ...prev, metalType: e.target.value }))}
          >
            <option value="">All Metals</option>
            {metalTypes.map(type => (
              <option key={type} value={type}>
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded-md"
            value={filters.stoneType}
            onChange={(e) => setFilters(prev => ({ ...prev, stoneType: e.target.value }))}
          >
            <option value="">All Stones</option>
            {stoneTypes.map(type => (
              <option key={type} value={type}>
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded-md"
            value={filters.priceRange}
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
          >
            <option value="all">All Prices</option>
            <option value="0-1000">Under $1,000</option>
            <option value="1000-2000">$1,000 - $2,000</option>
            <option value="2000-5000">$2,000 - $5,000</option>
            <option value="5000-999999">Over $5,000</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <CategoryProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No {categoryName.toLowerCase()} found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
      >
        <ArrowUpCircle size={24} />
      </button>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
};

export default CategoryPage; 