import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp, X, Heart, ShoppingBag, Search, ArrowUpCircle } from 'lucide-react';

const JewelryCategory = ({ category, title, description }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    metalType: 'all',
    stoneType: 'all',
    style: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    fetchProducts();
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filters, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // In a real application, you would fetch from your API
      // For now, we'll use mock data
      const mockProducts = [
        {
          id: 1,
          name: `${category} Item 1`,
          price: 1299.99,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'white-gold',
          stoneType: 'diamond',
          style: 'classic',
          category: category.toLowerCase()
        },
        {
          id: 2,
          name: `${category} Item 2`,
          price: 899.99,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'rose-gold',
          stoneType: 'sapphire',
          style: 'modern',
          category: category.toLowerCase()
        },
        {
          id: 3,
          name: `${category} Item 3`,
          price: 1499.99,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'yellow-gold',
          stoneType: 'ruby',
          style: 'vintage',
          category: category.toLowerCase()
        },
        {
          id: 4,
          name: `${category} Item 4`,
          price: 799.99,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'platinum',
          stoneType: 'emerald',
          style: 'contemporary',
          category: category.toLowerCase()
        },
        // Add more mock products as needed
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Apply filters
      let filteredProducts = [...mockProducts];
      
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
          if (max) {
            return product.price >= min && product.price <= max;
          } else {
            return product.price >= min;
          }
        });
      }
      
      if (filters.metalType !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.metalType === filters.metalType);
      }
      
      if (filters.stoneType !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.stoneType === filters.stoneType);
      }
      
      if (filters.style !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.style === filters.style);
      }
      
      // Apply sorting
      if (sortBy === 'price-low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'newest') {
        // In a real app, you would sort by date
        filteredProducts.sort((a, b) => b.id - a.id);
      }
      
      setProducts(filteredProducts);
      setError('');
    } catch (err) {
      setError(`Failed to load ${category.toLowerCase()}. Please try again later.`);
      console.error(`Error fetching ${category.toLowerCase()}:`, err);
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

  const clearFilters = () => {
    setFilters({
      priceRange: 'all',
      metalType: 'all',
      stoneType: 'all',
      style: 'all'
    });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you would implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const addToCart = (productId) => {
    // In a real app, you would add to cart
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', productId);
  };

  const addToWishlist = (productId) => {
    // In a real app, you would add to wishlist
    setWishlistCount(prev => prev + 1);
    console.log('Added to wishlist:', productId);
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <p>Free shipping on orders over $100 | 30-day returns</p>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="font-serif text-lg text-charcoal hover:text-burgundy transition-colors">Zithara</Link>
              <Link to="/rings" className="nav-link">Rings</Link>
              <Link to="/necklaces" className="nav-link">Necklaces</Link>
              <Link to="/earrings" className="nav-link">Earrings</Link>
              <Link to="/bracelets" className="nav-link">Bracelets</Link>
            </nav>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 pl-10 pr-4 py-2 border-b border-charcoal/20 focus:border-burgundy transition-colors bg-transparent"
                  />
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal/60" size={20} />
                </form>
              </div>
              
              <button className="nav-link relative group">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="cart-badge">{wishlistCount}</span>
                )}
                <div className="user-menu">
                  <div className="user-menu-item">View Wishlist</div>
                </div>
              </button>
              
              <button className="nav-link relative group">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
                <div className="user-menu">
                  <div className="user-menu-item">View Cart</div>
                  <div className="user-menu-item">Checkout</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8">
          <Link to="/" className="text-charcoal/60 hover:text-burgundy transition-colors">Home</Link>
          <ChevronDown className="rotate-90 mx-2 text-charcoal/40" size={14} />
          <span className="font-medium text-charcoal">{title}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="md:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-serif text-lg mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="filter-section">
                  <h4 className="filter-title">Price Range</h4>
                  <div className="filter-options">
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="price-all"
                        name="price"
                        value="all"
                        checked={filters.priceRange === 'all'}
                        onChange={() => handleFilterChange('priceRange', 'all')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="price-all" className="filter-label">All Prices</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="price-0-500"
                        name="price"
                        value="0-500"
                        checked={filters.priceRange === '0-500'}
                        onChange={() => handleFilterChange('priceRange', '0-500')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="price-0-500" className="filter-label">Under $500</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="price-500-1000"
                        name="price"
                        value="500-1000"
                        checked={filters.priceRange === '500-1000'}
                        onChange={() => handleFilterChange('priceRange', '500-1000')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="price-500-1000" className="filter-label">$500 - $1,000</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="price-1000-2000"
                        name="price"
                        value="1000-2000"
                        checked={filters.priceRange === '1000-2000'}
                        onChange={() => handleFilterChange('priceRange', '1000-2000')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="price-1000-2000" className="filter-label">$1,000 - $2,000</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="price-2000"
                        name="price"
                        value="2000"
                        checked={filters.priceRange === '2000'}
                        onChange={() => handleFilterChange('priceRange', '2000')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="price-2000" className="filter-label">$2,000+</label>
                    </div>
                  </div>
                </div>

                {/* Metal Type */}
                <div className="filter-section">
                  <h4 className="filter-title">Metal Type</h4>
                  <div className="filter-options">
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="metal-all"
                        name="metal"
                        value="all"
                        checked={filters.metalType === 'all'}
                        onChange={() => handleFilterChange('metalType', 'all')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="metal-all" className="filter-label">All Metals</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="metal-white-gold"
                        name="metal"
                        value="white-gold"
                        checked={filters.metalType === 'white-gold'}
                        onChange={() => handleFilterChange('metalType', 'white-gold')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="metal-white-gold" className="filter-label">White Gold</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="metal-yellow-gold"
                        name="metal"
                        value="yellow-gold"
                        checked={filters.metalType === 'yellow-gold'}
                        onChange={() => handleFilterChange('metalType', 'yellow-gold')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="metal-yellow-gold" className="filter-label">Yellow Gold</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="metal-rose-gold"
                        name="metal"
                        value="rose-gold"
                        checked={filters.metalType === 'rose-gold'}
                        onChange={() => handleFilterChange('metalType', 'rose-gold')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="metal-rose-gold" className="filter-label">Rose Gold</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="metal-platinum"
                        name="metal"
                        value="platinum"
                        checked={filters.metalType === 'platinum'}
                        onChange={() => handleFilterChange('metalType', 'platinum')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="metal-platinum" className="filter-label">Platinum</label>
                    </div>
                  </div>
                </div>

                {/* Stone Type */}
                <div className="filter-section">
                  <h4 className="filter-title">Stone Type</h4>
                  <div className="filter-options">
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="stone-all"
                        name="stone"
                        value="all"
                        checked={filters.stoneType === 'all'}
                        onChange={() => handleFilterChange('stoneType', 'all')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="stone-all" className="filter-label">All Stones</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="stone-diamond"
                        name="stone"
                        value="diamond"
                        checked={filters.stoneType === 'diamond'}
                        onChange={() => handleFilterChange('stoneType', 'diamond')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="stone-diamond" className="filter-label">Diamond</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="stone-sapphire"
                        name="stone"
                        value="sapphire"
                        checked={filters.stoneType === 'sapphire'}
                        onChange={() => handleFilterChange('stoneType', 'sapphire')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="stone-sapphire" className="filter-label">Sapphire</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="stone-ruby"
                        name="stone"
                        value="ruby"
                        checked={filters.stoneType === 'ruby'}
                        onChange={() => handleFilterChange('stoneType', 'ruby')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="stone-ruby" className="filter-label">Ruby</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="stone-emerald"
                        name="stone"
                        value="emerald"
                        checked={filters.stoneType === 'emerald'}
                        onChange={() => handleFilterChange('stoneType', 'emerald')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="stone-emerald" className="filter-label">Emerald</label>
                    </div>
                  </div>
                </div>

                {/* Style */}
                <div className="filter-section">
                  <h4 className="filter-title">Style</h4>
                  <div className="filter-options">
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="style-all"
                        name="style"
                        value="all"
                        checked={filters.style === 'all'}
                        onChange={() => handleFilterChange('style', 'all')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="style-all" className="filter-label">All Styles</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="style-classic"
                        name="style"
                        value="classic"
                        checked={filters.style === 'classic'}
                        onChange={() => handleFilterChange('style', 'classic')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="style-classic" className="filter-label">Classic</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="style-modern"
                        name="style"
                        value="modern"
                        checked={filters.style === 'modern'}
                        onChange={() => handleFilterChange('style', 'modern')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="style-modern" className="filter-label">Modern</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="style-vintage"
                        name="style"
                        value="vintage"
                        checked={filters.style === 'vintage'}
                        onChange={() => handleFilterChange('style', 'vintage')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="style-vintage" className="filter-label">Vintage</label>
                    </div>
                    <div className="filter-option">
                      <input
                        type="radio"
                        id="style-contemporary"
                        name="style"
                        value="contemporary"
                        checked={filters.style === 'contemporary'}
                        onChange={() => handleFilterChange('style', 'contemporary')}
                        className="filter-checkbox"
                      />
                      <label htmlFor="style-contemporary" className="filter-label">Contemporary</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="font-serif text-3xl text-charcoal mb-2">{title}</h1>
                <p className="text-charcoal/60">
                  {description}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <span className="text-sm text-charcoal/60">{products.length} products</span>
                
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="sort-select"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="loading-spinner"></div>
                <p className="ml-3 text-charcoal/60">Loading {category.toLowerCase()}...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="btn-secondary"
                >
                  Try Again
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-charcoal/60 mb-4">No {category.toLowerCase()} found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="product-card group">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button 
                          onClick={() => addToCart(product.id)}
                          className="w-full btn-primary mb-2"
                        >
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => addToWishlist(product.id)}
                          className="w-full btn-secondary"
                        >
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <Link to={`/products/${product.id}`} className="block">
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-price">${product.price.toLocaleString()}</p>
                        <p className="product-category">
                          {product.metalType.replace('-', ' ').charAt(0).toUpperCase() + product.metalType.slice(1).replace('-', ' ')} • 
                          {product.stoneType.charAt(0).toUpperCase() + product.stoneType.slice(1)}
                        </p>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-burgundy text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-burgundy-dark transition-colors duration-200"
        >
          <ArrowUpCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default JewelryCategory; 