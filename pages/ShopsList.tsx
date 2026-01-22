
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ShopsList: React.FC = () => {
  const { shops } = useAuth();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const categories = ['All', ...Array.from(new Set(shops.filter(s => s.priority === 2).map(s => s.category)))];

  const filteredShops = useMemo(() => {
    return shops.filter(shop => {
      const isFounder = shop.priority === 1;
      const matchesSearch = shop.name.toLowerCase().includes(search.toLowerCase());
      
      // Founder is ALWAYS visible by default unless it doesn't match a search query.
      // It ignores category filters because it is the "Flagship" of the whole system.
      const matchesFilter = filter === 'All' || shop.category === filter || isFounder;
      
      return matchesFilter && matchesSearch;
    });
  }, [filter, search, shops]);

  return (
    <div className="bg-[#0b0b0b] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-7xl text-white font-bold tracking-tighter leading-none">THE <span className="text-purple-600">INDEX</span></h1>
              <p className="text-gray-500 text-lg font-light tracking-wide max-w-lg italic">The definitive registry of Palanpur's fashion architects.</p>
            </div>
            <div className="relative w-full md:w-96 group">
              <input 
                type="text" 
                placeholder="Search collectives..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-none px-6 py-5 text-white text-sm outline-none focus:border-purple-600 transition-all placeholder:text-gray-700"
              />
              <i className="fa-solid fa-magnifying-glass absolute right-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-purple-600 transition-colors"></i>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                  filter === cat 
                  ? 'bg-purple-600 border-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]' 
                  : 'bg-transparent border-white/5 text-gray-600 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredShops.map(shop => (
            <Link to={`/shop/${shop.slug}`} key={shop.id} className="group flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-[#111] border border-white/5 shadow-2xl">
                <img 
                  src={shop.logo} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                  alt={shop.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                
                {shop.priority === 1 ? (
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg">
                    <i className="fa-solid fa-crown"></i>
                    <span>FOUNDER FLAGSHIP</span>
                  </div>
                ) : shop.isVerified && (
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-purple-600/20 border border-purple-600/40 text-purple-400 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <i className="fa-solid fa-shield-check"></i>
                    <span>VERIFIED</span>
                  </div>
                )}
                
                <div className="absolute bottom-10 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="space-y-1">
                     <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">{shop.category}</div>
                     <div className="text-white text-xs font-bold uppercase tracking-widest border-b border-purple-600 pb-1">ENTER ATELIER</div>
                  </div>
                  <div className="flex flex-col items-end">
                     <span className="text-white text-xl font-serif font-bold italic">{shop.followersCount}</span>
                     <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">FOLLOWERS</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-3xl text-white font-bold group-hover:text-purple-500 transition-colors tracking-tight">{shop.name}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{shop.viewCount} CURATIONS</span>
                  <div className="h-px flex-grow bg-white/5"></div>
                  <span className="text-[9px] text-purple-600 font-black uppercase tracking-[0.3em]">GUJARAT</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopsList;
