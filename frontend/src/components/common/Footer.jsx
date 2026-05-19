import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Facebook } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brandDark text-gray-500 border-t border-white/5 py-12 px-4 md:px-8 mt-20 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding details */}
        <div className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black font-outfit tracking-tighter text-primary">
              F<span className="text-white font-normal font-sans text-xl">ILMIFLIX</span>
            </span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed font-outfit">
            Explore live cinema tracking, curated categories, high-resolution details, and direct trailer embeds built with the MERN stack.
          </p>
        </div>

        {/* Navigation Categories */}
        <div>
          <h4 className="text-white font-semibold text-sm font-outfit tracking-wider uppercase mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home Dashboard
              </Link>
            </li>
            <li>
              <Link to="/movies" className="hover:text-primary transition-colors">
                Browse Movies
              </Link>
            </li>
            <li>
              <Link to="/tv-shows" className="hover:text-primary transition-colors">
                TV Series
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-primary transition-colors">
                My Favorites List
              </Link>
            </li>
          </ul>
        </div>

        {/* Terms Support */}
        <div>
          <h4 className="text-white font-semibold text-sm font-outfit tracking-wider uppercase mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                API Diagnostics
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Social integrations */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-white font-semibold text-sm font-outfit tracking-wider uppercase mb-4 font-outfit">
            Connect With Us
          </h4>
          <div className="flex items-center space-x-3">
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center bg-brandDark-card hover:bg-primary hover:text-white rounded-full border border-white/5 transition-all text-gray-400"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center bg-brandDark-card hover:bg-primary hover:text-white rounded-full border border-white/5 transition-all text-gray-400"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center bg-brandDark-card hover:bg-primary hover:text-white rounded-full border border-white/5 transition-all text-gray-400"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center bg-brandDark-card hover:bg-primary hover:text-white rounded-full border border-white/5 transition-all text-gray-400"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
          <span className="text-xs text-gray-600 font-sans mt-2">
            MERN + TMDB + Tailwind + Framer Motion
          </span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
        <p>&copy; {currentYear} FILMIFLIX Movie Project. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed by Antigravity AI Code Team.</p>
      </div>
    </footer>
  );
};

export default Footer;
