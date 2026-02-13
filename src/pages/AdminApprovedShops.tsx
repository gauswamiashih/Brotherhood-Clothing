
import React, { useEffect, useState } from 'react';
import ShopsTable from '../components/ShopsTable';
import ConfirmationModal from '../components/ConfirmationModal';
import { supabase } from '../lib/supabase';
import { Shop } from '../types';
import toast from 'react-hot-toast';

const AdminApprovedShops: React.FC = () => {
   const [shops, setShops] = useState<Shop[]>([]);
   const [loading, setLoading] = useState(true);
   const [modalOpen, setModalOpen] = useState(false);
   const [selectedShop, setSelectedShop] = useState<{ id: string, name: string } | null>(null);

   useEffect(() => {
      fetchApprovedShops();
   }, []);

   const fetchApprovedShops = async () => {
      try {
         setLoading(true);
         const { data, error } = await supabase
            .from('shops')
            .select('*, users(name)')
            .eq('status', 'Approved')
            .order('createdAt', { ascending: false });

         if (error) throw error;

         const mappedShops = (data || []).map((shop: any) => ({
            ...shop,
            ownerName: shop.users?.name || shop.ownerName
         }));
         setShops((mappedShops as unknown as Shop[]) || []);
      } catch (error) {
         console.error('Error fetching approved shops:', error);
         toast.error('Failed to fetch approved shops');
      } finally {
         setLoading(false);
      }
   };

   const confirmBlock = (shop: Shop) => {
      setSelectedShop({ id: shop.id, name: shop.shopName });
      setModalOpen(true);
   };

   const handleBlock = async () => {
      if (!selectedShop) return;
      const { id } = selectedShop;
      const toastId = toast.loading('Blocking shop...');

      try {
         const { error } = await supabase
            .from('shops')
            .update({ status: 'Blocked' })
            .eq('id', id);

         if (error) throw error;

         setShops(prev => prev.filter(shop => shop.id !== id));
         toast.success('Shop blocked successfully', { id: toastId });
      } catch (error) {
         console.error('Error blocking shop:', error);
         toast.error('Failed to block shop', { id: toastId });
      } finally {
         setModalOpen(false);
         setSelectedShop(null);
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Approved Shops</h1>
            <button
               onClick={fetchApprovedShops}
               className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
               Refresh List
            </button>
         </div>

         <ShopsTable
            shops={shops}
            loading={loading}
            onBlock={(id) => {
               const shop = shops.find(s => s.id === id);
               if (shop) confirmBlock(shop);
            }}
            onView={(shop) => toast(`Viewing ${shop.shopName}`, { icon: '👀' })}
         />

         <ConfirmationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleBlock}
            title="Block Shop"
            message={`Are you sure you want to block "${selectedShop?.name}"? This will hide it from the marketplace immediately.`}
            confirmText="Block Shop"
            isDestructive={true}
         />
      </div>
   );
};

export default AdminApprovedShops;
