import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/src/assets/zitara-logo.png"
                  alt="Zitara"
                  className="h-12 w-auto object-contain"
                  style={{ maxWidth: '150px' }}
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/rings"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-charcoal hover:text-burgundy"
              >
                Rings
              </Link>
              <Link
                to="/necklaces"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-charcoal hover:text-burgundy"
              >
                Necklaces
              </Link>
              <Link
                to="/earrings"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-charcoal hover:text-burgundy"
              >
                Earrings
              </Link>
              <Link
                to="/visual-search"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-charcoal hover:text-burgundy"
              >
                Visual Search
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-charcoal hover:text-burgundy"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/cart"
              className="p-2 text-charcoal hover:text-burgundy relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-burgundy text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            {user ? (
              <div className="relative group">
                <button className="p-2 text-charcoal hover:text-burgundy">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-soft hidden group-hover:block">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-charcoal hover:bg-ivory"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-charcoal hover:bg-ivory"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-ivory"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="btn-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-burgundy hover:bg-ivory"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/rings"
              className="block pl-3 pr-4 py-2 text-base font-medium text-charcoal hover:text-burgundy hover:bg-ivory"
            >
              Rings
            </Link>
            <Link
              to="/necklaces"
              className="block pl-3 pr-4 py-2 text-base font-medium text-charcoal hover:text-burgundy hover:bg-ivory"
            >
              Necklaces
            </Link>
            <Link
              to="/earrings"
              className="block pl-3 pr-4 py-2 text-base font-medium text-charcoal hover:text-burgundy hover:bg-ivory"
            >
              Earrings
            </Link>
            <Link
              to="/visual-search"
              className="block pl-3 pr-4 py-2 text-base font-medium text-charcoal hover:text-burgundy hover:bg-ivory"
            >
              Visual Search
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="space-y-1">
                <Link
                  to="/dashboard"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-charcoal hover:text-burgundy hover:bg-ivory"
                >
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-charcoal hover:text-burgundy hover:bg-ivory"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-charcoal hover:text-burgundy hover:bg-ivory"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-charcoal hover:text-burgundy hover:bg-ivory"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-charcoal hover:text-burgundy hover:bg-ivory"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="max-w-3xl mx-auto mt-20 px-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for jewellery..."
                className="w-full px-4 py-3 text-lg bg-white rounded-lg shadow-soft focus:outline-none focus:ring-2 focus:ring-burgundy"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-3 text-charcoal hover:text-burgundy"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-12 top-3 text-charcoal hover:text-burgundy"
              >
                <X className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 