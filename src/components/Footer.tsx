import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CryptoLight</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your reliable source for cryptocurrency and blockchain news.
              Up-to-date information, analysis, and market reviews.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/articles" 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacts" 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/articles?category=Bitcoin" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Bitcoin
                </Link>
              </li>
              <li>
                <Link href="/articles?category=Ethereum" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Ethereum
                </Link>
              </li>
              <li>
                <Link href="/articles?category=Technology" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/articles?category=Economy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Economy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">info@cryptolight.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">Moscow, Russia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 CryptoLight. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
                Terms of Use
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 