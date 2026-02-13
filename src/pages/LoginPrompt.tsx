import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPrompt: React.FC = () => {
   const navigate = useNavigate();
   return (
      <div className="pt-40 pb-40 text-center container mx-auto px-6">
         <h2 className="text-3xl font-display font-bold mb-6 italic uppercase tracking-tighter">Access Reserved</h2>
         <p className="text-gray-500 mb-10 max-w-sm mx-auto font-light">Join the circle to manage your boutique or follow the elite makers.</p>
         <button onClick={() => navigate('/login')} className="gold-gradient text-luxury-black font-black px-12 py-4 rounded-xl hover:scale-105 transition-all shadow-2xl text-[10px] tracking-widest uppercase">
            LOGIN
         </button>
      </div>
   );
};

export default LoginPrompt;
