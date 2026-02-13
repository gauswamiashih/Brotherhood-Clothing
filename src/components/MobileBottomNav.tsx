import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../constants';

const MobileBottomNav: React.FC = () => (
   <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-6 py-4 flex items-center justify-around z-50">
      <Link to="/" className="text-gray-400 hover:text-luxury-gold transition-all">
         <Icons.Home />
      </Link>
      <Link to="/register-shop" className="text-gray-400 hover:text-luxury-gold transition-all">
         <Icons.Plus />
      </Link>
      <Link to="/dashboard" className="text-gray-400 hover:text-luxury-gold transition-all">
         <Icons.User />
      </Link>
   </nav>
);

export default MobileBottomNav;
