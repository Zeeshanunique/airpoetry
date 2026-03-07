import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Menu, X, Feather, Home, Mail, Info, Sparkles, Wind } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const location = useLocation();

  // Check if we're on a page with a dark hero
  const darkHeroPages = ['/', '/about', '/contacts'];
  const hasDarkHero = darkHeroPages.includes(location.pathname);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      // Check if we're past the hero section (approximately)
      setIsHeroSection(scrollY < 100);
    };
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsHeroSection(true);
  }, [location]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  // Determine if we should use transparent/light styling
  const useTransparentStyle = hasDarkHero && isHeroSection && !scrolled;

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About', icon: Info },
    { to: '/how-it-works', label: 'How It Works', icon: Sparkles },
    { to: '/contacts', label: 'Contact', icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${useTransparentStyle
          ? 'bg-transparent py-5'
          : scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3'
            : 'bg-white/90 backdrop-blur-md shadow-sm py-4'
        } px-6`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-xl font-medium flex items-center gap-2.5 group transition-colors duration-300 ${useTransparentStyle ? 'text-white' : 'text-primary'
            }`}
        >
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${useTransparentStyle
                ? 'bg-white/20 backdrop-blur-sm'
                : 'bg-primary/10'
              }`}
          >
            <Feather className={`w-5 h-5 ${useTransparentStyle ? 'text-white' : 'text-primary'}`} />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-serif font-bold tracking-tight">AI(R) Poetry</span>
            <span className={`text-[10px] uppercase tracking-widest ${useTransparentStyle ? 'text-white/60' : 'text-gray-400'
              }`}>
              Generator
            </span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <div className="block md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className={`relative transition-colors ${useTransparentStyle
                ? 'text-white hover:bg-white/10'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 group ${isActive(link.to)
                      ? useTransparentStyle
                        ? 'text-white bg-white/20 font-medium'
                        : 'text-primary bg-primary/10 font-medium'
                      : useTransparentStyle
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                >
                  <Icon size={16} className="transition-transform group-hover:scale-110" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="ml-3"
          >
            <Link
              to="/generate"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${useTransparentStyle
                  ? 'bg-white/90 text-primary/90 shadow-md hover:shadow-lg hover:bg-white'
                  : 'bg-primary/90 text-white/95 shadow-md hover:shadow-lg hover:bg-primary'
                }`}
            >
              <Sparkles size={14} />
              <span>Generate</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-primary to-primary/90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Wind className="w-6 h-6" />
                    <span className="font-serif font-bold">AI(R) Poetry</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X size={20} />
                  </Button>
                </div>
              </div>

              {/* Links */}
              <div className="p-4 space-y-1">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.to}
                        className={`py-3 px-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${isActive(link.to)
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive(link.to) ? 'bg-primary text-white' : 'bg-gray-100'
                          }`}>
                          <Icon size={18} />
                        </div>
                        <span className="text-base">{link.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-gray-50 to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/generate"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary/90 hover:bg-primary text-white/95 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Sparkles size={16} />
                    Generate Poetry
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
