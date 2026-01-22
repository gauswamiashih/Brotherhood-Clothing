
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ShopProfile: React.FC = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('Collection');

  // Logic simulation for direct contact
  const handleWhatsApp = () => {
    window.open(`https://wa.me/9100000000?text=Hi, I found your shop on Brotherhood Clothing and I'm interested in your collection!`, '_blank');
  };

  const products = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    image: `https://picsum.photos/seed/prod${i + 50}/600/600`,
    name: `New Arrival Item #${i + 1}`
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Header Info */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
            <img src="https://picsum.photos/seed/profile/400/400" className="w-full h-full object-cover" alt="Shop Logo" />
          </div>
          
          <div className="flex-grow text-center md:text-left space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <h1 className="text-3xl font-light">urban_vogue_palanpur</h1>
              <div className="flex gap-2">
                <button 
                  onClick={handleWhatsApp}
                  className="px-6 py-2 bg-green-500 text-white rounded-md font-semibold text-sm hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp
                </button>
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <i className="fa-solid fa-phone"></i>
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-8 text-sm">
              <div><span className="font-bold">42</span> items</div>
              <div><span className="font-bold">12k</span> views</div>
              <div><span className="font-bold">4.9</span> rating</div>
            </div>

            <div className="space-y-1">
              <h2 className="font-bold">Urban Vogue Boutique</h2>
              <p className="text-gray-600 text-sm max-w-md">
                Modern ethnic wear & lifestyle. <br/>
                📍 Opposite City Plaza, Palanpur. <br/>
                ✨ Exquisite collection for all occasions.
              </p>
              <a href="#" className="text-blue-900 text-sm font-semibold hover:underline">www.urbanvogue.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="max-w-4xl mx-auto px-4 py-8 flex gap-6 overflow-x-auto no-scrollbar">
        {['Bridal', 'Casual', 'Offers', 'About Us'].map(h => (
          <div key={h} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-16 h-16 rounded-full p-1 border border-gray-300">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                <i className="fa-solid fa-circle-nodes text-gray-400"></i>
              </div>
            </div>
            <span className="text-xs font-medium">{h}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex justify-center gap-12">
          {['Collection', 'About', 'Contact'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-xs tracking-widest uppercase font-bold border-t transition-all ${
                activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {products.map(p => (
            <div key={p.id} className="relative aspect-square group cursor-pointer overflow-hidden">
              <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white font-bold flex items-center gap-2">
                   <i className="fa-solid fa-eye"></i> View
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
