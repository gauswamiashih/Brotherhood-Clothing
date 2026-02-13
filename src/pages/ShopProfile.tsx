import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

const ShopProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth(); // Use auth only for follow action check
  const [shop, setShop] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('Collection');
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const INSTAGRAM_URL = "https://www.instagram.com/gauswami_8_07_18?igsh=MXQxMmdqM3A2YXN0ZQ==";

  useEffect(() => {
    if (id) {
      fetchShopData(id);
    }
  }, [id]);

  useEffect(() => {
    if (user && shop) {
      checkifFollowing();
    }
  }, [user, shop]);

  const fetchShopData = async (shopId: string) => {
    try {
      setLoading(true);
      // Fetch shop details
      const { data: shopData, error: shopError } = await supabase
        .from('shops')
        .select('*')
        .eq('id', shopId)
        .single();

      if (shopError) throw shopError;
      setShop(shopData);

      // Fetch products
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('shop_id', shopId);

      if (productError) throw productError;
      setProducts(productData || []);

      // Increment view count (fire and forget)
      supabase.rpc('increment_shop_view', { shop_id: shopId });

    } catch (error) {
      console.error("Error fetching shop data:", error);
      toast.error("Could not load shop details.");
    } finally {
      setLoading(false);
    }
  };

  const checkifFollowing = async () => {
    if (!user || !shop) return;
    const { data } = await supabase
      .from('user_follows')
      .select('*')
      .eq('user_id', user.id)
      .eq('shop_id', shop.id)
      .single();
    setIsFollowing(!!data);
  };

  const handleFollow = async () => {
    if (!user) {
      toast.error("Please login to follow shops");
      signInWithGoogle(); // Or redirect to login
      return;
    }
    if (!shop) return;

    if (isFollowing) {
      const { error } = await supabase
        .from('user_follows')
        .delete()
        .eq('user_id', user.id)
        .eq('shop_id', shop.id);
      if (!error) setIsFollowing(false);
    } else {
      const { error } = await supabase
        .from('user_follows')
        .insert({ user_id: user.id, shop_id: shop.id });
      if (!error) setIsFollowing(true);
    }
  };


  const handleWhatsApp = (productName?: string) => {
    if (!shop) return;
    const text = productName
      ? `Hello, I'm inquiring about the piece "${productName}" from your Brotherhood collection.`
      : `Hello, I discovered your boutique on Brotherhood Clothing and would like to see your latest collection.`;
    window.open(`https://wa.me/91${shop.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCall = () => {
    if (shop) window.location.href = `tel:+91${shop.phone}`;
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center text-white">Loading Atelier...</div>;
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-white font-serif text-4xl">ATELIER NOT FOUND</h1>
          <button onClick={() => navigate('/')} className="text-purple-500 font-bold uppercase tracking-widest text-xs underline">RETURN TO MARKETPLACE</button>
        </div>
      </div>
    );
  }

  // Fallbacks for missing images
  const coverImage = shop.cover_image || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000';
  const logoImage = shop.logo_url || 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=200';

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Immersive Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={coverImage}
          className="w-full h-full object-cover opacity-20 scale-105"
          alt="Shop Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
          <div className="text-luxury-gold text-[10px] uppercase tracking-[0.6em] font-black mb-4">ESTABLISHED {new Date(shop.created_at).getFullYear()}</div>
          <h1 className="font-display text-5xl md:text-9xl text-white font-bold tracking-tighter leading-none mb-6 text-center">{shop.name}</h1>
          <div className="h-px w-24 bg-luxury-gold"></div>
        </div>
      </div>

      {/* Identity Card */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="bg-[#0d0d0d] border border-white/5 p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-12 items-center lg:items-end">
          <div className="relative flex-shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-black border border-white/10 overflow-hidden">
              <img src={logoImage} className="w-full h-full object-cover grayscale" alt="Atelier Logo" />
            </div>
            {shop.is_verified && (
              <div className="absolute -bottom-4 -right-4 bg-luxury-gold p-4 shadow-xl">
                <i className="fa-solid fa-crown text-luxury-black text-xl"></i>
              </div>
            )}
          </div>

          <div className="flex-grow space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <span className="px-4 py-1.5 bg-luxury-gold/10 border border-luxury-gold/20 text-luxury-gold text-[10px] font-black uppercase tracking-widest rounded-full">PRIVATE ATELIER</span>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">{shop.category}</span>
                {shop.instagram_url && (
                  <a
                    href={shop.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 bg-luxury-gold text-luxury-black text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2 hover:bg-white transition-colors"
                  >
                    <i className="fa-brands fa-instagram"></i>
                    INSTAGRAM
                  </a>
                )}
              </div>
              <p className="text-gray-400 font-light text-lg italic max-w-2xl leading-relaxed">"{shop.description}"</p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <button
                onClick={() => handleWhatsApp()}
                className="group relative px-10 py-5 bg-luxury-gold text-luxury-black font-black text-[10px] uppercase tracking-widest overflow-hidden transition-all shadow-[0_0_50px_rgba(212,175,55,0.2)]"
              >
                <span className="relative z-10">START ENQUIRY</span>
              </button>
              <button
                onClick={handleCall}
                className="px-10 py-5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                CALL FOUNDER
              </button>
              <button
                onClick={handleFollow}
                className={`px-10 py-5 border text-[10px] font-black uppercase tracking-widest transition-all ${isFollowing
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent border-white/20 text-gray-500 hover:text-white hover:border-white'
                  }`}
              >
                {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
              </button>
            </div>
          </div>
        </div>

        {/* Vital Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border-x border-b border-white/5">
          {[
            { label: 'FOLLOWERS', val: shop.followers_count || 0 }, // Assuming we have this column or need to count
            { label: 'CURATION VIEWS', val: shop.view_count || 0 },
            { label: 'REGION', val: 'PALANPUR' },
            { label: 'STATUS', val: shop.status?.toUpperCase() || 'ACTIVE' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0b0b0b] p-12 text-center group">
              <div className="text-[9px] uppercase tracking-[0.5em] text-gray-600 font-bold mb-2">{stat.label}</div>
              <div className="text-3xl font-display font-bold text-white group-hover:text-luxury-gold transition-colors">{stat.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-y border-white/5 bg-black/40 backdrop-blur-xl sticky top-20 z-20 mt-32">
        <div className="max-w-4xl mx-auto flex justify-center gap-12 md:gap-32">
          {['Collection', 'Atelier Info'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-10 text-[10px] tracking-[0.5em] uppercase font-black transition-all relative ${activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-gray-300'
                }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-luxury-gold"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-32 min-h-[60vh]">
        {activeTab === 'Collection' ? (
          <div className="space-y-32">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">SEASONAL <span className="text-luxury-gold italic">SELECTS</span></h2>
              <div className="h-px w-10 bg-white/10 mx-auto"></div>
              <p className="text-gray-500 font-light text-lg">Every garment is a testament to the pursuit of perfection. Exclusively available for private commission.</p>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {products.map(p => (
                  <div key={p.id} className="group relative">
                    <div className="aspect-[4/5] overflow-hidden bg-[#111] relative border border-white/5">
                      <img
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800'}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                        alt={p.name}
                      />
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center">
                        <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 space-y-6">
                          <p className="text-luxury-gold font-display italic text-3xl">₹{p.price}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleWhatsApp(p.name); }}
                            className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-all shadow-2xl"
                          >
                            REQUEST COMMISSION
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 space-y-2">
                      <div className="flex justify-between items-end">
                        <h4 className="font-display text-2xl text-white font-bold tracking-tight group-hover:text-luxury-gold transition-colors">{p.name}</h4>
                        <span className="text-[9px] text-gray-700 font-black uppercase tracking-widest">{p.category}</span>
                      </div>
                      <div className="h-px w-full bg-white/5"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-white/5 bg-white/5">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.4em]">Curating the premier collection... Please check back shortly.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="space-y-10">
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-luxury-gold">MISSION</h3>
                <p className="text-gray-400 font-light text-xl leading-relaxed italic">{shop.description}</p>
              </div>
              <div className="space-y-10">
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-luxury-gold">LOCATION</h3>
                <div className="space-y-4">
                  <p className="text-white text-2xl font-display font-bold">{shop.address}</p>
                  <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">GUJARAT, INDIA</p>
                </div>
              </div>
            </div>
            <div className="pt-24 border-t border-white/5 text-center">
              <button
                onClick={handleCall}
                className="px-20 py-8 bg-[#111] border border-white/5 text-white font-black text-[11px] uppercase tracking-[0.6em] hover:bg-luxury-gold hover:text-luxury-black transition-all"
              >
                SCHEDULE PRIVATE VIEWING
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#050505] py-40 border-t border-white/5 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter leading-none">THE <span className="text-luxury-gold">LEGACY</span> CONTINUES.</h2>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed italic">Brotherhood Clothing – Palanpur’s Own Fashion Market. Connecting the city's finest to the world's most discerning.</p>
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
