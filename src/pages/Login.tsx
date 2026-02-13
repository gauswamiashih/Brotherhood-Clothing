
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icons } from '../constants';

const Login: React.FC = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20 pb-10 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl text-white font-bold mb-4 tracking-tight">Access <span className="text-amber-500 italic">Portal</span></h1>
          <p className="text-gray-500 text-[10px] tracking-[0.4em] uppercase font-bold">The Brotherhood Collective</p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/5 p-12 space-y-10 shadow-2xl relative">
          <div className="space-y-6">
            <p className="text-gray-400 text-center text-xs uppercase tracking-widest font-bold">Authenticate with your identity</p>
            <button
              onClick={signInWithGoogle}
              className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gray-200 transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] flex items-center justify-center gap-4"
            >
              <Icons.Google />
              Sign in with Google
            </button>
          </div>

          <div className="text-center">
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-white text-[9px] uppercase font-bold tracking-widest transition-colors">Back to Marketplace</button>
          </div>
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="h-px w-10 bg-white/10 mx-auto"></div>
          <p className="text-[9px] text-gray-600 font-medium italic">Founder Access: Admin Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
