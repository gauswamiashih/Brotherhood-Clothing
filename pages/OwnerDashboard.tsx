
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('Overview');
  const [items, setItems] = useState([
    { id: 1, name: 'Floral Summer Dress', price: '₹1,299', status: 'Published', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Linen Casual Shirt', price: '₹899', status: 'Published', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Embroidered Saree', price: '₹4,500', status: 'Review', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=200' },
  ]);

  const handleAction = (action: string, itemName?: string) => {
    alert(`${action} triggered ${itemName ? `for ${itemName}` : ''}`);
  };

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
                 className={`w-full flex items-center space-x-3 px-4 py-3 transition-all ${
                   activeView === item.name 
                   ? 'bg-amber-600/10 text-amber-500 border-l-2 border-amber-600' 
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
                  <div className="h-full w-3/4 bg-amber-600"></div>
                </div>
                <p className="text-[10px] text-white font-bold">750 MB / 1 GB Used</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-72 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <h1 className="font-serif text-5xl text-white font-bold tracking-tight">{activeView} <span className="text-amber-500">Suite</span></h1>
              <p className="text-gray-500 font-light text-lg">Curating the collection for <span className="text-white font-medium">{user?.name} Boutique</span></p>
            </div>
            <button 
              onClick={() => handleAction('Upload Dialog')}
              className="px-8 py-4 bg-amber-600 text-black font-bold uppercase tracking-widest text-[10px] hover:bg-amber-500 transition-colors shadow-2xl"
            >
              Upload New Piece
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Platform Visibility', value: '12,402', trend: '+12%', icon: 'fa-eye' },
              { label: 'Direct Leads', value: '184', trend: '+5.4%', icon: 'fa-whatsapp' },
              { label: 'Total Pieces', value: '42', trend: '0', icon: 'fa-gem' },
              { label: 'Quality Score', value: '4.9/5', trend: '+2%', icon: 'fa-star' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0d0d0d] border border-white/5 p-8 space-y-4 hover:border-amber-600/30 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/5 text-amber-500 rounded-none">
                    <i className={`fa-solid ${stat.icon}`}></i>
                  </div>
                  <span className="text-[10px] text-green-500 font-black">{stat.trend}</span>
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
              <h2 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Active Inventory</h2>
              <div className="flex space-x-2">
                 <button onClick={() => handleAction('Status Filter All')} className="w-2 h-2 rounded-full bg-green-500 hover:scale-125 transition-transform"></button>
                 <button onClick={() => handleAction('Status Filter Pending')} className="w-2 h-2 rounded-full bg-amber-500 hover:scale-125 transition-transform"></button>
                 <button onClick={() => handleAction('Status Filter Deleted')} className="w-2 h-2 rounded-full bg-red-500 hover:scale-125 transition-transform"></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-gray-500 text-[9px] uppercase tracking-[0.2em] font-bold">
                    <th className="px-8 py-5">Visual</th>
                    <th className="px-8 py-5">Nomenclature</th>
                    <th className="px-8 py-5">Valuation</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="w-12 h-16 bg-black border border-white/10 overflow-hidden">
                          <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="prod" />
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-white">{item.name}</td>
                      <td className="px-8 py-5 text-xs text-gray-400 font-bold">{item.price}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                          item.status === 'Published' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right space-x-4">
                        <button 
                          onClick={() => handleAction('Edit', item.name)}
                          className="text-gray-500 hover:text-white transition-colors"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button 
                          onClick={() => handleAction('Delete', item.name)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
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
