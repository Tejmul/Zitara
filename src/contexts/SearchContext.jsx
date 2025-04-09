import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
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
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://localhost:3001/api/visual-search', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to perform visual search. Please try again.');
      }

      const data = await response.json();
      
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid response format from server');
      }

      // Sort results by similarity score
      const sortedResults = data.results.sort((a, b) => b.similarity - a.similarity);
      
      setSearchResults(sortedResults);
      const imageUrl = URL.createObjectURL(image);
      setSelectedImage(imageUrl);

      // Add to search history
      setSearchHistory(prev => [{
        id: Date.now(),
        imageUrl,
        timestamp: new Date().toISOString(),
        resultCount: sortedResults.length
      }, ...prev].slice(0, 10)); // Keep only last 10 searches

    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setSearchResults([]);
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