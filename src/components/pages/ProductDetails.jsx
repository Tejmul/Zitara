import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronUp, Heart, Share2, Minus, Plus, ArrowUp } from 'lucide-react';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, quantity + value));
  };

  const handleAddToCart = () => {
    // Add to cart logic
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    // Share logic
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error || 'Product not found'}</div>
        </div>
      </div>
    );
  }

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
              <h1 className="ml-4 font-serif text-xl text-charcoal">Product Details</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="product-image-wrapper rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]?.url}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`product-image-wrapper rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-burgundy' : ''
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} view ${index + 1}`}
                    className="product-image"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl text-charcoal mb-2">{product.name}</h1>
              <p className="text-2xl text-burgundy font-medium">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-charcoal/80">{product.description}</p>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="bg-white p-4 rounded-lg shadow-soft">
                  <h3 className="text-sm text-charcoal/60 capitalize">{key}</h3>
                  <p className="text-charcoal font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-charcoal">Quantity:</span>
                <div className="flex items-center border border-charcoal/20 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 text-charcoal hover:text-burgundy"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-charcoal">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-charcoal hover:text-burgundy"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlist}
                  className={`p-3 rounded-full border ${
                    isWishlisted
                      ? 'bg-burgundy text-white border-burgundy'
                      : 'border-charcoal/20 text-charcoal hover:text-burgundy hover:border-burgundy'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full border border-charcoal/20 text-charcoal hover:text-burgundy hover:border-burgundy"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
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

export default ProductDetails; 