
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handlePartnerClick = () => {
    setMobileMenuOpen(false);
    if (!isAuthenticated) {
      navigate('/register');
    } else if (user?.role === UserRole.CUSTOMER) {
      navigate('/register-shop');
    } else if (user?.role === UserRole.SHOP_OWNER) {
      navigate('/dashboard');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${
      scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 py-4' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex flex-col group" onClick={() => setMobileMenuOpen(false)}>
            <span className="font-serif text-3xl font-bold tracking-tighter text-white group-hover:text-purple-500 transition-all duration-500">BROTHERHOOD</span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-purple-600 font-black -mt-1 opacity-80">CLOTHING</span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-12">
            <Link 
              to="/shops" 
              className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${isActive('/shops') ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}
            >
              DIRECTORY
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-10">
                <Link 
                  to={user?.role === UserRole.ADMIN ? "/admin" : "/dashboard"} 
                  className={`text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${isActive('/dashboard') || isActive('/admin') ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}
                >
                  ATELIER
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-8 py-2.5 bg-white/5 border border-white/10 text-white hover:bg-purple-600 hover:border-purple-600 transition-all duration-500 text-[9px] font-black tracking-[0.3em] uppercase"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-8">
                <Link to="/login" className="text-gray-400 hover:text-white text-[10px] font-black tracking-[0.3em] uppercase transition-colors">AUTHENTICATE</Link>
                <button 
                  onClick={handlePartnerClick}
                  className="px-8 py-3 bg-purple-600 text-white hover:bg-purple-500 transition-all duration-500 text-[9px] font-black tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                >
                  PARTNER
                </button>
              </div>
            )}
          </div>

          <button 
            className="lg:hidden text-white text-3xl p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/95 z-40 lg:hidden transition-all duration-500 flex flex-col items-center justify-center space-y-12 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <Link to="/shops" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-serif text-white hover:text-purple-500 transition-colors">THE INDEX</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-serif text-white hover:text-purple-500 transition-colors">DASHBOARD</Link>
              <button onClick={handleLogout} className="text-4xl font-serif text-red-600 italic">LOGOUT</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-serif text-white hover:text-purple-500 transition-colors">AUTHENTICATE</Link>
              <button onClick={handlePartnerClick} className="text-4xl font-serif text-purple-600 italic">JOIN US</button>
            </>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
