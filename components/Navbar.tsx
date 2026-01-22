
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-gray-900 leading-none">Brotherhood</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-semibold">Clothing</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-black font-medium transition-colors">Home</Link>
            <Link to="/shops" className="text-gray-600 hover:text-black font-medium transition-colors">Explore Shops</Link>
            <Link to="/dashboard" className="px-5 py-2 rounded-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium text-sm">Shop Login</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-500 p-2">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
