import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if there's a stored token and try to restore the session
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({ email, name: 'Test User' });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Simulate logout API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      // Simulate register API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({ email, name: 'New User' });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('/api/auth/profile', userData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post('/api/auth/forgot-password', { email });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await axios.post('/api/auth/reset-password', { token, password });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 