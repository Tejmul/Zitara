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
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2]">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2]">
        <div className="text-center">
          <div className="text-[#9d4e4e] text-lg mb-4">{error || 'Product not found'}</div>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-[#9d4e4e]' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif text-[#1a1a1a] mb-2">{product.name}</h1>
              <p className="text-2xl text-[#9d4e4e] font-medium">${product.price}</p>
            </div>

            <div className="prose prose-sm text-[#1a1a1a]/70">
              <p>{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-[#1a1a1a]/10 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-[#1a1a1a]/5"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-[#1a1a1a]/5"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1"
                >
                  Add to Cart
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleWishlist}
                  className={`p-2 rounded-md transition-colors ${
                    isWishlisted ? 'text-[#9d4e4e]' : 'text-[#1a1a1a] hover:text-[#9d4e4e]'
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 text-[#1a1a1a] hover:text-[#9d4e4e] transition-colors rounded-md"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="border-t border-[#1a1a1a]/10 pt-6">
              <h2 className="text-lg font-serif text-[#1a1a1a] mb-4">Product Details</h2>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-[#1a1a1a]/60">Metal Type</dt>
                  <dd className="text-[#1a1a1a]">{product.metalType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#1a1a1a]/60">Stone Type</dt>
                  <dd className="text-[#1a1a1a]">{product.stoneType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#1a1a1a]/60">Weight</dt>
                  <dd className="text-[#1a1a1a]">{product.weight}g</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#9d4e4e] text-white rounded-full shadow-lg hover:bg-[#7a3e3e] transition-all transform hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ProductDetails; 