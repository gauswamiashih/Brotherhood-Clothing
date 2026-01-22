
import React from 'react';

const AdminDashboard: React.FC = () => {
  const pendingShops = [
    { id: 1, name: 'Royal Rajputana', owner: 'Vikram Singh', date: '2 hours ago' },
    { id: 2, name: 'Style Junction', owner: 'Aman Patel', date: '5 hours ago' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Marketplace Admin</h1>
          <p className="text-gray-500">Platform overview and moderation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Moderation Queue */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  Shop Approval Queue
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {pendingShops.map(shop => (
                  <div key={shop.id} className="p-6 flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                        <i className="fa-solid fa-store"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">{shop.name}</h4>
                        <p className="text-xs text-gray-500">Requested by {shop.owner} • {shop.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded hover:bg-black transition-colors">APPROVE</button>
                      <button className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded hover:bg-gray-50 transition-colors">DETAILS</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h2 className="font-bold text-lg mb-6">Marketplace Analytics</h2>
               <div className="h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                 [Traffic Chart Visualization Placeholder]
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-lg mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Total Shops</span>
                  <span className="font-bold">124</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Total Products</span>
                  <span className="font-bold">4,821</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Active Visitors (24h)</span>
                  <span className="font-bold">1,402</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-600 rounded-xl p-6 text-white">
              <h2 className="font-bold text-lg mb-2">Announcement</h2>
              <p className="text-sm opacity-90 mb-4">The new Palanpur Summer Festival campaign starts next week. Ensure all pending shops are verified.</p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded font-bold text-xs transition-colors uppercase tracking-widest">Post Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
