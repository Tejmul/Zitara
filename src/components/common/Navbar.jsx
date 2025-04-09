// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all duration-300 ${
      scrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-800">Zithara</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
            <FaSearch className="h-4 w-4" />
            <span>Visual Search</span>
          </Link>
        </div>
        
        <button 
          className="md:hidden text-gray-600 hover:text-gray-900" 
          onClick={toggleMenu}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
        
        <div className={`absolute top-full left-0 w-full md:static md:w-auto md:flex md:items-center transition-all duration-300 ${
          menuOpen ? 'block bg-white shadow-md' : 'hidden'
        } md:block`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 p-4 md:p-0">
            <li>
              <Link to="/categories/rings" className="block py-2 text-gray-600 hover:text-blue-600">
                Rings
              </Link>
            </li>
            <li>
              <Link to="/categories/necklaces" className="block py-2 text-gray-600 hover:text-blue-600">
                Necklaces
              </Link>
            </li>
            <li>
              <Link to="/categories/earrings" className="block py-2 text-gray-600 hover:text-blue-600">
                Earrings
              </Link>
            </li>
            <li>
              <Link to="/categories/bracelets" className="block py-2 text-gray-600 hover:text-blue-600">
                Bracelets
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                    <FaUser className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                    <FaShoppingCart className="h-4 w-4" />
                    <span>Cart</span>
                  </Link>
                </li>
                {user.role === 'admin' && (
                  <li>
                    <Link to="/admin" className="block py-2 text-gray-600 hover:text-blue-600">
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-gray-600 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="block py-2 text-gray-600 hover:text-blue-600">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="block py-2 text-gray-600 hover:text-blue-600">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;