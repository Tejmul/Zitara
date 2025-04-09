// src/components/search/ImageUpload.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../contexts/SearchContext';
import { useAuth } from '../../contexts/AuthContext';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { performSearch, loading } = useSearch();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageChange({ target: { files: [file] } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await performSearch(image);
      navigate('/results');
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">AI-Powered Visual Search</h2>
        <div className="mb-8 text-center">
          <p className="text-gray-600 text-lg mb-2">
            Discover your perfect piece of jewellery using our advanced AI visual search.
          </p>
          <p className="text-gray-500">
            Upload an image of jewellery you love, and our AI will find similar pieces from our collection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg">
              <div
                className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="space-y-2 text-center">
                  {preview ? (
                    <div className="relative group">
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto h-64 w-auto object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">Click to change image</span>
                      </div>
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: PNG, JPG, GIF (max 10MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!image || loading}
              className={`
                px-8 py-3 rounded-lg text-white font-medium text-lg
                transition-all duration-200 transform hover:scale-105
                ${!image || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                }
              `}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                'Find Similar Items'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;