import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaGem, FaRing } from 'react-icons/fa';
import { featuredProducts } from '../../data/dummyProducts';

// Placeholder images for development
const categoryImages = {
  rings: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
  necklaces: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  earrings: 'https://images.unsplash.com/photo-1635767798638-3665c779f112?auto=format&fit=crop&w=800&q=80',
  bracelets: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80',
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-rich-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy/20 to-gold/20">
          {/* Fallback for video */}
          <div className="absolute inset-0 bg-rich-black/60" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-serif font-bold mb-8 text-cream leading-tight">
              Discover Your Perfect
              <span className="gradient-text block">Jewellery Match</span>
            </h1>
            <p className="text-xl text-pearl/90 mb-12 font-light leading-relaxed">
              Experience our innovative visual search technology to find exquisite pieces
              that match your unique style and preferences.
            </p>
            <Link to="/search" className="btn-primary">
              <FaSearch className="h-5 w-5" />
              <span>Begin Visual Search</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title">
            Curated <span className="gradient-text">Collections</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Rings', icon: FaRing },
              { name: 'Necklaces', icon: FaGem },
              { name: 'Earrings', icon: FaGem },
              { name: 'Bracelets', icon: FaRing }
            ].map(({ name, icon: Icon }) => (
              <Link
                key={name}
                to={`/categories/${name.toLowerCase()}`}
                className="group relative h-80 card-premium overflow-hidden"
              >
                <img
                  src={categoryImages[name.toLowerCase()]}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 to-transparent group-hover:from-rich-black/90 transition-all duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                  <Icon className="h-8 w-8 text-gold mb-3 mx-auto transform group-hover:rotate-45 transition-transform duration-500" />
                  <h3 className="text-2xl font-serif text-cream group-hover:text-gold transition-colors duration-300">
                    {name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-rich-black">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-cream">
            Featured <span className="gradient-text">Pieces</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="card-premium bg-rich-black/50 backdrop-blur-sm group"
              >
                <div className="relative pb-[100%] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif text-cream group-hover:text-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-pearl/80 text-sm mt-2">{product.description}</p>
                  <p className="text-gold font-semibold mt-4">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Search Banner */}
      <section className="py-24 bg-gradient-to-br from-rich-black to-burgundy relative">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-8 text-cream">
              Experience the Future of
              <span className="gradient-text block mt-2">Jewellery Discovery</span>
            </h2>
            <p className="text-xl text-pearl/90 mb-12 font-light leading-relaxed">
              Upload a photo of your desired piece, and let our sophisticated AI
              technology curate a selection of exquisite jewellery that matches
              your refined taste.
            </p>
            <Link to="/search" className="btn-secondary">
              <FaSearch className="h-5 w-5" />
              <span>Explore Visual Search</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 