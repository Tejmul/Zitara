import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-lg mb-4">About Us</h3>
            <p className="text-white/60 text-sm">
              We specialize in helping you find the perfect jewellery through our advanced visual search technology.
              Browse our curated collection of fine jewellery from trusted artisans and designers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/rings" className="text-white/60 hover:text-burgundy text-sm">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/categories/necklaces" className="text-white/60 hover:text-burgundy text-sm">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/categories/earrings" className="text-white/60 hover:text-burgundy text-sm">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/categories/bracelets" className="text-white/60 hover:text-burgundy text-sm">
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-white/60 hover:text-burgundy text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-white/60 hover:text-burgundy text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/60 hover:text-burgundy text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/60 hover:text-burgundy text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-white/60 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                support@jewellerysearch.com
              </li>
              <li className="flex items-center text-white/60 text-sm">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-white/60 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                123 Jewellery Lane, NY 10001
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-white/60 hover:text-burgundy">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-burgundy">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-burgundy">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Jewellery Search. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
