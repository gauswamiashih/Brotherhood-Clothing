import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { UserRole } from '../types';
import { FOUNDER_SHOP } from '../constants';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalShops: 0, totalViews: 0 });
  const [featuredShops, setFeaturedShops] = useState<any[]>([]);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const { data: shops, error } = await supabase.from('shops').select('view_count');
      if (!error && shops) {
        const totalViews = shops.reduce((acc, s) => acc + (s.view_count || 0), 0);
        setStats({ totalShops: shops.length, totalViews });
      }
      const { data: featured } = await supabase.from('shops').select('*').eq('is_verified', true).limit(6);
      if (featured) setFeaturedShops(featured);
    } catch (error) {
      console.error("Error fetching home data", error);
    }
  };

  const handleRegisterShopClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role === UserRole.VISITOR) {
      navigate('/register-shop');
    } else if (user?.role === UserRole.OWNER) {
      navigate('/dashboard');
    } else if (user?.role === UserRole.ADMIN) {
      navigate('/admin/dashboard');
    } else {
      navigate('/register-shop');
    }
  };

  return (
    <div className="bg-luxury-black min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-20 scale-105"
            alt="Luxury Fashion"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-luxury-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-luxury-gold/10 border border-luxury-gold/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full animate-pulse"></span>
              <span className="text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-bold">Palanpur's Elite Hub</span>
            </div>

            <h1 className="font-display text-6xl md:text-9xl text-white font-bold leading-[0.9] tracking-tighter">
              BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-yellow-200 to-luxury-gold italic">STYLE</span>.
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
              Brotherhood Clothing is the city's premier destination to discover high-end boutiques. Connect directly with the founders of Palanpur's fashion legacy.
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link to="/shops" className="px-10 py-5 bg-luxury-gold text-luxury-black font-bold tracking-widest text-[10px] uppercase hover:bg-white transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                EXPLORE DIRECTORY
              </Link>
              <button
                onClick={handleRegisterShopClick}
                className="px-10 py-5 border border-white/10 text-white font-bold tracking-widest text-[10px] uppercase hover:bg-white hover:text-luxury-black transition-all"
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
            { val: stats.totalShops, label: 'VERIFIED SHOPS' },
            { val: stats.totalViews, label: 'CURATION VIEWS' },
            { val: '24/7', label: 'FOUNDER ACCESS' },
            { val: 'LIVE', label: 'MARKET STATUS' }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-4xl md:text-5xl font-display text-white font-bold mb-2 group-hover:text-luxury-gold transition-colors">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-black">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Shops Preview */}
      {featuredShops.length > 0 && (
        <section className="py-32 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-white mb-10 tracking-tight">FEATURED <span className="italic text-luxury-gold">ATELIERS</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredShops.map(shop => (
              <Link key={shop.id} to={`/shop/${shop.id}`} className="group bg-[#111] rounded-[1.5rem] overflow-hidden border border-white/5 hover:border-luxury-gold/30 transition-all duration-500 hover:-translate-y-2 block shadow-2xl relative">

                {/* Image Area */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={shop.cover_image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={shop.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80"></div>

                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <p className="text-white text-[9px] font-bold uppercase tracking-widest">{shop.category}</p>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 relative">
                  <div className="mb-4">
                    <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-luxury-gold transition-colors">{shop.name}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{shop.description || "A premier destination for luxury fashion."}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-luxury-gold text-[9px] font-black uppercase tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
                      View
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-luxury-gold group-hover:text-black transition-colors">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Founder Spotlight */}
      <section className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-full max-w-sm bg-[#111] border border-white/10 rounded-[2rem] overflow-hidden hover:border-luxury-gold/30 transition-all duration-500 shadow-2xl relative group">

          {/* Cover Image Area */}
          <div className="relative h-80 w-full overflow-hidden">
            <img
              src={FOUNDER_SHOP.media[0]?.url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200'}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
              alt="Founder Cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent"></div>

            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <div className="bg-luxury-gold text-luxury-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                <i className="fa-solid fa-circle-check text-[10px]"></i>
                <span className="text-[9px] font-black tracking-widest uppercase">FOUNDER</span>
              </div>
              <div className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/10 shadow-lg backdrop-blur-md self-start">
                <span className="text-[9px] font-bold tracking-widest uppercase">ALL WEAR</span>
              </div>
            </div>

            {/* Profile Info Overlay (Centered) */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-12 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-[#111] overflow-hidden shadow-2xl relative z-10">
                <img
                  src={FOUNDER_SHOP.logo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&q=80'}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="pt-16 pb-8 px-8 text-center space-y-6 bg-[#111] relative z-0">
            <div>
              <h3 className="text-2xl font-display font-bold text-white leading-tight">Brotherhood <br />Clothing</h3>
              <p className="text-luxury-gold text-[10px] font-bold uppercase tracking-[0.2em] mt-2">ASHISH GAUSWAMI</p>
            </div>

            <p className="text-gray-400 font-light text-sm italic leading-relaxed">
              "{FOUNDER_SHOP.description}"
            </p>

            <div className="h-px w-full bg-white/5"></div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-left">
                <div className="text-xl font-display font-bold text-white">12,540</div>
                <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">FOLLOWERS</div>
              </div>
              <Link
                to={`/shop/${FOUNDER_SHOP.id}`}
                className="flex items-center gap-2 text-luxury-gold text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors group/link"
              >
                VIEW PROFILE
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
