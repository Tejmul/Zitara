// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { SearchProvider } from './contexts/SearchContext';
import AppRoutes from './routes';

const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <SearchProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <AppRoutes />
            </div>
          </Router>
        </SearchProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;