import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Info, Search } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';
import { dummyProducts } from '../../data/dummyProducts';

const VisualSearch = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [isExactMatch, setIsExactMatch] = useState(false);
  const [matchedProduct, setMatchedProduct] = useState(null);
  const { performSearch, loading } = useSearch();
  const navigate = useNavigate();

  // Check if the selected image matches any of our dummy products
  useEffect(() => {
    if (previewUrl) {
      // In a real implementation, we would compare image features
      // For this demo, we'll check if the image URL is in our dummy data
      const match = dummyProducts.find(product => product.image === previewUrl);
      setIsExactMatch(!!match);
      setMatchedProduct(match || null);
    } else {
      setIsExactMatch(false);
      setMatchedProduct(null);
    }
  }, [previewUrl]);

  const onDrop = useCallback((acceptedFiles) => {
    setError('');
    const file = acceptedFiles[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }
      
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size should be less than 10MB');
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleSearch = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setError('');

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('image', selectedImage);
      
      const results = await performSearch(selectedImage);
      navigate('/search-results', { 
        state: { 
          results: results,
          message: isExactMatch 
            ? `Found exact match: ${matchedProduct.name}` 
            : 'Here are items similar to your image'
        }
      });
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred during visual search');
    }
  };

  const clearImage = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewUrl('');
    setError('');
    setIsExactMatch(false);
    setMatchedProduct(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif text-center mb-8">Visual Search</h1>
        
        {/* Info Box */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-700">
              <strong>Demo Mode:</strong> This visual search is using dummy data. Upload any image to see matching jewelry items from our catalog.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              <strong>Tip:</strong> For best results, try uploading one of the product images from our catalog.
            </p>
          </div>
        </div>
        
        {/* Image Upload Area */}
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-[#9d4e4e] bg-[#9d4e4e]/5' : 'border-gray-300 hover:border-[#9d4e4e]'}`}
        >
          <input {...getInputProps()} />
          
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
              {isExactMatch && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Exact Match Found!
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <div className="space-y-2">
                <p className="text-gray-600">
                  Drag and drop your image here, or click to select
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, WEBP (max 10MB)
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {isExactMatch && matchedProduct && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Search className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="font-medium text-green-800">Exact Match Found!</h3>
            </div>
            <p className="text-sm text-green-700 mt-1">
              This image matches "{matchedProduct.name}" in our catalog. Click search to see this item and similar products.
            </p>
          </div>
        )}

        <button
          onClick={handleSearch}
          disabled={!selectedImage || loading}
          className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white
            ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#9d4e4e] hover:bg-[#8a3d3d] transition-colors'
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Search Similar Items'
          )}
        </button>
      </div>
    </div>
  );
};

export default VisualSearch; 