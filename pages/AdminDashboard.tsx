
import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { shops } = useAuth();
  
  // Real active partners (excluding founder flagship for administration)
  const registeredShops = shops.filter(s => s.priority === 2);

  const handleAdminAction = (action: string, shopName?: string) => {
    alert(`Admin Strategy: ${action} triggered ${shopName ? `for ${shopName}` : ''}`);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 space-y-2">
          <h1 className="font-serif text-5xl text-white font-bold tracking-tight">Marketplace <span className="text-purple-600 italic">Moderation</span></h1>
          <p className="text-gray-500 font-light text-lg uppercase tracking-widest text-xs">Platform Governance & Real-time Partner Feed</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Real Partners Feed */}
            <div className="bg-[#0d0d0d] border border-white/5 overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-[#0e0e0e] flex justify-between items-center">
                <h2 className="text-xs font-bold text-white uppercase tracking-[0.3em] flex items-center gap-4">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Boutique Collective Feed
                </h2>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{registeredShops.length} Active Partners</span>
              </div>
              <div className="divide-y divide-white/5">
                {registeredShops.length > 0 ? registeredShops.map(shop => (
                  <div key={shop.id} className="p-8 flex flex-col md:flex-row items-center justify-between hover:bg-white/5 transition-colors group gap-6">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-black border border-white/10 overflow-hidden flex-shrink-0">
                        <img src={shop.logo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="shop" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-xl text-white font-bold group-hover:text-purple-500 transition-colors">{shop.name}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Joined: {new Date(shop.createdAt).toLocaleDateString()} • {shop.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleAdminAction('Audit Boutique', shop.name)}
                        className="px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-colors"
                      >
                        Audit Site
                      </button>
                      <button 
                        onClick={() => handleAdminAction('Flag Partner', shop.name)}
                        className="px-6 py-3 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                      >
                        Restrict
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="p-20 text-center text-gray-600 font-bold uppercase tracking-widest text-xs italic bg-black/40">No external partners registered yet.</div>
                )}
              </div>
            </div>

            {/* Performance Visualization */}
            <div className="bg-[#0d0d0d] border border-white/5 p-8 space-y-8 shadow-xl">
               <h2 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Discovery Distribution</h2>
               <div className="h-64 bg-black/50 border border-white/5 relative overflow-hidden flex items-end justify-around px-10 pb-6 gap-2">
                 {[30, 40, 25, 60, 45, 70, 40, 55, 30, 80].map((h, i) => (
                   <div key={i} className="w-full bg-purple-600/10 border-t border-purple-600/40 hover:bg-purple-600 hover:border-purple-400 transition-all duration-700 cursor-crosshair" style={{ height: `${h}%` }}></div>
                 ))}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] text-gray-700 uppercase tracking-[0.5em] font-black">ACTIVE MONITORING</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#0d0d0d] border border-white/5 p-8 space-y-6 shadow-xl">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-4">Vital Marketplace Metrics</h2>
              <div className="space-y-6">
                {[
                  { label: 'Total Curations', value: shops.length },
                  { label: 'Network Views', value: shops.reduce((acc, s) => acc + s.viewCount, 0) },
                  { label: 'Partner Growth', value: '100%' },
                  { label: 'Uptime', value: '99.9%' },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-pointer hover:border-purple-600/30 transition-colors">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</span>
                    <span className="text-xl text-white font-bold group-hover:text-purple-500 transition-colors">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-600 p-10 space-y-6 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-black opacity-10 text-8xl -mr-8 -mt-8">
                <i className="fa-solid fa-crown"></i>
              </div>
              <div className="w-12 h-12 bg-black text-purple-600 flex items-center justify-center text-xl relative z-10">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <h2 className="font-serif text-3xl font-bold leading-tight relative z-10">Founder Dispatch</h2>
              <p className="text-sm font-medium text-white/80 leading-relaxed relative z-10 italic">Transmit strategic updates directly to the partner collective via the internal Brotherhood network.</p>
              <button 
                onClick={() => handleAdminAction('Transmit Signal')}
                className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 relative z-10 shadow-2xl"
              >
                Transmit Dispatch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
