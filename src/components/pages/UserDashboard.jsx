import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaHeart, FaHistory, FaCog } from 'react-icons/fa';
import axios from 'axios';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const [userResponse, ordersResponse, searchesResponse] = await Promise.all([
          axios.get('/api/users/profile'),
          axios.get('/api/orders'),
          axios.get('/api/search/history'),
        ]);

        setUserData(userResponse.data);
        setOrders(ordersResponse.data);
        setSavedSearches(searchesResponse.data);
        setError('');
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h2 className="font-semibold">{userData?.name}</h2>
                <p className="text-sm text-gray-600">{userData?.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaUser className="h-5 w-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'orders'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaShoppingBag className="h-5 w-5" />
                <span>Orders</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'wishlist'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaHeart className="h-5 w-5" />
                <span>Wishlist</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'history'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaHistory className="h-5 w-5" />
                <span>Search History</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  activeTab === 'settings'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaCog className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userData?.name || ''}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData?.email || ''}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={userData?.phone || ''}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    value={userData?.address || ''}
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={order.items[0]?.image}
                          alt={order.items[0]?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{order.items[0]?.name}</p>
                        <p className="text-gray-600">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Search History</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedSearches.map((search) => (
                  <div
                    key={search.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="relative pb-[100%] mb-4">
                      <img
                        src={search.image}
                        alt="Search result"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(search.createdAt).toLocaleDateString()}
                    </p>
                    <Link
                      to={`/search/results?searchId=${search.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View Results
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 