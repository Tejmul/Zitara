import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaGem, FaRing } from 'react-icons/fa';
import { Search, Camera, Heart } from 'lucide-react';
import { featuredProducts } from '../../data/dummyProducts';
import DiamondPattern from '../common/DiamondPattern';
import CuratedCollections from '../home/CuratedCollections';

// High-quality category images with consistent aspect ratios
const categoryImages = {
  rings: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&h=800&q=80',
  necklaces: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&h=800&q=80',
  earrings: 'https://images.unsplash.com/photo-1635767798638-3665c779f112?auto=format&fit=crop&w=800&h=800&q=80',
  bracelets: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&h=800&q=80',
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Collections data
const collections = [
  {
    id: 1,
    name: 'Rings',
    link: '/rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&h=800&q=80'
  },
  {
    id: 2,
    name: 'Necklaces',
    link: '/necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&h=800&q=80'
  },
  {
    id: 3,
    name: 'Earrings',
    link: '/earrings',
    image: 'https://images.unsplash.com/photo-1635767798638-3665c779f112?auto=format&fit=crop&w=800&h=800&q=80'
  },
  {
    id: 4,
    name: 'Bracelets',
    link: '/bracelets',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&h=800&q=80'
  }
];

const Home = () => {
  const navigate = useNavigate();

  const handleVisualSearch = () => {
    navigate('/visual-search');
  };

  const handleImageError = (e) => {
    e.target.src = '/placeholder-image.jpg';
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-5rem)] bg-gradient-to-br from-[#f8f5f2] to-[#f3e6e6] overflow-hidden">
        {/* Decorative Elements */}
        <DiamondPattern opacity={0.05} />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-radial from-[#9d4e4e]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-radial from-[#9d4e4e]/10 to-transparent rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-[#9d4e4e] to-[#7a3e3e] bg-clip-text text-transparent">
                Jewellery Match
              </span>
            </h1>
            <p className="text-[#1a1a1a]/70 text-lg md:text-xl mb-8 leading-relaxed">
              Discover our curated collection of exquisite jewelry pieces, each telling its own unique story of elegance and craftsmanship.
            </p>
            <button
              onClick={handleVisualSearch}
              className="bg-[#9d4e4e] text-white px-8 py-4 rounded-md hover:bg-[#7a3e3e] transition-all transform hover:scale-105 shadow-lg flex items-center space-x-3 group"
            >
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">Try Visual Search</span>
            </button>
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <div id="collections">
        <CuratedCollections />
      </div>
    </main>
  );
};

export default Home; 