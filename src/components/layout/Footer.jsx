import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Feather,
  Github,
  Heart,
  Leaf,
  Mail,
  MapPin,
  ArrowUpRight,
  Wind,
  BookOpen,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About Us' },
      { to: '/how-it-works', label: 'How It Works' },
      { to: '/generate', label: 'Generator' },
      { to: '/contacts', label: 'Contact' },
    ],
    resources: [
      { href: 'https://www.who.int/health-topics/air-pollution', label: 'WHO Air Pollution', external: true },
      { href: 'https://www.nestresearchnetwork.org', label: 'NEST Network', external: true },
      { href: 'https://aqicn.org/', label: 'Air Quality Index (AQI)', external: true },
      { href: 'https://www.eea.europa.eu/en', label: 'European Environment Agency (EEA)', external: true },
    ]
  };

  const socialLinks = [
    { href: 'https://github.com/Zeeshanunique', icon: Github, label: 'GitHub' },
    { href: 'mailto:stefano.rozzoni@unibg.it', icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center"
              >
                <Feather className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <span className="font-serif font-bold text-xl text-white">AI(R) Poetry</span>
                <span className="block text-xs text-gray-400 uppercase tracking-wider">Generator</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transforming air pollution data into poetry through the intersection of
              technology, literature, and environmental awareness.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
              <Wind className="w-4 h-4 text-primary" />
              Quick Links
            </h3>
            <nav className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <motion.div key={link.to} whileHover={{ x: 5 }}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Resources
            </h3>
            <nav className="space-y-3">
              {footerLinks.resources.map((link) => (
                <motion.div key={link.href} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Contact & Collaboration */}
          <div>
            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Collaborate
            </h3>
            <div className="space-y-4">
              <div className="text-sm text-gray-400">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Developed by Quanta</p>
                  </div>
                </div>
              </div>
              <a
                href="mailto:stefano.rozzoni@unibg.it"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
              <div className="pt-4">
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                >
                  <Leaf className="w-4 h-4" />
                  Join the project
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-2">
          <p className="text-gray-500 text-sm">
            © {currentYear} AI(R) Poetry Generator. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            Crafted with
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            for a sustainable future
          </p>
        </div>
      </div>

      {/* Bottom gradient accent */}
      <div className="h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary" />
    </footer>
  );
};

export default Footer;
