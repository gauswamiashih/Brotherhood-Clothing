
import React, { useState } from 'react';

const OwnerDashboard: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Floral Summer Dress', price: '₹1,299', status: 'Published' },
    { id: 2, name: 'Linen Casual Shirt', price: '₹899', status: 'Published' },
    { id: 3, name: 'Embroidered Saree', price: '₹4,500', status: 'Review' },
  ]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Urban Vogue Dashboard</h1>
            <p className="text-gray-500">Manage your collection and shop profile</p>
          </div>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-bold hover:bg-black transition-colors">
            + ADD NEW PRODUCT
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Views', value: '12,402', icon: 'fa-eye', color: 'bg-blue-500' },
            { label: 'WhatsApp Leads', value: '184', icon: 'fa-message', color: 'bg-green-500' },
            { label: 'Products', value: '42', icon: 'fa-bag-shopping', color: 'bg-amber-500' },
            { label: 'Avg Rating', value: '4.9', icon: 'fa-star', color: 'bg-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <i className={`fa-solid ${stat.icon}`}></i>
                </div>
                <span className="text-green-500 text-xs font-bold">+12%</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-lg">Active Collection</h2>
            <div className="flex gap-2">
              <input type="text" placeholder="Search products..." className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Product Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                        <img src={`https://picsum.photos/seed/${item.id + 100}/100/100`} alt="prod" />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 flex gap-4">
                      <button className="hover:text-black transition-colors"><i className="fa-solid fa-pen"></i></button>
                      <button className="hover:text-red-500 transition-colors"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
