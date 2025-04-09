import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Heart, ShoppingBag, ChevronDown, ChevronUp, X, Plus, Minus, ArrowUpCircle } from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [priceRange, setPriceRange] = useState([799, 1599]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [filters, setFilters] = useState({
    price: [799, 1599],
    metal: [],
    stone: [],
    style: []
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for testing
  const products = [
    {
      id: 1,
      name: "Link Chain Bracelet",
      price: 1299,
      image: "/api/placeholder/600/600",
      category: "Bracelets",
      description: "A sleek, modern link chain bracelet that adds the right amount of shine to your wrist. Plus, with its adjustable fit, it's made to sit perfectly, no matter your style.",
      features: [
        "Pure 925 sterling silver – High-quality, tarnish-resistant, and hypoallergenic",
        "Classic link design – Timeless style that complements your jewelry collection",
        "Adjustable fit – Comfortable for any wrist size",
        "Lightweight – Barely-there feel for all-day wear",
        "Versatile style – Dress it up or down, or layer it up for extra style points"
      ],
      stock: 4,
      metal: "Sterling Silver",
      stone: "None",
      style: "Modern"
    },
    {
      id: 2,
      name: "Star Charm Bracelet",
      price: 899,
      image: "/api/placeholder/600/600",
      category: "Bracelets"
    },
    {
      id: 3,
      name: "Infinity Bracelet",
      price: 999,
      image: "/api/placeholder/600/600",
      category: "Bracelets"
    }
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

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="nav-link font-serif text-lg">Zithara</a>
              <a href="/rings" className="nav-link">Rings</a>
              <a href="/necklaces" className="nav-link">Necklaces</a>
              <a href="/earrings" className="nav-link">Earrings</a>
              <a href="/bracelets" className="nav-link">Bracelets</a>
            </nav>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-48 pl-10 pr-4 py-2 border-b border-charcoal/20 focus:border-burgundy transition-colors bg-transparent"
                />
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-charcoal/60" size={20} />
              </div>
              
              <button className="nav-link">
                <Heart size={20} />
              </button>
              
              <button className="nav-link relative">
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-burgundy text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8">
          <a href="/" className="text-charcoal/60 hover:text-burgundy transition-colors">Home</a>
          <ChevronDown className="rotate-90 mx-2 text-charcoal/40" size={14} />
          <span className="font-medium text-charcoal">{category || 'All Jewelry'}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="md:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-serif text-lg mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Price Range</h4>
                    <ChevronUp size={20} className="text-charcoal/60" />
                  </div>
                  <div className="price-slider">
                    <div className="price-slider-handle" style={{ left: '20%' }} />
                    <div className="price-slider-handle" style={{ left: '80%' }} />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>₹{filters.price[0]}</span>
                    <span>₹{filters.price[1]}</span>
                  </div>
                </div>

                {/* Metal Type */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Metal</h4>
                    <ChevronUp size={20} className="text-charcoal/60" />
                  </div>
                  <div className="space-y-2">
                    {['Gold', 'Silver', 'Rose Gold', 'Platinum'].map(metal => (
                      <label key={metal} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-burgundy rounded border-charcoal/20"
                          checked={filters.metal.includes(metal)}
                          onChange={() => handleFilterChange('metal', metal)}
                        />
                        <span className="ml-2 text-sm">{metal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stone Type */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Stone</h4>
                    <ChevronDown size={20} className="text-charcoal/60" />
                  </div>
                </div>

                {/* Style */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Style</h4>
                    <ChevronDown size={20} className="text-charcoal/60" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-serif text-3xl">{category || 'All Jewelry'}</h1>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-charcoal/60">{products.length} products</span>
                
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="text-sm border-none focus:ring-0 bg-transparent"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="group product-card animate-fade-in">
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <button className="quick-view-button">Quick View</button>
                    <button className="wishlist-button">
                      <Heart size={18} className="text-charcoal/60 group-hover:text-burgundy transition-colors" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-serif text-lg mb-1">{product.name}</h3>
                    <p className="text-burgundy font-medium">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

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