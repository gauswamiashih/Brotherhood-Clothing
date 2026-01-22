
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterShop: React.FC = () => {
  const { registerShop, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    category: 'Western',
    whatsapp: user?.phone || '',
    phone: user?.phone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerShop(formData);
    const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/shop/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center pt-32 pb-20 px-4">
      <div className="w-full max-w-4xl bg-[#0d0d0d] border border-white/5 shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-5/12 bg-purple-600 p-16 flex flex-col justify-between text-white">
          <div className="space-y-6">
            <div className="text-[11px] font-black uppercase tracking-[0.4em]">Digital Atelier</div>
            <h2 className="font-serif text-6xl font-bold leading-none tracking-tighter">List Your <br/>Collection.</h2>
          </div>
          <p className="text-sm font-semibold leading-relaxed opacity-70 border-l-2 border-white pl-6">
            Provide the details of your boutique. This information will be displayed to Palanpur's fashion enthusiasts.
          </p>
        </div>

        <div className="w-full md:w-7/12 p-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Boutique Name</label>
              <input 
                type="text" required
                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-purple-600 transition-colors"
                placeholder="Ex: Royal Rajputana Collection"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Description</label>
              <textarea required
                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-purple-600 transition-colors h-32"
                placeholder="Describe your boutique's specialty and history..."
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Address</label>
                <input 
                  type="text" required
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-purple-600 transition-colors"
                  placeholder="Street, Area, Palanpur"
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Category</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-purple-600 transition-colors"
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Western" className="bg-[#0d0d0d]">Western</option>
                  <option value="Ethnic" className="bg-[#0d0d0d]">Ethnic</option>
                  <option value="Menswear" className="bg-[#0d0d0d]">Menswear</option>
                  <option value="Bridal" className="bg-[#0d0d0d]">Bridal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">WhatsApp Number</label>
                <input 
                  type="tel" required
                  value={formData.whatsapp}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-purple-600 transition-colors"
                  placeholder="9664592743"
                  onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Public Phone</label>
                <input 
                  type="tel" required
                  value={formData.phone}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-purple-600 transition-colors"
                  placeholder="9664592743"
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-10">
              <button 
                type="submit"
                className="w-full py-6 bg-purple-600 text-white font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all duration-500"
              >
                PUBLISH MY SHOP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterShop;
