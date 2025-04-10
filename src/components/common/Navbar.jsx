// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div className="h-24 w-full"></div> {/* Spacer for fixed navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between h-24 px-8 lg:px-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-serif text-[#1a1a1a] hover:text-[#9d4e4e] transition-colors"
              style={{ letterSpacing: '0.2em' }}
            >
              ZITHARA
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-12">
              <div className="flex items-center space-x-16">
                <Link
                  to="/rings"
                  className={`text-sm transition-colors relative group ${
                    isActive('/rings') 
                      ? 'text-[#9d4e4e]' 
                      : 'text-[#1a1a1a] hover:text-[#9d4e4e]'
                  }`}
                  style={{ letterSpacing: '0.15em' }}
                >
                  RINGS
                  <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-[#9d4e4e] transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    isActive('/rings') ? 'scale-x-100' : ''
                  }`}></span>
                </Link>
                <Link
                  to="/necklaces"
                  className={`text-sm transition-colors relative group ${
                    isActive('/necklaces') 
                      ? 'text-[#9d4e4e]' 
                      : 'text-[#1a1a1a] hover:text-[#9d4e4e]'
                  }`}
                  style={{ letterSpacing: '0.15em' }}
                >
                  NECKLACES
                  <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-[#9d4e4e] transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    isActive('/necklaces') ? 'scale-x-100' : ''
                  }`}></span>
                </Link>
                <Link
                  to="/earrings"
                  className={`text-sm transition-colors relative group ${
                    isActive('/earrings') 
                      ? 'text-[#9d4e4e]' 
                      : 'text-[#1a1a1a] hover:text-[#9d4e4e]'
                  }`}
                  style={{ letterSpacing: '0.15em' }}
                >
                  EARRINGS
                  <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-[#9d4e4e] transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    isActive('/earrings') ? 'scale-x-100' : ''
                  }`}></span>
                </Link>
                <Link
                  to="/bracelets"
                  className={`text-sm transition-colors relative group ${
                    isActive('/bracelets') 
                      ? 'text-[#9d4e4e]' 
                      : 'text-[#1a1a1a] hover:text-[#9d4e4e]'
                  }`}
                  style={{ letterSpacing: '0.15em' }}
                >
                  BRACELETS
                  <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-[#9d4e4e] transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    isActive('/bracelets') ? 'scale-x-100' : ''
                  }`}></span>
                </Link>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-8">
              <Link
                to="/favorites"
                className="p-2 text-[#1a1a1a] hover:text-[#9d4e4e] transition-colors relative"
              >
                <Heart className="w-[22px] h-[22px]" strokeWidth={1.5} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#9d4e4e] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
              
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-8 py-2.5 text-sm text-[#1a1a1a] hover:text-[#9d4e4e] transition-colors"
                  style={{ letterSpacing: '0.15em' }}
                >
                  LOGOUT
                </button>
              ) : (
                <div className="flex items-center space-x-6">
                  <Link
                    to="/login"
                    className="px-8 py-2.5 text-sm text-[#1a1a1a] hover:text-[#9d4e4e] transition-colors"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/register"
                    className="px-8 py-2.5 text-sm bg-[#1a1a1a] text-white hover:bg-[#9d4e4e] transition-colors rounded"
                    style={{ letterSpacing: '0.15em' }}
                  >
                    REGISTER
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-[#1a1a1a] hover:text-[#9d4e4e] transition-colors"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#1a1a1a]/10">
            <div className="max-w-screen-2xl mx-auto px-8">
              <div className="flex flex-col py-8 space-y-8">
                <Link
                  to="/rings"
                  className={`text-sm transition-colors ${
                    isActive('/rings') ? 'text-[#9d4e4e]' : 'text-[#1a1a1a] hover:text-[#9d4e4e]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ letterSpacing: '0.15em' }}
                >
                  RINGS
                </Link>
                <Link
                  to="/necklaces"
                  className={`text-sm transition-colors ${
                    isActive('/necklaces') ? 'text-[#9d4e4e]' : 'text-[#1a1a1a] hover:text-[#9d4e4e]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ letterSpacing: '0.15em' }}
                >
                  NECKLACES
                </Link>
                <Link
                  to="/earrings"
                  className={`text-sm transition-colors ${
                    isActive('/earrings') ? 'text-[#9d4e4e]' : 'text-[#1a1a1a] hover:text-[#9d4e4e]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ letterSpacing: '0.15em' }}
                >
                  EARRINGS
                </Link>
                <Link
                  to="/bracelets"
                  className={`text-sm transition-colors ${
                    isActive('/bracelets') ? 'text-[#9d4e4e]' : 'text-[#1a1a1a] hover:text-[#9d4e4e]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ letterSpacing: '0.15em' }}
                >
                  BRACELETS
                </Link>
                {!user && (
                  <div className="flex flex-col space-y-8 pt-4 border-t border-[#1a1a1a]/10">
                    <Link
                      to="/login"
                      className="text-sm text-[#1a1a1a] hover:text-[#9d4e4e] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ letterSpacing: '0.15em' }}
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/register"
                      className="text-sm text-[#1a1a1a] hover:text-[#9d4e4e] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ letterSpacing: '0.15em' }}
                    >
                      REGISTER
                    </Link>
                  </div>
                )}
                {user && (
                  <div className="pt-4 border-t border-[#1a1a1a]/10">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-[#1a1a1a] hover:text-[#9d4e4e] transition-colors"
                      style={{ letterSpacing: '0.15em' }}
                    >
                      LOGOUT
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;