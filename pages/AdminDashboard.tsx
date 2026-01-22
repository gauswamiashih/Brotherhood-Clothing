
import React from 'react';

const AdminDashboard: React.FC = () => {
  const pendingShops = [
    { id: 1, name: 'Royal Rajputana', owner: 'Vikram Singh', date: '2 hours ago', img: 'https://images.unsplash.com/photo-1574015974293-817f0efebb1b?auto=format&fit=crop&q=80&w=100' },
    { id: 2, name: 'Style Junction', owner: 'Aman Patel', date: '5 hours ago', img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=100' },
  ];

  const handleAdminAction = (action: string, shopName?: string) => {
    alert(`Admin: ${action} triggered ${shopName ? `for ${shopName}` : ''}`);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 space-y-2">
          <h1 className="font-serif text-5xl text-white font-bold tracking-tight">Platform <span className="text-amber-500">Oversight</span></h1>
          <p className="text-gray-500 font-light text-lg uppercase tracking-widest text-xs">Marketplace Moderation & Analytics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Moderation Queue */}
            <div className="bg-[#0d0d0d] border border-white/5 overflow-hidden">
              <div className="p-8 border-b border-white/5 bg-[#0e0e0e] flex justify-between items-center">
                <h2 className="text-xs font-bold text-white uppercase tracking-[0.3em] flex items-center gap-4">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                  Verification Queue
                </h2>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{pendingShops.length} Pending Requests</span>
              </div>
              <div className="divide-y divide-white/5">
                {pendingShops.map(shop => (
                  <div key={shop.id} className="p-8 flex items-center justify-between hover:bg-white/5 transition-colors group">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-black border border-white/10 overflow-hidden flex-shrink-0">
                        <img src={shop.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="shop" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-xl text-white font-bold group-hover:text-amber-500 transition-colors">{shop.name}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Ownership: {shop.owner} • {shop.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleAdminAction('Grant Access', shop.name)}
                        className="px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors"
                      >
                        Grant Access
                      </button>
                      <button 
                        onClick={() => handleAdminAction('Deny', shop.name)}
                        className="px-6 py-3 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="bg-[#0d0d0d] border border-white/5 p-8 space-y-8">
               <h2 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Traffic Distribution</h2>
               <div className="h-80 bg-black/50 border border-white/5 relative overflow-hidden flex items-end justify-around px-10 pb-10 gap-4">
                 {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                   <div key={i} className="w-full bg-amber-600/20 border-t border-amber-600 hover:bg-amber-600 transition-all duration-500 cursor-help" style={{ height: `${h}%` }} title={`Data point ${i + 1}: ${h}%`}></div>
                 ))}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] text-gray-600 uppercase tracking-[0.5em] font-bold">Real-time Visualization Active</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#0d0d0d] border border-white/5 p-8 space-y-6">
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-4">Vital Statistics</h2>
              <div className="space-y-6">
                {[
                  { label: 'Verified Partners', value: '124' },
                  { label: 'Active Curations', value: '4,821' },
                  { label: 'Daily Interactions', value: '1,402' },
                  { label: 'Retention Rate', value: '94%' },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-pointer hover:border-amber-600/30 transition-colors">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</span>
                    <span className="text-xl text-white font-bold group-hover:text-amber-500 transition-colors">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-600 p-10 space-y-6 text-black shadow-[0_0_50px_rgba(217,119,6,0.1)]">
              <div className="w-12 h-12 bg-black text-amber-600 flex items-center justify-center text-xl">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <h2 className="font-serif text-3xl font-bold leading-tight">Platform Broadcast</h2>
              <p className="text-sm font-medium opacity-80 leading-relaxed">Broadcast a message to all shop owners regarding the upcoming 'Imperial Summer' marketplace campaign.</p>
              <button 
                onClick={() => handleAdminAction('Initiate Broadcast')}
                className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                Initiate Broadcast
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
