
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="font-serif text-2xl font-bold mb-4">Brotherhood Clothing</div>
        <p className="text-gray-500 text-sm mb-8">Palanpur’s Own Fashion Market. Connecting local shops to modern customers.</p>
        <div className="flex justify-center space-x-6 mb-8 text-gray-400">
          <a href="#" className="hover:text-black transition-colors"><i className="fa-brands fa-instagram text-xl"></i></a>
          <a href="#" className="hover:text-black transition-colors"><i className="fa-brands fa-facebook text-xl"></i></a>
          <a href="#" className="hover:text-black transition-colors"><i className="fa-brands fa-whatsapp text-xl"></i></a>
        </div>
        <div className="text-[10px] text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} BROTHERHOOD CLOTHING. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
