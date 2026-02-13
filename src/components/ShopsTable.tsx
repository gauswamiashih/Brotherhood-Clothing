
import React from 'react';
import { Shop, ShopStatus } from '../types';

interface ShopsTableProps {
   shops: Shop[];
   loading: boolean;
   onApprove?: (shopId: string) => void;
   onBlock?: (shopId: string) => void;
   onView?: (shop: Shop) => void;
   showActions?: boolean;
}

const ShopsTable: React.FC<ShopsTableProps> = ({ shops, loading, onApprove, onBlock, onView, showActions = true }) => {
   if (loading) {
      return (
         <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading shops...</p>
         </div>
      );
   }

   if (shops.length === 0) {
      return (
         <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-gray-500 text-lg">No shops found.</p>
         </div>
      );
   }

   return (
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="p-4 rounded-tl-xl">Shop</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  {showActions && <th className="p-4 rounded-tr-xl text-right">Actions</th>}
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {shops.map((shop) => (
                  <tr key={shop.id} className="hover:bg-gray-50/50 transition-colors">
                     <td className="p-4">
                        <div className="flex items-center gap-3">
                           <img
                              src={shop.logoUrl || `https://ui-avatars.com/api/?name=${shop.shopName}&background=random`}
                              alt={shop.shopName}
                              className="h-10 w-10 rounded-full object-cover border border-gray-100 shadow-sm"
                           />
                           <span className="font-medium text-gray-900">{shop.shopName}</span>
                        </div>
                     </td>
                     <td className="p-4 text-gray-600">{shop.ownerName || 'Unknown'}</td>
                     <td className="p-4 text-gray-600">{shop.city}</td>
                     <td className="p-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                           {shop.category}
                        </span>
                     </td>
                     <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium border ${shop.status === ShopStatus.APPROVED ? 'bg-green-50 text-green-700 border-green-100' :
                              shop.status === ShopStatus.BLOCKED ? 'bg-red-50 text-red-700 border-red-100' :
                                 'bg-orange-50 text-orange-700 border-orange-100'
                           }`}>
                           {shop.status}
                        </span>
                     </td>
                     <td className="p-4 text-gray-500 text-sm">
                        {new Date(shop.createdAt).toLocaleDateString()}
                     </td>
                     {showActions && (
                        <td className="p-4 text-right space-x-2">
                           {/* Approve Button - Only if PENDING or BLOCKED */}
                           {shop.status !== ShopStatus.APPROVED && onApprove && (
                              <button
                                 onClick={() => onApprove(shop.id)}
                                 className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-transparent hover:border-green-200"
                              >
                                 Approve
                              </button>
                           )}

                           {/* Block Button - Only if NOT BLOCKED */}
                           {shop.status !== ShopStatus.BLOCKED && onBlock && (
                              <button
                                 onClick={() => onBlock(shop.id)}
                                 className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-transparent hover:border-red-200"
                              >
                                 Block
                              </button>
                           )}

                           {onView && (
                              <button
                                 onClick={() => onView(shop)}
                                 className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                              >
                                 Details
                              </button>
                           )}
                        </td>
                     )}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default ShopsTable;
