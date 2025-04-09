import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Search, Image as ImageIcon } from 'lucide-react';
import { visualSearchService } from '../../api/visualSearch';
import { Link } from 'react-router-dom';

const VisualSearch = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const handleSearch = async () => {
    if (!imageFile) {
      setError('Please upload an image first');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const results = await visualSearchService.searchByImage(imageFile);
      setSearchResults(results);
    } catch (err) {
      setError(err.message || 'Failed to search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setUploadedImage(null);
    setImageFile(null);
    setSearchResults([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-[#2d3142] mb-4">
            Visual Search
          </h1>
          <p className="text-[#5c636e] max-w-2xl mx-auto">
            Upload a photo of jewelry you love, and we'll find similar pieces from our collection using AI-powered image recognition.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-[#9d4e4e] bg-[#9d4e4e]/5' : 'border-gray-300 hover:border-[#9d4e4e]'}`}
          >
            <input {...getInputProps()} />
            {uploadedImage ? (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded jewelry"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSearch();
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-[#2d3142]" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="w-12 h-12 text-[#9d4e4e]" />
                </div>
                <div>
                  <p className="text-[#2d3142] font-medium">
                    Drag and drop your image here, or click to select
                  </p>
                  <p className="text-sm text-[#5c636e] mt-2">
                    Supports JPG, JPEG, PNG, and WebP (max 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSearch}
              disabled={!uploadedImage || isSearching}
              className={`flex items-center px-6 py-3 rounded-lg text-white
                ${uploadedImage && !isSearching
                  ? 'bg-[#9d4e4e] hover:bg-[#7a3e3e]'
                  : 'bg-gray-400 cursor-not-allowed'
                } transition-colors`}
            >
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  <span>Search Similar Items</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {searchResults.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif text-[#2d3142] mb-6 text-center">
              Similar Items Found
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((item) => (
                <Link
                  to={`/product/${item._id}`}
                  key={item._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative pb-[100%]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-[#9d4e4e]">
                      {Math.round(item.similarity)}% Match
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-[#2d3142] mb-1">{item.name}</h3>
                    <p className="text-[#9d4e4e] font-bold">₹{item.price}</p>
                    <div className="mt-2 flex items-center text-sm text-[#5c636e]">
                      <span className="capitalize">{item.metalType}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{item.stoneType}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualSearch; 