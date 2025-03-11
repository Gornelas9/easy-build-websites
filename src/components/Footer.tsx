
import React from 'react';
import { Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-webify-blue/5 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="md:col-span-2 space-y-5">
            <Link to="/" className="inline-block">
              <img 
                src="/webify-logo.svg" 
                alt="Webify" 
                className="h-8 w-auto" 
              />
            </Link>
            <p className="text-webify-gray/80 max-w-md">
              Webify provides fast, affordable, and professional websites for small businesses. 
              Get your business online in just 48 hours.
            </p>
            <div className="flex items-center space-x-1 text-webify-gray/80">
              <Mail className="h-4 w-4 mr-1" />
              <a href="mailto:gornelasoares@gmail.com" className="hover:text-webify-blue transition-colors">
                gornelasoares@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-webify-gray/80 hover:text-webify-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#services" className="text-webify-gray/80 hover:text-webify-blue transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-webify-gray/80 hover:text-webify-blue transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#request-form" className="text-webify-gray/80 hover:text-webify-blue transition-colors">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-webify-blue/10 flex items-center justify-center text-webify-blue transition-colors hover:bg-webify-blue hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-webify-blue/10 flex items-center justify-center text-webify-blue transition-colors hover:bg-webify-blue hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-webify-blue/10 flex items-center justify-center text-webify-blue transition-colors hover:bg-webify-blue hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-webify-blue/10 flex items-center justify-center text-webify-blue transition-colors hover:bg-webify-blue hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-webify-blue/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-webify-gray/70 text-sm">
            &copy; {new Date().getFullYear()} Webify. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-webify-gray/70 hover:text-webify-blue text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-webify-gray/70 hover:text-webify-blue text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
