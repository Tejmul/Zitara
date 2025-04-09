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

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/visual-search" element={<VisualSearch />} />
          <Route path="/rings" element={<Rings />} />
          <Route path="/necklaces" element={<Necklaces />} />
          <Route path="/earrings" element={<Earrings />} />
          <Route path="/bracelets" element={<Bracelets />} />
          
          {/* Auth Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={user ? <UserDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={
              user?.role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoutes; 