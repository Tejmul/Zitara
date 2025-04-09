import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  };

  const register = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await axios.post('/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      
      const { token, user: userData } = response.data;
      
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register');
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
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
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 