
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_SHOPS = [
  { id: '1', name: 'Zara Exclusive', slug: 'zara-exclusive', category: 'Western', image: 'https://picsum.photos/seed/shop1/400/500', isVerified: true },
  { id: '2', name: 'Heritage Silks', slug: 'heritage-silks', category: 'Ethnic', image: 'https://picsum.photos/seed/shop2/400/500', isVerified: true },
  { id: '3', name: 'Metro Men', slug: 'metro-men', category: 'Menswear', image: 'https://picsum.photos/seed/shop3/400/500', isVerified: false },
  { id: '4', name: 'Elegance Couture', slug: 'elegance-couture', category: 'Bridal', image: 'https://picsum.photos/seed/shop4/400/500', isVerified: true },
  { id: '5', name: 'Trendsetters', slug: 'trendsetters', category: 'Casual', image: 'https://picsum.photos/seed/shop5/400/500', isVerified: false },
  { id: '6', name: 'The Denim Hub', slug: 'denim-hub', category: 'Western', image: 'https://picsum.photos/seed/shop6/400/500', isVerified: true },
];

const ShopsList: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Western', 'Ethnic', 'Menswear', 'Bridal', 'Casual'];

  const filteredShops = filter === 'All' ? MOCK_SHOPS : MOCK_SHOPS.filter(s => s.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-5xl font-bold mb-4">Explore Shops</h1>
        <p className="text-gray-500">Hand-curated local stores in Palanpur city.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat 
              ? 'bg-gray-900 text-white shadow-lg' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredShops.map(shop => (
          <Link to={`/shop/${shop.slug}`} key={shop.id} className="group">
            <div className="relative aspect-[3/4] overflow-hidden mb-4 rounded-sm">
              <img 
                src={shop.image} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt={shop.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-4 left-4 text-white translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100 font-bold">
                View Collection
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg group-hover:text-amber-600 transition-colors flex items-center gap-2">
                  {shop.name}
                  {shop.isVerified && <i className="fa-solid fa-circle-check text-blue-500 text-xs"></i>}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{shop.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopsList;
