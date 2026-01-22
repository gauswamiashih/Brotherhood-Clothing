
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Home: React.FC = () => {
  const { shops, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const totalViews = shops.reduce((acc, s) => acc + s.viewCount, 0);
  const totalShops = shops.length;

  const handleRegisterShopClick = () => {
    if (!isAuthenticated) {
      navigate('/register');
    } else if (user?.role === UserRole.CUSTOMER) {
      navigate('/register-shop');
    } else if (user?.role === UserRole.SHOP_OWNER) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-[#0b0b0b]">
      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20 scale-105"
            alt="Luxury Fashion"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0b0b0b]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-purple-600/10 border border-purple-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
              <span className="text-purple-400 text-[10px] uppercase tracking-[0.3em] font-bold">Palanpur's Elite Hub</span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-9xl text-white font-bold leading-[0.9] tracking-tighter">
              BEYOND <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 italic">STYLE</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
              Brotherhood Clothing is the city's premier destination to discover high-end boutiques. Connect directly with the founders of Palanpur's fashion legacy.
            </p>
            
            <div className="pt-6 flex flex-wrap gap-4">
              <Link to="/shops" className="px-10 py-5 bg-purple-600 text-white font-bold tracking-widest text-[10px] uppercase hover:bg-purple-500 transition-all shadow-[0_0_40px_rgba(124,58,237,0.2)]">
                EXPLORE DIRECTORY
              </Link>
              <button 
                onClick={handleRegisterShopClick}
                className="px-10 py-5 border border-white/10 text-white font-bold tracking-widest text-[10px] uppercase hover:bg-white hover:text-black transition-all"
              >
                REGISTER YOUR SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Real Statistics */}
      <section className="py-20 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { val: totalShops, label: 'VERIFIED SHOPS' },
            { val: totalViews, label: 'CURATION VIEWS' },
            { val: '24/7', label: 'FOUNDER ACCESS' },
            { val: 'LIVE', label: 'MARKET STATUS' }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl md:text-5xl font-serif text-white font-bold mb-2 group-hover:text-purple-500 transition-colors">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-black">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="bg-[#111] border border-white/5 p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 aspect-square md:aspect-video overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              alt="Founder Choice"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="text-purple-500 text-xs font-black uppercase tracking-[0.3em]">FOUNDER SPOTLIGHT</div>
            <h2 className="text-4xl md:text-6xl font-serif text-white font-bold leading-tight">Curated by <br/>Gauswami Ashish</h2>
            <p className="text-gray-400 font-light leading-relaxed text-lg">
              "We don't just list shops. We curate experiences. Brotherhood Clothing is a commitment to the artisans of Palanpur who define what it means to be elegant."
            </p>
            <Link to="/shop/brotherhood-official" className="inline-block text-white font-bold text-[10px] uppercase tracking-widest border-b-2 border-purple-600 pb-2 hover:text-purple-500 transition-colors">
              VIEW FLAGSHIP COLLECTION →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
