import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaChartLine, FaCog, FaPlus, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/admin/stats');
        setStats(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-semibold">{stats.totalProducts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaBox className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Users</p>
                <p className="text-2xl font-semibold">{stats.totalUsers}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaUsers className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-semibold">{stats.totalOrders}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaChartLine className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Revenue</p>
                <p className="text-2xl font-semibold">${stats.revenue}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaCog className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Navigation */}
          <div className="border-b">
            <div className="flex flex-col md:flex-row gap-4 p-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'products'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaBox className="h-5 w-5" />
                <span>Products</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'users'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaUsers className="h-5 w-5" />
                <span>Users</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaChartLine className="h-5 w-5" />
                <span>Orders</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaCog className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-xl font-semibold">Products</h2>
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <Link
                      to="/admin/products/new"
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaPlus className="mr-2" />
                      Add Product
                    </Link>
                  </div>
                </div>
                {/* Product list will be implemented here */}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-xl font-semibold">Users</h2>
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                {/* User list will be implemented here */}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-xl font-semibold">Orders</h2>
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                {/* Order list will be implemented here */}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Settings</h2>
                {/* Settings form will be implemented here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 