import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const INSTAGRAM_URL = "https://www.instagram.com/gauswami_8_07_18?igsh=MXQxMmdqM3A2YXN0ZQ==";
  const LOGO_PATH = "C:\\Users\\gausw\\Downloads\\ChatGPT Image Jan 20, 2026, 09_36_56 PM.png";

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2 space-y-10">
            <Link to="/" className="inline-block group">
              <img 
                src={LOGO_PATH} 
                alt="Brotherhood Logo" 
                className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm">
              We connect Palanpur's most discerning shoppers with a curated selection of fine boutiques and master designers.
            </p>
            <div className="flex space-x-8 text-white/40">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-purple-600 transition-colors"
              >
                <i className="fa-brands fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="hover:text-purple-600 transition-colors"><i className="fa-brands fa-facebook-f text-2xl"></i></a>
              <a href="#" className="hover:text-purple-600 transition-colors"><i className="fa-brands fa-x-twitter text-2xl"></i></a>
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-600 font-black">Curation</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li><Link to="/shops" className="hover:text-white transition-colors">Boutique Directory</Link></li>
              <li><Link to="/shops" className="hover:text-white transition-colors">Ethnic Showcase</Link></li>
              <li><Link to="/shops" className="hover:text-white transition-colors">Modern Western</Link></li>
              <li><Link to="/shops" className="hover:text-white transition-colors">Bridal Collection</Link></li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-600 font-black">Ecosystem</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li><Link to="/login" className="hover:text-white transition-colors">Partner Access</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Join Collective</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Standard Code</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Charter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] text-gray-600 uppercase tracking-[0.4em] font-bold">
            &copy; {new Date().getFullYear()} BROTHERHOOD CLOTHING CO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex space-x-12 text-[9px] text-gray-600 uppercase tracking-[0.4em] font-bold">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;