import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="bg-luxury-black border-t border-white/5 py-16 mt-20 pb-24 lg:pb-16">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center font-display font-black text-luxury-black text-sm">B</div>
            <span className="font-display text-sm font-extrabold gold-gradient bg-clip-text text-transparent uppercase tracking-wider">Brotherhood</span>
          </div>
          <p className="text-gray-600 text-[9px] uppercase tracking-[0.2em] font-bold">The New Standard of Fashion</p>
        </div>

        <div className="flex gap-10">
          <Link to="/about" className="text-gray-500 hover:text-white text-[9px] uppercase font-bold tracking-widest transition-colors">Story</Link>
          <Link to="/" className="text-gray-500 hover:text-white text-[9px] uppercase font-bold tracking-widest transition-colors">Marketplace</Link>
          <Link to="/register-shop" className="text-gray-500 hover:text-white text-[9px] uppercase font-bold tracking-widest transition-colors">Partner</Link>
        </div>

        <div className="text-right">
          <p className="text-gray-700 text-[9px] uppercase tracking-[0.2em] font-bold">
            © {new Date().getFullYear()} Brotherhood Clothing • Palanpur
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;