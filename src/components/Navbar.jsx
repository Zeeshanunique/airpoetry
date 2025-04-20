import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Book, Home, Mail, Info } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm py-4 px-6 sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-medium text-primary flex items-center gap-2">
          <Book size={24} className="text-primary" />
          <span>AI(R) Poetry</span>
        </Link>
        
        {/* Mobile menu button */}
        <div className="block md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            className="text-gray-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5">
            <Info size={18} />
            <span>About Us</span>
          </Link>
          <Link to="/contacts" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5">
            <Mail size={18} />
            <span>Contact</span>
          </Link>
          <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-white ml-2 rounded-full px-5">
            <Link to="/generate">Generate Poetry</Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6 border-t border-gray-100">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-primary py-2 transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-primary py-2 transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info size={18} />
              <span>About Us</span>
            </Link>
            <Link 
              to="/contacts" 
              className="text-gray-600 hover:text-primary py-2 transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Mail size={18} />
              <span>Contact</span>
            </Link>
            <Button 
              asChild 
              className="bg-primary hover:bg-primary/90 text-white mt-2 w-full rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/generate">Generate Poetry</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;