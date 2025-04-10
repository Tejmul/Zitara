import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Page Components
import Home from './components/pages/Home';
import SearchResults from './components/pages/SearchResults';
import ProductDetails from './components/pages/ProductDetails';
import CategoryPage from './components/pages/CategoryPage';
import UserDashboard from './components/pages/UserDashboard';
import AdminDashboard from './components/pages/AdminDashboard';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import NotFound from './components/common/NotFound';
import Necklaces from './components/pages/Necklaces';
import Earrings from './components/pages/Earrings';
import Rings from './components/pages/Rings';
import Bracelets from './components/pages/Bracelets';
import VisualSearch from './components/pages/VisualSearch';
import Favorites from './components/pages/Favorites';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visual-search" element={<VisualSearch />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/necklaces" element={<Necklaces />} />
          <Route path="/earrings" element={<Earrings />} />
          <Route path="/rings" element={<Rings />} />
          <Route path="/bracelets" element={<Bracelets />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes; 