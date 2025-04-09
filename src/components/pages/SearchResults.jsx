import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, ChevronUp, X, ArrowUp, Camera } from 'lucide-react';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    metal: [],
    stone: [],
    style: [],
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Sample search results data
  const sampleSearchResults = [
    {
      id: 1,
      name: 'Diamond Solitaire Ring',
      price: 2999.99,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'Classic solitaire ring featuring a brilliant cut diamond.',
      features: ['18K White Gold', 'VS1 Clarity', 'D Color'],
    },
    // ... more sample products
  ];

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

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3001/api/visual-search', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Announcement Bar */}
      <div className="bg-burgundy text-white py-2 text-center text-sm">
        <p>Free shipping on orders over $500 | 30-day returns</p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={() => navigate(-1)} className="text-charcoal hover:text-burgundy">
                <ChevronUp className="w-6 h-6 transform rotate-90" />
              </button>
              <h1 className="ml-4 font-serif text-xl text-charcoal">Search Results</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="visual-search-input"
                />
                <label
                  htmlFor="visual-search-input"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                >
                  <Camera size={20} />
                  <span>{isUploading ? 'Uploading...' : 'Visual Search'}</span>
                </label>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-charcoal hover:text-burgundy"
              >
                <Filter className="w-5 h-5 mr-1" />
                Filters
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-transparent pl-3 pr-8 py-1 text-charcoal focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-lg text-charcoal">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-charcoal hover:text-burgundy"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-charcoal mb-2">Price Range</h3>
                <div className="price-slider">
                  <div
                    className="price-slider-handle"
                    style={{ left: `${(filters.priceRange[0] / 10000) * 100}%` }}
                  />
                  <div
                    className="price-slider-handle"
                    style={{ left: `${(filters.priceRange[1] / 10000) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-charcoal/60">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Metal Type */}
              <div className="mb-6">
                <h3 className="font-medium text-charcoal mb-2">Metal</h3>
                {['Gold', 'Silver', 'Platinum', 'Rose Gold'].map((metal) => (
                  <label key={metal} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={filters.metal.includes(metal)}
                      onChange={() => handleFilterChange('metal', metal)}
                      className="form-checkbox text-burgundy rounded border-charcoal/20"
                    />
                    <span className="ml-2 text-charcoal/80">{metal}</span>
                  </label>
                ))}
              </div>

              {/* Stone Type */}
              <div className="mb-6">
                <h3 className="font-medium text-charcoal mb-2">Stone</h3>
                {['Diamond', 'Ruby', 'Sapphire', 'Emerald'].map((stone) => (
                  <label key={stone} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={filters.stone.includes(stone)}
                      onChange={() => handleFilterChange('stone', stone)}
                      className="form-checkbox text-burgundy rounded border-charcoal/20"
                    />
                    <span className="ml-2 text-charcoal/80">{stone}</span>
                  </label>
                ))}
              </div>

              {/* Style */}
              <div>
                <h3 className="font-medium text-charcoal mb-2">Style</h3>
                {['Classic', 'Modern', 'Vintage', 'Contemporary'].map((style) => (
                  <label key={style} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={filters.style.includes(style)}
                      onChange={() => handleFilterChange('style', style)}
                      className="form-checkbox text-burgundy rounded border-charcoal/20"
                    />
                    <span className="ml-2 text-charcoal/80">{style}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="product-card group"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <button className="quick-view-button">
                      Quick View
                    </button>
                    <button className="wishlist-button">
                      <svg className="w-4 h-4 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-charcoal mb-1">{product.name}</h3>
                    <p className="text-burgundy font-medium">${product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
};

export default SearchResults; 