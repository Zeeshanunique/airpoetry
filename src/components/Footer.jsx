import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} AI(R) Poetry Generator. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary text-sm transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary text-sm transition-colors">
              About Us
            </Link>
            <Link to="/generate" className="text-gray-600 hover:text-primary text-sm transition-colors">
              Generator
            </Link>
            <Link to="/contacts" className="text-gray-600 hover:text-primary text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;