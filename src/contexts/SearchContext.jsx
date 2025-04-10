import React, { createContext, useContext, useState } from 'react';
import { visualSearchService } from '../api/visualSearch';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const performSearch = async (image) => {
    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('image', image);

      const response = await visualSearchService.searchByImage(formData);
      
      if (response && response.results) {
        setSearchResults(response.results);
        const imageUrl = URL.createObjectURL(image);
        setSelectedImage(imageUrl);

        // Add to search history
        setSearchHistory(prev => [{
          id: Date.now(),
          imageUrl,
          timestamp: new Date().toISOString(),
          resultCount: response.results.length
        }, ...prev].slice(0, 10)); // Keep only last 10 searches

        return response.results;
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred during visual search');
      setSearchResults([]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage); // Clean up the object URL
    }
    setSelectedImage(null);
    setError(null);
  };

  const clearHistory = () => {
    // Clean up all object URLs in history
    searchHistory.forEach(item => {
      URL.revokeObjectURL(item.imageUrl);
    });
    setSearchHistory([]);
  };

  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
      searchHistory.forEach(item => {
        URL.revokeObjectURL(item.imageUrl);
      });
    };
  }, []);

  const value = {
    searchResults,
    loading,
    error,
    selectedImage,
    searchHistory,
    performSearch,
    clearSearch,
    clearHistory,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext; 