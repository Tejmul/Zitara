import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f8f5f2] text-[#1a1a1a] border-t border-[#1a1a1a]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* About */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl text-[#1a1a1a] font-light tracking-widest">ABOUT US</h3>
            <p className="text-[#1a1a1a]/70 text-sm leading-relaxed">
              Zithara is a premier destination for exquisite jewelry, offering a curated collection of timeless pieces crafted by master artisans. Our commitment to quality and elegance defines the Zithara experience.
            </p>
          </div>

          {/* Collections */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl text-[#1a1a1a] font-light tracking-widest">COLLECTIONS</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/rings" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/necklaces" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/earrings" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/bracelets" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl text-[#1a1a1a] font-light tracking-widest">CUSTOMER SERVICE</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/care-guide" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] text-sm transition-colors">
                  Jewelry Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl text-[#1a1a1a] font-light tracking-widest">CONTACT US</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 text-[#1a1a1a]/70 text-sm">
                <MapPin className="h-5 w-5 text-[#9d4e4e] mt-0.5" />
                <span>123 Jewelry Lane, Fashion District, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-4 text-[#1a1a1a]/70 text-sm">
                <Phone className="h-5 w-5 text-[#9d4e4e]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-4 text-[#1a1a1a]/70 text-sm">
                <Mail className="h-5 w-5 text-[#9d4e4e]" />
                <span>info@zitharajewelry.com</span>
              </li>
              <li className="flex space-x-8 pt-4">
                <a href="#" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-[#1a1a1a]/70 hover:text-[#9d4e4e] transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a]/10 mt-20 pt-8 text-center">
          <p className="text-[#1a1a1a]/50 text-sm">&copy; {new Date().getFullYear()} Zithara Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
