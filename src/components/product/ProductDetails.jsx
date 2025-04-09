import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to load product details');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative pb-[100%] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]?.url}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative pb-[100%] rounded overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} - ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              ${product.price}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Material:</span> {product.material}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Stock:</span>{' '}
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="pt-4">
            <button
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                product.stock > 0
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
