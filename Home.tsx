
import React from 'react';
import { Link } from 'react-router-dom';
import Home from "./Home";


const Home: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale-[20%]"
            alt="Fashion Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <div className="max-w-2xl space-y-6">
            <div className="inline-block px-3 py-1 bg-amber-600 text-[10px] uppercase tracking-widest font-bold">Palanpur Exclusive</div>
            <h1 className="font-serif text-6xl md:text-8xl font-bold leading-tight">
              Elevate Your <br/><span className="italic">Style</span> Locally.
            </h1>
            <p className="text-lg text-gray-300 font-light max-w-md">
              The first dedicated fashion discovery platform for Palanpur. Find unique collections, visit local shops, and buy direct.
            </p>
            <div className="pt-6 flex flex-wrap gap-4">
              <Link to="/shops" className="px-8 py-4 bg-white text-black font-bold hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-xl">
                EXPLORE COLLECTIONS
              </Link>
              <button className="px-8 py-4 border border-white/30 text-white font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                BECOME A PARTNER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-amber-600">
            <i className="fa-solid fa-store"></i>
          </div>
          <div>
            <h4 className="font-bold text-sm">Verified Shops</h4>
            <p className="text-xs text-gray-500">Hand-picked boutiques</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-amber-600">
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <div>
            <h4 className="font-bold text-sm">Local Pickup</h4>
            <p className="text-xs text-gray-500">In the heart of Palanpur</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-amber-600">
            <i className="fa-solid fa-comments"></i>
          </div>
          <div>
            <h4 className="font-bold text-sm">Direct Contact</h4>
            <p className="text-xs text-gray-500">WhatsApp shop owners</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-amber-600">
            <i className="fa-solid fa-star"></i>
          </div>
          <div>
            <h4 className="font-bold text-sm">Premium Quality</h4>
            <p className="text-xs text-gray-500">Curated fashion only</p>
          </div>
        </div>
      </section>

      {/* Featured Shops Preview */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl font-bold">Featured Boutiques</h2>
            <p className="text-gray-500 mt-2">Discover the best-kept secrets of Palanpur fashion.</p>
          </div>
          <Link to="/shops" className="text-amber-600 font-bold hover:underline">View All Shops →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map(i => (
            <div key={i} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[3/4] mb-4">
                <img 
                  src={`https://picsum.photos/seed/${i + 10}/600/800`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Shop Preview"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase">Verified</div>
              </div>
              <h3 className="font-serif text-2xl font-bold group-hover:text-amber-600 transition-colors">Urban Vogue Boutique</h3>
              <p className="text-gray-500 text-sm mt-1 uppercase tracking-wider">Premium Ethnic & Western</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">Own a fashion store in Palanpur?</h2>
          <p className="text-gray-400 text-lg">Join Brotherhood Clothing to reach thousands of local customers looking for premium styles every day.</p>
          <button className="px-10 py-5 bg-amber-600 text-white font-bold hover:bg-amber-500 transition-colors rounded-none">
            REGISTER YOUR SHOP NOW
          </button>
        </div>
      </section>
    </div>
  );
};

export default function Home() {
  return ( ... )
}

