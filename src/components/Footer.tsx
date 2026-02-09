import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-4 text-center text-gray-400">
          <p>&copy; 2026 SLOPEN. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;