
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shopName: '',
    shopDescription: '',
    shopAddress: '',
    shopCategory: 'Western'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: role
    };

    let shopData = null;
    if (role === UserRole.SHOP_OWNER) {
      shopData = {
        name: formData.shopName,
        description: formData.shopDescription,
        address: formData.shopAddress,
        whatsapp: formData.phone,
        phone: formData.phone,
        category: formData.shopCategory
      };
    }

    register(userData, shopData);
    navigate(role === UserRole.SHOP_OWNER ? '/dashboard' : '/shops');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-32 pb-20 px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-[#0d0d0d] border border-white/5 shadow-2xl overflow-hidden">
        <div className="w-full md:w-5/12 bg-amber-600 p-16 flex flex-col justify-between text-black">
          <div className="space-y-6">
             <div className="text-[11px] font-black uppercase tracking-[0.4em]">The Collective</div>
             <h2 className="font-serif text-6xl font-bold leading-none tracking-tighter">Your Legacy <br/>Starts Here.</h2>
          </div>
          <p className="text-sm font-semibold leading-relaxed opacity-70 border-l-2 border-black pl-6">
            Joining Brotherhood means connecting your brand to Palanpur's most discerning fashion community.
          </p>
        </div>
        
        <div className="w-full md:w-7/12 p-16 overflow-y-auto max-h-[85vh]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex gap-4 p-1 bg-white/5 border border-white/10 mb-8">
               <button 
                 type="button" 
                 onClick={() => setRole(UserRole.CUSTOMER)}
                 className={`flex-1 py-3 text-[9px] font-bold uppercase tracking-widest transition-all ${role === UserRole.CUSTOMER ? 'bg-amber-600 text-black' : 'text-gray-500 hover:text-white'}`}
               >
                 Customer
               </button>
               <button 
                 type="button" 
                 onClick={() => setRole(UserRole.SHOP_OWNER)}
                 className={`flex-1 py-3 text-[9px] font-bold uppercase tracking-widest transition-all ${role === UserRole.SHOP_OWNER ? 'bg-amber-600 text-black' : 'text-gray-500 hover:text-white'}`}
               >
                 Shop Owner
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" required
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-amber-600 transition-colors"
                  placeholder="Ashish Gauswami"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Business Email</label>
                <input 
                  type="email" required
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-amber-600 transition-colors"
                  placeholder="ashish@example.com"
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Phone Number (WhatsApp)</label>
              <input 
                type="tel" required
                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-amber-600 transition-colors"
                placeholder="9664592743"
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            {role === UserRole.SHOP_OWNER && (
              <div className="space-y-8 pt-8 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Boutique Name</label>
                  <input 
                    type="text" required
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-amber-600 transition-colors"
                    placeholder="Grand Ethnic Boutique"
                    onChange={e => setFormData({...formData, shopName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Boutique Description</label>
                  <textarea required
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-amber-600 transition-colors h-32"
                    placeholder="Briefly describe your style and collection..."
                    onChange={e => setFormData({...formData, shopDescription: e.target.value})}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Address</label>
                    <input 
                      type="text" required
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-amber-600 transition-colors"
                      placeholder="Street, Area, Palanpur"
                      onChange={e => setFormData({...formData, shopAddress: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Category</label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white text-sm outline-none focus:border-amber-600 transition-colors"
                      onChange={e => setFormData({...formData, shopCategory: e.target.value})}
                    >
                      <option value="Western" className="bg-[#0d0d0d]">Western</option>
                      <option value="Ethnic" className="bg-[#0d0d0d]">Ethnic</option>
                      <option value="Menswear" className="bg-[#0d0d0d]">Menswear</option>
                      <option value="Bridal" className="bg-[#0d0d0d]">Bridal</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-10">
              <button 
                type="submit"
                className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-amber-600 hover:text-white transition-all duration-500"
              >
                Confirm Membership
              </button>
            </div>
            
            <p className="text-center text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              Existing Member? <Link to="/login" className="text-white hover:text-amber-500 underline underline-offset-8">Authenticate</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
