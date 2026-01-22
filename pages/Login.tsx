
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email);
    if (success) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      setError('Member credentials not found. Please register.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20 pb-10 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl text-white font-bold mb-4 tracking-tight">Access <span className="text-amber-500 italic">Portal</span></h1>
          <p className="text-gray-500 text-[10px] tracking-[0.4em] uppercase font-bold">The Brotherhood Collective</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-white/5 p-12 space-y-10 shadow-2xl relative">
          {error && <p className="absolute -top-8 left-0 w-full text-center text-red-500 text-[10px] font-bold uppercase tracking-widest">{error}</p>}
          
          <div className="space-y-3">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Registered Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white text-sm outline-none focus:border-amber-600 transition-colors"
              placeholder="gauswamiashish760@gmail.com"
              required
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Secret Key</label>
            </div>
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white text-sm outline-none focus:border-amber-600 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-amber-600 text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-amber-500 transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(217,119,6,0.3)]"
          >
            Authenticate Access
          </button>
        </form>
        
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
            New Prospect? <Link to="/register" className="text-white hover:text-amber-500 underline underline-offset-8">Register Boutique</Link>
          </p>
          <div className="h-px w-10 bg-white/10 mx-auto"></div>
          <p className="text-[9px] text-gray-600 font-medium italic">Founder Access: gauswamiashish760@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
