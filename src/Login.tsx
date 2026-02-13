import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Icons } from './constants';

const Login: React.FC = () => {
   const navigate = useNavigate();
   const { signInWithGoogle, user } = useAuth();

   React.useEffect(() => {
      if (user) {
         navigate('/dashboard');
      }
   }, [user, navigate]);

   return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-luxury-black text-white">
         <div className="bg-luxury-charcoal/50 p-8 rounded-3xl border border-white/5 max-w-md w-full text-center">
            <h2 className="text-3xl font-display font-bold mb-6 italic">Welcome Back</h2>
            <p className="text-gray-400 mb-8">Sign in to access your dashboard and manage your boutique.</p>

            <button
               onClick={signInWithGoogle}
               className="w-full gold-gradient text-luxury-black font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl mb-4 flex items-center justify-center gap-3"
            >
               Sign in with Google
            </button>

            <button
               onClick={() => navigate('/')}
               className="text-gray-500 hover:text-white text-xs uppercase font-bold tracking-widest mt-4"
            >
               Back to Marketplace
            </button>
         </div>
      </div>
   );
};

export default Login;
