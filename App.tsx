import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, Navigate, useParams, useLocation } from 'react-router-dom';
// Fix: Consolidate Firebase Auth imports and remove unused User type which was causing export errors
import { onAuthStateChanged } from 'firebase/auth';
import { User, Shop, UserRole, ShopStatus, ShopCategory, ShopMedia } from './types';
import {
  getShops,
  saveShop,
  generateId,
  toggleFollowShop,
  getPublicMarketplaceShops,
  getShopsByStatus,
  getUserProfile,
  saveUserProfile
} from './store';
import { Icons, FOUNDER_SHOP } from './constants';
import { auth } from './src/firebase';
import { logout, getOrCreateUserProfile } from './src/auth';
import Login from './src/Login';

// --- Context ---
interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAdmin: boolean;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// --- Components ---

const Header: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center font-display font-black text-luxury-black group-hover:rotate-12 transition-transform">B</div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold tracking-tight gold-gradient bg-clip-text text-transparent">
              BROTHERHOOD
            </span>
            <span className="text-[10px] text-luxury-gold font-accent tracking-[0.3em] font-bold uppercase">Clothing</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Marketplace</Link>
          <Link to="/register-shop" className="hover:text-white transition-colors">Partner With Us</Link>
          <Link to="/about" className="hover:text-white transition-colors">Our Story</Link>
        </nav>

        <div className="flex items-center gap-6">
          {loading ? (
            <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 transition-all group">
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-luxury-gold group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block text-xs font-bold uppercase tracking-widest">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors hidden md:block">Logout</button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="gold-gradient text-luxury-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all text-[11px] tracking-widest shadow-xl shadow-luxury-gold/10">
              LOGIN
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const Home: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    setShops(getPublicMarketplaceShops());
  }, []);

  return (
    <div className="pt-32 lg:pt-40 pb-32">
      <section className="container mx-auto px-6 mb-20 lg:mb-24 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-luxury-gold/20 mb-6 bg-luxury-gold/5">
          <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.3em]">Palanpur's Fashion Market</span>
        </div>
        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 leading-[1.1] md:leading-[0.9]">
          The New Standard <br className="hidden md:block" /> of <span className="gold-gradient bg-clip-text text-transparent">Elite Fashion</span>
        </h1>
        <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10 md:mb-12">
          Discover curated boutiques, artisanal creators, and premium clothing houses from the heart of Gujarat.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register-shop" className="w-full sm:w-auto gold-gradient text-luxury-black font-black px-10 py-4 rounded-xl hover:scale-105 transition-all shadow-2xl text-xs tracking-widest uppercase">
            REGISTER YOUR SHOP
          </Link>
          <Link to="/about" className="w-full sm:w-auto px-10 py-4 border border-white/10 hover:bg-white/5 rounded-xl transition-all font-bold text-xs tracking-widest uppercase">
            LEARN OUR STORY
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {shops.map((shop) => (
            <Link key={shop.id} to={`/shop/${shop.id}`} className="group bg-luxury-charcoal/50 rounded-3xl overflow-hidden border border-white/5 hover:border-luxury-gold/20 transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 md:h-72 overflow-hidden relative">
                <img src={shop.media.find(m => m.isPinned)?.url || shop.media[0]?.url} alt={shop.shopName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent"></div>
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {shop.isFounder && (
                    <div className="bg-luxury-gold text-luxury-black text-[9px] font-black px-3 py-1 rounded-md shadow-2xl uppercase tracking-tighter flex items-center gap-1">
                      <Icons.Verified size={3} color="text-luxury-black" /> FOUNDER
                    </div>
                  )}
                  <div className="glass text-white text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-tighter">
                    {shop.category} Wear
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-luxury-gold p-0.5 bg-luxury-black shrink-0 shadow-2xl">
                    <img src={shop.logoUrl} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-white flex items-center gap-2">
                      {shop.shopName}
                    </h3>
                    <p className="text-gray-400 text-[9px] uppercase tracking-widest font-bold">{shop.ownerName}</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-8 line-clamp-2 font-light italic">
                   "{shop.description}"
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-base md:text-lg">{shop.followersCount.toLocaleString()}</span>
                    <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Followers</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-luxury-gold font-black text-[10px] tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center uppercase">
                      VIEW PROFILE <Icons.ArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

const ShopProfile: React.FC = () => {
  const { id } = useParams();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [shop, setShop] = useState<Shop | null>(null);
  const isFollowing = user?.followedShopIds.includes(id || '') || false;

  useEffect(() => {
    const shops = getShops();
    const found = shops.find(s => s.id === id);
    if (found) setShop(found);
    window.scrollTo(0, 0);
  }, [id]);

  const handleFollow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const result = toggleFollowShop(user.id, shop!.id);
    if (result) {
      updateUser(result.user);
      setShop(result.shop);
    }
  };

  if (!shop) return <div className="pt-40 text-center">Shop not found.</div>;

  const displayMedia = [...shop.media].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div className="pt-24 lg:pt-40 pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-10 md:mb-16 pb-12 md:pb-16 border-b border-white/5">
          <div className="w-28 h-28 md:w-44 md:h-44 rounded-full p-1 border-2 border-luxury-gold shrink-0 bg-luxury-black shadow-2xl">
            <img src={shop.logoUrl} alt={shop.shopName} className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center justify-center md:justify-start gap-2">
                {shop.shopName}
                {shop.isFounder && <Icons.Verified size={6} />}
              </h1>
              <div className="flex justify-center md:justify-start gap-2">
                <button 
                  onClick={handleFollow}
                  className={`px-6 md:px-8 py-2 rounded-lg font-black text-[10px] tracking-widest transition-all ${isFollowing ? 'bg-white/10 text-white border border-white/10' : 'gold-gradient text-luxury-black shadow-xl shadow-luxury-gold/20'}`}
                >
                  {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                </button>
                {shop.instagramUrl && (
                  <a href={shop.instagramUrl} target="_blank" rel="noreferrer" className="px-4 py-2 glass hover:bg-white/5 rounded-lg flex items-center gap-2 text-white border border-white/5 transition-all">
                    <Icons.Instagram />
                  </a>
                )}
              </div>
            </div>
            <div className="flex justify-center md:justify-start gap-8 md:gap-12 mb-8 border-y md:border-none border-white/5 py-4 md:py-0">
              <div className="text-center md:text-left"><span className="text-white font-bold block md:inline text-base">{shop.media.length}</span> <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest ml-1">Posts</span></div>
              <div className="text-center md:text-left"><span className="text-white font-bold block md:inline text-base">{shop.followersCount.toLocaleString()}</span> <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest ml-1">Followers</span></div>
              <div className="text-center md:text-left"><span className="text-white font-bold block md:inline text-base">{shop.followingCount}</span> <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest ml-1">Following</span></div>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-sm text-white">{shop.ownerName}</p>
              <p className="text-gray-400 text-sm font-light leading-relaxed max-w-lg">{shop.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                <div className="flex items-center gap-1.5"><Icons.ArrowRight /> {shop.city}</div>
                <div className="flex items-center gap-1.5"><Icons.ArrowRight /> {shop.category} Wear</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {displayMedia.map((media) => (
            <div key={media.id} className="aspect-square relative group cursor-pointer overflow-hidden rounded-md md:rounded-xl bg-luxury-charcoal">
              <img src={media.url} alt={`${shop.shopName} post`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {media.isPinned && (
                <div className="absolute top-2 right-2 md:top-4 md:right-4 gold-gradient p-1 md:p-1.5 rounded-full shadow-lg">
                  <Icons.Pin />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RegisterShop: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    phone: '',
    email: '',
    city: 'Palanpur',
    address: '',
    category: ShopCategory.ALL,
    instagramUrl: '',
    description: '',
    bio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user) {
    return (
      <div className="pt-40 pb-40 text-center container mx-auto px-6">
        <h2 className="text-4xl font-display font-bold mb-6 italic">Partner With Us</h2>
        <p className="text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">Join the exclusive brotherhood of Palanpur's fashion leaders.</p>
        <button onClick={() => navigate('/login')} className="gold-gradient text-luxury-black font-black px-12 py-4 rounded-xl hover:scale-105 transition-all shadow-2xl text-xs tracking-widest uppercase">
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
        shopName: formData.shopName,
        ownerName: formData.ownerName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        address: formData.address,
        category: formData.category,
        instagramUrl: formData.instagramUrl,
        logoUrl: `https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=200&h=200`,
        media: [],
        status: ShopStatus.PENDING,
        isFounder: false,
        followersCount: 0,
        followingCount: 0,
        description: formData.description,
        bio: formData.bio,
        createdAt: Date.now()
      };
      saveShop(newShop);
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="pt-40 pb-40 text-center container mx-auto px-6">
        <h2 className="text-4xl font-display font-bold mb-4 italic">Boutique Registered</h2>
        <p className="text-gray-500 mb-10">Your application is now under review by Ashish.</p>
        <Link to="/dashboard" className="px-12 py-4 gold-gradient text-luxury-black rounded-xl font-black uppercase text-xs">
          GO TO DASHBOARD
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 lg:pt-40 pb-32">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-display font-bold mb-10 text-center italic">Marketplace Registration</h1>
        <form onSubmit={handleSubmit} className="bg-luxury-charcoal/30 border border-white/5 p-8 rounded-3xl space-y-6">
          <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-luxury-gold outline-none" placeholder="Shop Name" value={formData.shopName} onChange={e => setFormData({...formData, shopName: e.target.value})} />
          <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-luxury-gold outline-none" placeholder="Owner Name" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-luxury-gold outline-none" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-luxury-gold outline-none" placeholder="Business Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-luxury-gold outline-none" placeholder="Shop Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          <input type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-luxury-gold outline-none" placeholder="Instagram Profile Link" value={formData.instagramUrl} onChange={e => setFormData({...formData, instagramUrl: e.target.value})} />
          <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-luxury-gold outline-none" placeholder="Shop Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <button disabled={isSubmitting} type="submit" className="w-full gold-gradient text-luxury-black font-black py-4 rounded-xl uppercase tracking-widest text-xs">
            {isSubmitting ? 'PROCESSING...' : 'SUBMIT FOR APPROVAL'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [userShops, setUserShops] = useState<Shop[]>([]);
  const [activeTab, setActiveTab] = useState<'my-shop' | 'admin-queue'>('my-shop');
  const [pendingShops, setPendingShops] = useState<Shop[]>([]);

  useEffect(() => {
    const shops = getShops();
    setUserShops(shops.filter(s => s.ownerId === user?.id));
    if (isAdmin) {
      setPendingShops(getShopsByStatus(ShopStatus.PENDING));
    }
  }, [user, isAdmin]);

  const handleAction = (id: string, status: ShopStatus) => {
    const shops = getShops();
    const shop = shops.find(s => s.id === id);
    if (shop) {
      shop.status = status;
      saveShop(shop);
      setPendingShops(getShopsByStatus(ShopStatus.PENDING));
    }
  };

  return (
    <div className="pt-32 lg:pt-40 pb-32 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex gap-4 mb-10">
          <button onClick={() => setActiveTab('my-shop')} className={`px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'my-shop' ? 'gold-gradient text-luxury-black' : 'text-gray-500 hover:text-white'}`}>My Portfolio</button>
          {isAdmin && (
            <button onClick={() => setActiveTab('admin-queue')} className={`px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'admin-queue' ? 'purple-gradient text-white' : 'text-gray-500 hover:text-white'}`}>Admin Queue ({pendingShops.length})</button>
          )}
        </div>

        {activeTab === 'my-shop' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userShops.map(shop => (
              <div key={shop.id} className="bg-luxury-charcoal/50 border border-white/5 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    shop.status === ShopStatus.APPROVED ? 'bg-green-500/10 text-green-500' :
                    shop.status === ShopStatus.PENDING ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {shop.status}
                  </div>
                  <Link to={`/shop/${shop.id}`} className="text-luxury-gold text-[10px] font-black tracking-widest uppercase hover:underline">View Profile</Link>
                </div>
                <h3 className="text-2xl font-display font-bold italic mb-4">{shop.shopName}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{shop.description}</p>
                <div className="flex gap-4 border-t border-white/5 pt-6">
                   <div className="text-center flex-1">
                      <span className="block text-white font-bold">{shop.followersCount}</span>
                      <span className="text-[8px] text-gray-500 uppercase font-black">Followers</span>
                   </div>
                   <div className="text-center flex-1">
                      <span className="block text-white font-bold">{shop.media.length}</span>
                      <span className="text-[8px] text-gray-500 uppercase font-black">Images</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold mb-10 italic">Incoming Applications</h2>
            {pendingShops.map(shop => (
              <div key={shop.id} className="bg-luxury-charcoal border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl transition-all hover:border-luxury-gold/30">
                <div>
                   <h4 className="text-xl font-bold text-white">{shop.shopName}</h4>
                   <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">{shop.ownerName} • {shop.phone}</p>
                   <p className="text-gray-400 text-sm italic">"{shop.description}"</p>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => handleAction(shop.id, ShopStatus.APPROVED)} className="px-6 py-2 bg-green-500/10 text-green-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-green-500/20">Approve</button>
                   <button onClick={() => handleAction(shop.id, ShopStatus.BLOCKED)} className="px-6 py-2 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20">Block</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const About = () => (
  <div className="pt-32 lg:pt-40 pb-32 container mx-auto px-6 max-w-4xl text-center">
    <div className="inline-block px-4 py-1.5 rounded-full border border-luxury-gold/20 mb-8 bg-luxury-gold/5">
      <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.4em]">Founded in Palanpur</span>
    </div>
    <h1 className="text-5xl md:text-7xl font-display font-black mb-12 italic leading-tight">Elite <br className="hidden md:block" /> <span className="gold-gradient bg-clip-text text-transparent">Heritage</span></h1>
    <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-16 italic max-w-2xl mx-auto">
      "Brotherhood Clothing represents the culmination of regional boutique excellence. We unify Palanpur's most dedicated fashion houses under one mark of luxury."
    </p>
    <div className="relative rounded-[3rem] overflow-hidden mb-20 shadow-2xl">
       <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" className="w-full h-[500px] object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-[2s]" />
       <div className="absolute inset-0 bg-gradient-to-t from-luxury-black to-transparent"></div>
       <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
          <Icons.Verified size={10} />
          <p className="text-luxury-gold font-display text-3xl font-bold mt-2">Ashish Gauswami</p>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Architect of Brotherhood</p>
       </div>
    </div>
  </div>
);

const LoginPrompt = () => {
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

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

// Fix: Added missing MobileBottomNav and Footer components for better UX and to resolve build errors
const MobileBottomNav: React.FC = () => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-6 py-4 flex items-center justify-around z-50">
    <Link to="/" className="text-gray-400 hover:text-luxury-gold transition-all">
      <Icons.Home />
    </Link>
    <Link to="/register-shop" className="text-gray-400 hover:text-luxury-gold transition-all">
      <Icons.Plus />
    </Link>
    <Link to="/dashboard" className="text-gray-400 hover:text-luxury-gold transition-all">
      <Icons.User />
    </Link>
  </nav>
);

const Footer: React.FC = () => (
  <footer className="bg-luxury-black border-t border-white/5 py-16 mt-20 pb-24 lg:pb-16">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center font-display font-black text-luxury-black text-sm">B</div>
            <span className="font-display text-sm font-extrabold gold-gradient bg-clip-text text-transparent uppercase tracking-wider">Brotherhood</span>
          </div>
          <p className="text-gray-600 text-[9px] uppercase tracking-[0.2em] font-bold">The New Standard of Fashion</p>
        </div>
        
        <div className="flex gap-10">
          <Link to="/about" className="text-gray-500 hover:text-white text-[9px] uppercase font-bold tracking-widest transition-colors">Story</Link>
          <Link to="/" className="text-gray-500 hover:text-white text-[9px] uppercase font-bold tracking-widest transition-colors">Marketplace</Link>
          <Link to="/register-shop" className="text-gray-500 hover:text-white text-[9px] uppercase font-bold tracking-widest transition-colors">Partner</Link>
        </div>

        <div className="text-right">
          <p className="text-gray-700 text-[9px] uppercase tracking-[0.2em] font-bold">
            © {new Date().getFullYear()} Brotherhood Clothing • Palanpur
          </p>
        </div>
      </div>
    </div>
  </footer>
);

// --- App Structure Wrapper ---
const AppContent: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-luxury-black text-white selection:bg-luxury-gold selection:text-luxury-black flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:id" element={<ShopProfile />} />
          <Route path="/register-shop" element={<RegisterShop />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/login-prompt" element={<LoginPrompt />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const profile = getOrCreateUserProfile(firebaseUser);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUser = (u: User) => {
    setUser({ ...u });
    saveUserProfile(u);
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <AuthContext.Provider value={{ user, loading, logout, isAdmin, updateUser }}>
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
