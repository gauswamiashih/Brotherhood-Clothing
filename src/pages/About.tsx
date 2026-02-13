import React from 'react';
import { Icons } from '../constants';

const About: React.FC = () => (
   <div className="pt-32 lg:pt-40 pb-32 container mx-auto px-6 max-w-4xl text-center">
      <div className="inline-block px-4 py-1.5 rounded-full border border-luxury-gold/20 mb-8 bg-luxury-gold/5">
         <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.4em]">Founded in Palanpur</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-display font-black mb-12 italic leading-tight">Elite <br className="hidden md:block" /> <span className="gold-gradient bg-clip-text text-transparent">Heritage</span></h1>
      <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-16 italic max-w-2xl mx-auto">
         "Brotherhood Clothing represents the culmination of regional boutique excellence. We unify Palanpur's most dedicated fashion houses under one mark of luxury."
      </p>
      <div className="relative rounded-[3rem] overflow-hidden mb-20 shadow-2xl">
         <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" className="w-full h-[500px] object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-[2s]" alt="Legacy" />
         <div className="absolute inset-0 bg-gradient-to-t from-luxury-black to-transparent"></div>
         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
            <Icons.Verified size={10} />
            <p className="text-luxury-gold font-display text-3xl font-bold mt-2">Ashish Gauswami</p>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Architect of Brotherhood</p>
         </div>
      </div>
   </div>
);

export default About;
