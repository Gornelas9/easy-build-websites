
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/webify-logo.svg" 
              alt="Webify" 
              className="h-8 w-auto" 
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-webify-gray hover:text-webify-blue font-medium transition-colors">
              Home
            </Link>
            <a href="#services" className="text-webify-gray hover:text-webify-blue font-medium transition-colors">
              Services
            </a>
            <a href="#testimonials" className="text-webify-gray hover:text-webify-blue font-medium transition-colors">
              Testimonials
            </a>
            <a href="#request-form" className="text-webify-gray hover:text-webify-blue font-medium transition-colors">
              Get Started
            </a>
            <Link to="/checkout" className="text-webify-gray hover:text-webify-blue font-medium transition-colors">
              Payment
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-webify-gray" 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-webify-gray hover:text-webify-blue font-medium px-4 py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <a 
            href="#services" 
            className="text-webify-gray hover:text-webify-blue font-medium px-4 py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </a>
          <a 
            href="#testimonials" 
            className="text-webify-gray hover:text-webify-blue font-medium px-4 py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </a>
          <a 
            href="#request-form" 
            className="text-webify-gray hover:text-webify-blue font-medium px-4 py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </a>
          <Link 
            to="/checkout" 
            className="text-webify-gray hover:text-webify-blue font-medium px-4 py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Payment
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
