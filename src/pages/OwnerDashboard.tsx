import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { Shop, ShopStatus } from '../types';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  shop_id: string;
  images: string[];
}

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('Overview');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Western', description: '' });

  const [userShop, setUserShop] = useState<Shop | null>(null);
  const [shopProducts, setShopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchShopData();
    }
  }, [user]);

  const fetchShopData = async () => {
    try {
      setLoading(true);
      // Fetch Shop
      const { data: shops, error: shopError } = await supabase
        .from('shops')
        .select('*')
        .eq('owner_id', user?.id) // Note: using owner_id matching DB column
        .single();

      if (shopError && shopError.code !== 'PGRST116') {
        console.error('Error fetching shop:', shopError);
      }

      if (shops) {
        // Map DB columns to Shop interface if needed, or use as is if compliant
        // Assuming DB columns are snake_case, need mapping if Shop interface is camelCase
        // For now, assuming direct mapping or I will fix types later.
        // Let's assume we need to map for safety
        const mappedShop = {
          ...shops,
          shopName: shops.shop_name,
          ownerId: shops.owner_id,
          followersCount: shops.followers_count || 0,
          // Add other mappings
        };
        setUserShop(mappedShop as unknown as Shop);

        // Fetch Products
        const { data: products, error: prodError } = await supabase
          .from('products')
          .select('*')
          .eq('shop_id', shops.id);

        if (prodError) console.error('Error fetching products:', prodError);
        if (products) setShopProducts(products as unknown as Product[]);
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userShop) return;

    try {
      const { data, error } = await supabase.from('products').insert({
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category,
        description: newProduct.description,
        shop_id: userShop.id,
        images: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400'] // Placeholder
      }).select().single();

      if (error) throw error;

      setShopProducts([...shopProducts, data as unknown as Product]);
      setNewProduct({ name: '', price: '', category: 'Western', description: '' });
      setShowAddForm(false);
      toast.success('Product added successfully');
    } catch (error: any) {
      toast.error('Failed to add product: ' + error.message);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setShopProducts(shopProducts.filter(p => p.id !== id));
      toast.success('Product deleted');
    } catch (error: any) {
      toast.error('Failed to delete product');
    }
  };

  if (loading) return <div className="p-20 text-center text-white">Loading Dashboard...</div>;

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex pt-20">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0d0d0d] border-r border-white/5 p-8 hidden lg:block h-[calc(100vh-80px)] fixed">
        <div className="space-y-12">
          <div className="space-y-4">
            {[
              { name: 'Overview', icon: 'fa-chart-line' },
              { name: 'Inventory', icon: 'fa-box' },
              { name: 'Inquiries', icon: 'fa-message' },
              { name: 'Settings', icon: 'fa-gear' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveView(item.name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 transition-all ${activeView === item.name
                  ? 'bg-purple-600/10 text-purple-500 border-l-2 border-purple-600'
                  : 'text-gray-500 hover:text-white'
                  }`}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
              </button>
            ))}
          </div>

          <div className="pt-20 border-t border-white/5">
            <div className="p-6 bg-white/5 space-y-4">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Storage Status</p>
              <div className="h-1 w-full bg-white/10 overflow-hidden">
                <div className="h-full w-1/4 bg-purple-600"></div>
              </div>
              <p className="text-[10px] text-white font-bold">Real-time Persistence Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <h1 className="font-serif text-5xl text-white font-bold tracking-tight">{activeView} <span className="text-purple-500">Suite</span></h1>
              <p className="text-gray-500 font-light text-lg italic">Curating the collective at <span className="text-white font-medium">{userShop?.shopName || 'Your Shop'}</span></p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-8 py-4 bg-purple-600 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-purple-500 transition-colors shadow-2xl"
            >
              Curate New Piece
            </button>
          </div>

          {showAddForm && (
            <div className="bg-[#0d0d0d] border border-purple-600/30 p-8 shadow-2xl animate-fade-in">
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Piece Name</label>
                  <input required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full bg-black border border-white/10 p-4 text-white text-xs outline-none focus:border-purple-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Valuation (INR)</label>
                  <input type="number" required value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full bg-black border border-white/10 p-4 text-white text-xs outline-none focus:border-purple-600" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Collection Notes</label>
                  <textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full bg-black border border-white/10 p-4 text-white text-xs h-24 outline-none focus:border-purple-600"></textarea>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="px-8 py-4 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest">Publish Piece</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-8 py-4 border border-white/10 text-gray-500 text-[10px] font-bold uppercase tracking-widest">Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Shop Views', value: 0, trend: 'REALTIME', icon: 'fa-eye' },
              { label: 'Collective Leads', value: '0', trend: 'DYNAMIC', icon: 'fa-whatsapp' },
              { label: 'Curated Pieces', value: shopProducts.length, trend: 'STABLE', icon: 'fa-gem' },
              { label: 'Shop Status', value: userShop?.status || 'Active', trend: 'VERIFIED', icon: 'fa-star' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0d0d0d] border border-white/5 p-8 space-y-4 hover:border-purple-600/30 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/5 text-purple-500">
                    <i className={`fa-solid ${stat.icon}`}></i>
                  </div>
                  <span className="text-[10px] text-purple-400 font-black uppercase tracking-widest">{stat.trend}</span>
                </div>
                <div>
                  <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</h3>
                  <p className="text-2xl text-white font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0d0d0d] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#0e0e0e]">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Boutique Inventory</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-gray-500 text-[9px] uppercase tracking-[0.2em] font-bold">
                    <th className="px-8 py-5">Piece</th>
                    <th className="px-8 py-5">Valuation</th>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {shopProducts.length > 0 ? shopProducts.map(item => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5 flex items-center gap-4">
                        <div className="w-10 h-12 bg-black border border-white/10 overflow-hidden">
                          <img src={item.images[0]} className="w-full h-full object-cover grayscale" alt="piece" />
                        </div>
                        <span className="text-sm font-medium text-white">{item.name}</span>
                      </td>
                      <td className="px-8 py-5 text-xs text-gray-400 font-bold">₹{item.price}</td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-purple-600/10 text-purple-500 border border-purple-500/20">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          title="Delete Piece"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-10 text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest">No pieces curated in this collection yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;

