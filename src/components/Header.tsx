import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icons } from '../constants';

const Header: React.FC = () => {
   const { user, signOut, loading } = useAuth();
   const navigate = useNavigate();
   const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-8'}`}>
         <div className="container mx-auto px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
               <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center font-display font-black text-luxury-black group-hover:rotate-12 transition-transform">B</div>
               <div className="flex flex-col">
                  <span className="font-display text-xl font-extrabold tracking-tight gold-gradient bg-clip-text text-transparent">
                     BROTHERHOOD
                  </span>
                  <span className="text-[10px] text-luxury-gold font-accent tracking-[0.3em] font-bold uppercase">Clothing</span>
               </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-12 text-xs font-black tracking-[0.25em] uppercase text-gray-400 ml-auto mr-auto pl-20">
               <Link to="/" className="hover:text-white transition-colors">Marketplace</Link>
               <Link to="/register-shop" className="hover:text-white transition-colors">Partner With Us</Link>
               <Link to="/about" className="hover:text-white transition-colors">Our Story</Link>
            </nav>

            <div className="flex items-center gap-6">
               {loading ? (
                  <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
               ) : user ? (
                  <div className="flex items-center gap-4">
                     <Link to="/dashboard" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 transition-all group">
                        <img src={user.picture || 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=200'} alt={user.name} className="w-8 h-8 rounded-full border border-luxury-gold group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:block text-xs font-bold uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                     </Link>
                     <button onClick={signOut} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors hidden md:block">Logout</button>
                  </div>
               ) : (
                  <button onClick={() => navigate('/login')} className="gold-gradient text-luxury-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all text-xs tracking-widest shadow-xl shadow-luxury-gold/10">
                     LOGIN
                  </button>
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;
