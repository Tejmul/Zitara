import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, ChevronDown, ArrowUpCircle } from 'lucide-react';

const ZitharaJewelry = ({ category = "Rings" }) => {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    metalType: 'all',
    stoneType: 'all',
    style: 'all'
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Monitor scrolling for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch products when filters or sorting changes
  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy, category]);

  // Mock data based on category
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call with the category as a parameter
      // Mock product data with appropriate images for each category
      const mockProducts = [
        {
          id: 1,
          name: 'Classic Diamond Ring',
          price: 1299,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'white-gold',
          stoneType: 'diamond',
          style: 'classic',
          category: category.toLowerCase()
        },
        {
          id: 2,
          name: 'Sapphire Engagement Ring',
          price: 899,
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'rose-gold',
          stoneType: 'sapphire',
          style: 'modern',
          category: category.toLowerCase()
        },
        {
          id: 3,
          name: 'Vintage Ruby Ring',
          price: 999,
          image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'yellow-gold',
          stoneType: 'ruby',
          style: 'vintage',
          category: category.toLowerCase()
        },
        {
          id: 4,
          name: 'Pearl Drop Necklace',
          price: 799,
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'white-gold',
          stoneType: 'pearl',
          style: 'classic',
          category: category.toLowerCase()
        },
        {
          id: 5,
          name: 'Diamond Stud Earrings',
          price: 1599,
          image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'platinum',
          stoneType: 'diamond',
          style: 'modern',
          category: category.toLowerCase()
        },
        {
          id: 6,
          name: 'Tennis Bracelet',
          price: 2000,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          metalType: 'white-gold',
          stoneType: 'diamond',
          style: 'classic',
          category: category.toLowerCase()
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
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
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', productId);
  };

  const addToWishlist = (productId) => {
    setWishlistCount(prev => prev + 1);
    console.log('Added to wishlist:', productId);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* Announcement Bar */}
      <div className="bg-[#2d3142] text-white text-center py-2 text-sm">
        <p>Free shipping on orders over $100 | 30-day returns</p>
      </div>

      {/* Header */}
      <header className="bg-[#f8f5f2] py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center">
                <img src="/path-to-logo.png" alt="Zithara Jewellery" className="h-8 mr-2" />
                <span className="font-serif text-2xl text-[#2d3142]">Zithara</span>
              </Link>
              
              <nav className="hidden md:flex space-x-6">
                <Link to="/rings" className="text-[#2d3142] hover:text-[#9d4e4e] transition-colors">Rings</Link>
                <Link to="/necklaces" className="text-[#2d3142] hover:text-[#9d4e4e] transition-colors">Necklaces</Link>
                <Link to="/earrings" className="text-[#2d3142] hover:text-[#9d4e4e] transition-colors">Earrings</Link>
                <Link to="/bracelets" className="text-[#2d3142] hover:text-[#9d4e4e] transition-colors">Bracelets</Link>
              </nav>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Visual Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-[#d3d3d3] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#9d4e4e] focus:border-[#9d4e4e]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c636e]" size={18} />
                </form>
              </div>
              
              <button className="relative">
                <Heart size={20} className="text-[#2d3142]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#9d4e4e] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              
              <button className="relative">
                <ShoppingBag size={20} className="text-[#2d3142]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#9d4e4e] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="hidden md:flex space-x-4">
                <Link to="/login" className="text-[#2d3142] hover:text-[#9d4e4e] transition-colors">Login</Link>
                <Link to="/register" className="text-[#2d3142] hover:text-[#9d4e4e] transition-colors">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#f8f5f2] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl text-[#2d3142] mb-6">Discover Your Perfect Jewellery Match</h1>
            <p className="text-lg text-[#5c636e] mb-8">
              Experience our innovative visual search technology to find exquisite pieces that
              match your unique style and preferences.
            </p>
            <button 
              className="bg-[#9d4e4e] hover:bg-[#7a3e3e] text-white py-3 px-8 rounded-md flex items-center"
              onClick={() => setSearchQuery('visual search')}
            >
              <Search size={18} className="mr-2" />
              Begin Visual Search
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-[#f8f5f2] py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-8">
            <Link to="/" className="text-[#5c636e] hover:text-[#9d4e4e] transition-colors">Home</Link>
            <ChevronDown className="rotate-90 mx-2 text-[#5c636e]" size={14} />
            <span className="font-medium text-[#2d3142]">{category}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="md:w-64 shrink-0">
              <div className="sticky top-24 space-y-6 bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-serif text-xl text-[#2d3142] mb-6">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="flex justify-between items-center font-medium mb-4 text-[#2d3142]">
                    Price Range 
                    <ChevronDown size={16} className="text-[#9d4e4e]" />
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-all"
                        name="price"
                        value="all"
                        checked={filters.priceRange === 'all'}
                        onChange={() => handleFilterChange('priceRange', 'all')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="price-all" className="text-[#5c636e]">All Prices</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-0-500"
                        name="price"
                        value="0-500"
                        checked={filters.priceRange === '0-500'}
                        onChange={() => handleFilterChange('priceRange', '0-500')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="price-0-500" className="text-[#5c636e]">Under ₹799</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-500-1000"
                        name="price"
                        value="500-1000"
                        checked={filters.priceRange === '500-1000'}
                        onChange={() => handleFilterChange('priceRange', '500-1000')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="price-500-1000" className="text-[#5c636e]">₹799 - ₹1599</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="price-1000-2000"
                        name="price"
                        value="1000-2000"
                        checked={filters.priceRange === '1000-2000'}
                        onChange={() => handleFilterChange('priceRange', '1000-2000')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="price-1000-2000" className="text-[#5c636e]">₹1599 - ₹2000</label>
                    </div>
                  </div>
                </div>

                {/* Metal Type */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="flex justify-between items-center font-medium mb-4 text-[#2d3142]">
                    Metal 
                    <ChevronDown size={16} className="text-[#9d4e4e]" />
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="metal-gold"
                        checked={filters.metalType === 'yellow-gold'}
                        onChange={() => handleFilterChange('metalType', filters.metalType === 'yellow-gold' ? 'all' : 'yellow-gold')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="metal-gold" className="text-[#5c636e]">Gold</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="metal-silver"
                        checked={filters.metalType === 'white-gold'}
                        onChange={() => handleFilterChange('metalType', filters.metalType === 'white-gold' ? 'all' : 'white-gold')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="metal-silver" className="text-[#5c636e]">Silver</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="metal-rose-gold"
                        checked={filters.metalType === 'rose-gold'}
                        onChange={() => handleFilterChange('metalType', filters.metalType === 'rose-gold' ? 'all' : 'rose-gold')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="metal-rose-gold" className="text-[#5c636e]">Rose Gold</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="metal-platinum"
                        checked={filters.metalType === 'platinum'}
                        onChange={() => handleFilterChange('metalType', filters.metalType === 'platinum' ? 'all' : 'platinum')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="metal-platinum" className="text-[#5c636e]">Platinum</label>
                    </div>
                  </div>
                </div>

                {/* Stone Type */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="flex justify-between items-center font-medium mb-4 text-[#2d3142]">
                    Stone
                    <ChevronDown size={16} className="text-[#9d4e4e]" />
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="stone-diamond"
                        checked={filters.stoneType === 'diamond'}
                        onChange={() => handleFilterChange('stoneType', filters.stoneType === 'diamond' ? 'all' : 'diamond')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="stone-diamond" className="text-[#5c636e]">Diamond</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="stone-ruby"
                        checked={filters.stoneType === 'ruby'}
                        onChange={() => handleFilterChange('stoneType', filters.stoneType === 'ruby' ? 'all' : 'ruby')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="stone-ruby" className="text-[#5c636e]">Ruby</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="stone-sapphire"
                        checked={filters.stoneType === 'sapphire'}
                        onChange={() => handleFilterChange('stoneType', filters.stoneType === 'sapphire' ? 'all' : 'sapphire')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="stone-sapphire" className="text-[#5c636e]">Sapphire</label>
                    </div>
                  </div>
                </div>

                {/* Style */}
                <div className="mb-6">
                  <h4 className="flex justify-between items-center font-medium mb-4 text-[#2d3142]">
                    Style
                    <ChevronDown size={16} className="text-[#9d4e4e]" />
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="style-classic"
                        checked={filters.style === 'classic'}
                        onChange={() => handleFilterChange('style', filters.style === 'classic' ? 'all' : 'classic')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="style-classic" className="text-[#5c636e]">Classic</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="style-modern"
                        checked={filters.style === 'modern'}
                        onChange={() => handleFilterChange('style', filters.style === 'modern' ? 'all' : 'modern')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="style-modern" className="text-[#5c636e]">Modern</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="style-vintage"
                        checked={filters.style === 'vintage'}
                        onChange={() => handleFilterChange('style', filters.style === 'vintage' ? 'all' : 'vintage')}
                        className="mr-3 accent-[#9d4e4e]"
                      />
                      <label htmlFor="style-vintage" className="text-[#5c636e]">Vintage</label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h2 className="font-serif text-3xl text-[#2d3142] mb-2">{category}</h2>
                  <p className="text-[#5c636e]">
                    {products.length} products
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 bg-white focus:outline-none focus:ring-1 focus:ring-[#9d4e4e] focus:border-[#9d4e4e] text-[#2d3142]"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="w-12 h-12 border-4 border-[#9d4e4e] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={fetchProducts}
                    className="bg-[#9d4e4e] text-white py-2 px-6 rounded-md hover:bg-[#7a3e3e] transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[#5c636e] mb-4">No products found matching your criteria</p>
                  <button
                    onClick={clearFilters}
                    className="bg-[#9d4e4e] text-white py-2 px-6 rounded-md hover:bg-[#7a3e3e] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <button 
                            onClick={() => addToWishlist(product.id)}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-[#f8f5f2] transition-colors"
                          >
                            <Heart size={16} className="text-[#2d3142]" />
                          </button>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <button 
                            onClick={() => addToCart(product.id)}
                            className="w-full bg-white text-[#2d3142] py-2 rounded-md hover:bg-[#f8f5f2] transition-colors"
                          >
                            Quick View
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-[#2d3142] mb-1">{product.name}</h3>
                        <p className="text-[#9d4e4e] font-bold mb-1">₹{product.price}</p>
                        <div className="flex items-center text-sm text-[#5c636e]">
                          <span>{product.metalType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#9d4e4e] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#7a3e3e] transition-colors"
        >
          <ArrowUpCircle size={20} />
        </button>
      )}
    </div>
  );
};

export default ZitharaJewelry; 