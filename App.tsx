
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { User, Shop, UserRole, ShopStatus, ShopCategory } from './types';
import { getShops, getCurrentUser, loginUser, logoutUser, saveShop, generateId } from './store';
import { Icons, FOUNDER_SHOP } from './constants';

// --- Context ---
interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// --- Components ---

const Header: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl font-bold gold-gradient bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            BROTHERHOOD
          </span>
          <span className="text-luxury-gold text-xs font-accent tracking-widest hidden sm:block">CLOTHING</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link to="/" className="hover:text-luxury-gold transition-colors">EXPLORE</Link>
          <Link to="/register-shop" className="hover:text-luxury-gold transition-colors">REGISTER SHOP</Link>
          <Link to="/about" className="hover:text-luxury-gold transition-colors">ABOUT</Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-3 glass hover:bg-white/10 px-4 py-2 rounded-full transition-all">
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-luxury-gold" />
                <span className="hidden sm:block text-sm font-semibold">{user.name}</span>
              </Link>
              <button onClick={logout} className="text-sm text-gray-400 hover:text-white transition-colors">Logout</button>
            </div>
          ) : (
            <button onClick={login} className="gold-gradient text-luxury-black font-bold px-6 py-2 rounded-full hover:scale-105 transition-all text-sm shadow-lg shadow-luxury-gold/20">
              LOGIN WITH GOOGLE
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-luxury-charcoal border-t border-white/5 py-12 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <h3 className="font-display text-2xl font-bold gold-gradient bg-clip-text text-transparent mb-4">BROTHERHOOD CLOTHING</h3>
          <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
            Elevating Palanpur's fashion landscape by connecting the community's finest boutiques and creators in one luxury marketplace.
          </p>
          <div className="flex gap-4">
            <a href={FOUNDER_SHOP.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full glass hover:text-luxury-gold transition-all">
              <Icons.Instagram />
            </a>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="text-luxury-gold font-bold mb-4 uppercase tracking-widest text-xs">FOUNDER</h4>
          <p className="text-white font-semibold">Ashish Gauswami</p>
          <p className="text-gray-400 text-sm mt-1">gauswamiashish760@gmail.com</p>
          <p className="text-gray-400 text-sm">9664592743</p>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-luxury-gold font-bold mb-4 uppercase tracking-widest text-xs">JOIN THE MARKET</h4>
          <p className="text-gray-400 text-sm mb-6">Own a shop in Palanpur? Register today and reach thousands of fashion enthusiasts.</p>
          <Link to="/register-shop" className="inline-flex items-center text-luxury-gold font-bold group">
            BECOME A PARTNER <Icons.ArrowRight />
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-6 border-t border-white/5 mt-12 pt-8 flex flex-col sm:row items-center justify-between text-xs text-gray-500">
        <p>&copy; 2024 Brotherhood Clothing. Built for Palanpur Fashion.</p>
        <p>Crafted with Excellence.</p>
      </div>
    </footer>
  );
};

// --- Page Components ---

const Home: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    setShops(getShops().filter(s => s.status === ShopStatus.APPROVED));
  }, []);

  return (
    <div className="pt-32 pb-20">
      <section className="container mx-auto px-6 mb-20 text-center">
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
          Palanpur's <span className="gold-gradient bg-clip-text text-transparent">Elite</span> <br /> Fashion Market
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Experience the curated collections of Palanpur's finest fashion houses. Premium style, local soul.
        </p>
      </section>

      <section className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-display font-bold">Featured Boutiques</h2>
          <div className="h-px flex-1 bg-white/10 mx-8 hidden sm:block"></div>
          <div className="flex gap-2">
            <span className="bg-luxury-gold text-luxury-black px-3 py-1 rounded text-xs font-bold">ALL</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shops.map((shop) => (
            <Link key={shop.id} to={`/shop/${shop.id}`} className="group relative bg-luxury-charcoal rounded-2xl overflow-hidden border border-white/5 hover:border-luxury-gold/30 transition-all duration-500 hover:-translate-y-1">
              {shop.isFounder && (
                <div className="absolute top-4 left-4 z-10 bg-luxury-gold text-luxury-black text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  FOUNDER
                </div>
              )}
              <div className="h-64 overflow-hidden relative">
                <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {shop.name}
                    {shop.isFounder && <Icons.Verified />}
                  </h3>
                  <span className="text-xs text-gray-500 font-medium">{shop.category}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 font-light">
                  {shop.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-gray-400 font-medium">
                    {shop.followersCount.toLocaleString()} Followers
                  </span>
                  <span className="text-luxury-gold text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                    VIEW PROFILE <Icons.ArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const ShopProfile: React.FC<{ id?: string }> = ({ id }) => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const shops = getShops();
    const found = shops.find(s => s.id === id);
    if (found) setShop(found);
  }, [id]);

  if (!shop) return <div className="pt-40 text-center">Shop not found.</div>;

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Instagram style Header */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16 pb-16 border-b border-white/5">
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-luxury-gold p-1 shrink-0">
            <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <h1 className="text-3xl font-display font-bold flex items-center gap-2">
                {shop.name}
                {shop.isFounder && <Icons.Verified />}
              </h1>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-8 py-2 rounded-lg font-bold text-sm transition-all ${isFollowing ? 'bg-white/10 text-white' : 'gold-gradient text-luxury-black'}`}
                >
                  {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                </button>
                <a href={shop.instagram} target="_blank" rel="noreferrer" className="px-6 py-2 bg-luxury-charcoal border border-white/10 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-all">
                   <Icons.Instagram /> INSTAGRAM
                </a>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-start gap-10 mb-6 text-sm">
              <div><span className="font-bold text-white">{shop.images.length}</span> <span className="text-gray-500">Gallery</span></div>
              <div><span className="font-bold text-white">{(shop.followersCount + (isFollowing ? 1 : 0)).toLocaleString()}</span> <span className="text-gray-500">Followers</span></div>
              <div><span className="font-bold text-white">128</span> <span className="text-gray-500">Following</span></div>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-white">{shop.ownerName}</p>
              <p className="text-gray-400 font-light leading-relaxed">{shop.description}</p>
              <div className="flex flex-col gap-1 mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-2"><Icons.Location /> {shop.city}</div>
                <div className="flex items-center gap-2"><Icons.Phone /> {shop.phone}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-8">
          {shop.images.map((img, idx) => (
            <div key={idx} className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
              <img src={img} alt={`${shop.name} gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-white font-bold text-sm">VIEW</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RegisterShop: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    phone: '',
    email: '',
    city: 'Palanpur',
    category: ShopCategory.ALL,
    instagram: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user) {
    return (
      <div className="pt-40 pb-20 text-center container mx-auto px-6">
        <h2 className="text-3xl font-display font-bold mb-6">Start Your Journey</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Please login with Google to register your shop and join the Brotherhood Clothing market.</p>
        <button onClick={login} className="gold-gradient text-luxury-black font-bold px-10 py-4 rounded-full hover:scale-105 transition-all shadow-xl">
          LOGIN TO CONTINUE
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newShop: Shop = {
        id: generateId(),
        ownerId: user.id,
        name: formData.name,
        ownerName: formData.ownerName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        category: formData.category,
        instagram: formData.instagram,
        description: formData.description,
        images: [
          `https://picsum.photos/seed/${Math.random()}/800/600`,
          `https://picsum.photos/seed/${Math.random()}/800/600`,
          `https://picsum.photos/seed/${Math.random()}/800/600`
        ],
        status: ShopStatus.PENDING,
        isFounder: false,
        followersCount: 0
      };
      
      saveShop(newShop);
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="pt-40 pb-20 text-center container mx-auto px-6">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Registration Submitted!</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Your shop is currently under review by our admin. Once approved, it will be visible on the explore page. Check your dashboard for status updates.</p>
        <Link to="/dashboard" className="px-10 py-4 glass rounded-full font-bold hover:bg-white/10 transition-all">
          GO TO DASHBOARD
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Register Your Boutique</h1>
          <p className="text-gray-400">Provide your shop details to join Palanpur's premier fashion network.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Shop Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-gold transition-all"
                placeholder="e.g. Elegant Attire"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Owner Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-gold transition-all"
                placeholder="Full Name"
                value={formData.ownerName}
                onChange={e => setFormData({...formData, ownerName: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Phone Number</label>
              <input 
                required
                type="tel" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-gold transition-all"
                placeholder="9998887776"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Email Address</label>
              <input 
                required
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-gold transition-all"
                placeholder="shop@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Category</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-gold transition-all"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as ShopCategory})}
              >
                {Object.values(ShopCategory).map(cat => (
                  <option key={cat} value={cat} className="bg-luxury-black">{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Instagram Link (Optional)</label>
              <input 
                type="url" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-gold transition-all"
                placeholder="https://instagram.com/yourshop"
                value={formData.instagram}
                onChange={e => setFormData({...formData, instagram: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Shop Description</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-luxury-gold transition-all"
              placeholder="Tell us about your style and what makes your shop unique..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button 
            disabled={isSubmitting}
            type="submit" 
            className="w-full gold-gradient text-luxury-black font-bold py-4 rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REGISTRATION'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [userShops, setUserShops] = useState<Shop[]>([]);
  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [activeTab, setActiveTab] = useState<'my-shop' | 'admin'>('my-shop');

  useEffect(() => {
    const shops = getShops();
    if (isAdmin) {
      setAllShops(shops);
    }
    setUserShops(shops.filter(s => s.ownerId === user?.id));
  }, [user, isAdmin]);

  const handleApprove = (id: string) => {
    const shops = getShops();
    const idx = shops.findIndex(s => s.id === id);
    if (idx >= 0) {
      shops[idx].status = ShopStatus.APPROVED;
      saveShop(shops[idx]);
      setAllShops([...shops]);
    }
  };

  const handleBlock = (id: string) => {
    const shops = getShops();
    const idx = shops.findIndex(s => s.id === id);
    if (idx >= 0) {
      shops[idx].status = ShopStatus.BLOCKED;
      saveShop(shops[idx]);
      setAllShops([...shops]);
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <div className="glass p-6 rounded-2xl mb-6 flex items-center gap-4">
            <img src={user?.picture} alt={user?.name} className="w-12 h-12 rounded-full border border-luxury-gold" />
            <div>
              <p className="font-bold text-sm">{user?.name}</p>
              <p className="text-[10px] text-luxury-gold font-bold uppercase tracking-widest">{user?.role}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('my-shop')}
            className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-between ${activeTab === 'my-shop' ? 'gold-gradient text-luxury-black' : 'hover:bg-white/5'}`}
          >
            MY SHOP 
          </button>
          
          {isAdmin && (
            <button 
              onClick={() => setActiveTab('admin')}
              className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-between ${activeTab === 'admin' ? 'purple-gradient text-white' : 'hover:bg-white/5'}`}
            >
              ADMIN PANEL
            </button>
          )}

          <div className="pt-10">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-6 mb-4">Support</p>
            <button className="w-full text-left px-6 py-3 rounded-xl hover:bg-white/5 text-gray-400 text-sm font-medium">Contact Admin</button>
            <button className="w-full text-left px-6 py-3 rounded-xl hover:bg-white/5 text-gray-400 text-sm font-medium">Account Settings</button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-9">
          {activeTab === 'my-shop' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold">Manage Your Shops</h2>
              
              {userShops.length === 0 ? (
                <div className="glass p-20 text-center rounded-3xl">
                  <p className="text-gray-500 mb-6">You haven't registered any shops yet.</p>
                  <Link to="/register-shop" className="gold-gradient text-luxury-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-all">
                    REGISTER NOW
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userShops.map(shop => (
                    <div key={shop.id} className="glass rounded-3xl p-6 relative overflow-hidden group">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          shop.status === ShopStatus.APPROVED ? 'bg-green-500/10 text-green-500' :
                          shop.status === ShopStatus.PENDING ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {shop.status}
                        </div>
                        <Link to={`/shop/${shop.id}`} className="text-luxury-gold text-xs font-bold hover:underline">VIEW PROFILE</Link>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{shop.name}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-6">{shop.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button className="bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded-xl text-sm transition-all">EDIT INFO</button>
                        <button className="bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded-xl text-sm transition-all">MANAGE IMAGES</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold">Admin Controls</h2>
              <div className="overflow-hidden rounded-2xl glass">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-luxury-gold font-bold uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Shop Name</th>
                      <th className="px-6 py-4">Owner</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allShops.filter(s => !s.isFounder).map(shop => (
                      <tr key={shop.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-6 font-bold">{shop.name}</td>
                        <td className="px-6 py-6 text-gray-400">{shop.ownerName}</td>
                        <td className="px-6 py-6">
                           <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              shop.status === ShopStatus.APPROVED ? 'bg-green-500/10 text-green-500' :
                              shop.status === ShopStatus.PENDING ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                           }`}>
                            {shop.status}
                           </span>
                        </td>
                        <td className="px-6 py-6 text-right space-x-2">
                          {shop.status !== ShopStatus.APPROVED && (
                            <button onClick={() => handleApprove(shop.id)} className="text-green-500 hover:text-green-400 font-bold text-xs uppercase">Approve</button>
                          )}
                          {shop.status !== ShopStatus.BLOCKED && (
                            <button onClick={() => handleBlock(shop.id)} className="text-red-500 hover:text-red-400 font-bold text-xs uppercase">Block</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- App Wrap ---

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:id" element={<ShopProfileWrapper />} />
          <Route path="/register-shop" element={<RegisterShop />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const ShopProfileWrapper = () => {
  const { id } = useParams();
  return <ShopProfile id={id} />;
};

import { useParams } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const About = () => (
  <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl text-center">
    <h1 className="text-5xl font-display font-bold mb-10">Connecting Palanpur's <span className="gold-gradient bg-clip-text text-transparent">Finest</span></h1>
    <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
      Brotherhood Clothing is more than just a market; it's a movement to bring the premium boutiques of Palanpur under one luxury umbrella. Founded by Ashish Gauswami, we believe in community, quality, and the timeless art of fashion.
    </p>
    <img src="https://picsum.photos/seed/about/1200/600" className="rounded-3xl w-full h-80 object-cover mb-12 opacity-60" alt="About Brotherhood" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="glass p-8 rounded-2xl">
        <h3 className="text-luxury-gold font-bold mb-2">CURATED</h3>
        <p className="text-sm text-gray-400">Handpicked shops representing the best of Gujarat's style.</p>
      </div>
      <div className="glass p-8 rounded-2xl">
        <h3 className="text-luxury-gold font-bold mb-2">COMMUNITY</h3>
        <p className="text-sm text-gray-400">Bridging the gap between local creators and fashion lovers.</p>
      </div>
      <div className="glass p-8 rounded-2xl">
        <h3 className="text-luxury-gold font-bold mb-2">EXCELLENCE</h3>
        <p className="text-sm text-gray-400">Upholding the highest standards in product and presentation.</p>
      </div>
    </div>
  </div>
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const login = () => {
    // Simulate Google OAuth Popup
    const mockUser: User = {
      id: 'mock-user-123',
      name: 'Ashish Gauswami',
      email: 'gauswamiashish760@gmail.com',
      picture: 'https://picsum.photos/seed/profile/200/200',
      role: UserRole.ADMIN // Hardcoded Ashish as Admin for demo
    };
    loginUser(mockUser);
    setUser(mockUser);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const isAdmin = user?.role === UserRole.ADMIN || user?.email === FOUNDER_SHOP.email;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
