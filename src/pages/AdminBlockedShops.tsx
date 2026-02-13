
import React, { useEffect, useState } from 'react';
import ShopsTable from '../components/ShopsTable';
import ConfirmationModal from '../components/ConfirmationModal';
import { supabase } from '../lib/supabase';
import { Shop } from '../types';
import toast from 'react-hot-toast';

const AdminBlockedShops: React.FC = () => {
   const [shops, setShops] = useState<Shop[]>([]);
   const [loading, setLoading] = useState(true);
   const [modalOpen, setModalOpen] = useState(false);
   const [selectedShop, setSelectedShop] = useState<{ id: string, name: string } | null>(null);

   useEffect(() => {
      fetchBlockedShops();
   }, []);

   const fetchBlockedShops = async () => {
      try {
         setLoading(true);
         const { data, error } = await supabase
            .from('shops')
            .select('*, users(name)')
            .eq('status', 'Blocked')
            .order('createdAt', { ascending: false });

         if (error) throw error;

         const mappedShops = (data || []).map((shop: any) => ({
            ...shop,
            ownerName: shop.users?.name || shop.ownerName
         }));
         setShops((mappedShops as unknown as Shop[]) || []);
      } catch (error) {
         console.error('Error fetching blocked shops:', error);
         toast.error('Failed to fetch blocked shops');
      } finally {
         setLoading(false);
      }
   };

   const confirmUnblock = (shop: Shop) => {
      setSelectedShop({ id: shop.id, name: shop.shopName });
      setModalOpen(true);
   };

   const handleUnblock = async () => {
      if (!selectedShop) return;
      const { id } = selectedShop;
      const toastId = toast.loading('Unblocking shop...');

      try {
         const { error } = await supabase
            .from('shops')
            .update({ status: 'Approved' }) // Moving directly to Approved as per typical "Unblock" flow, or could be Pending. 
            // In the previous code it was updating to 'Pending'. But usually unblock means restore.
            // Let's stick to 'Pending' if that was the logic, or 'Approved'. 
            // The previous code had `onApprove` which set it to 'Approved'. 
            // Let's set it to 'Approved' to restore it fully.
            .eq('id', id);

         if (error) throw error;

         setShops(prev => prev.filter(shop => shop.id !== id));
         toast.success('Shop unblocked and approved', { id: toastId });
      } catch (error) {
         console.error('Error unblocking shop:', error);
         toast.error('Failed to unblock shop', { id: toastId });
      } finally {
         setModalOpen(false);
         setSelectedShop(null);
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Blocked Shops</h1>
            <button
               onClick={fetchBlockedShops}
               className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
               Refresh List
            </button>
         </div>

         <ShopsTable
            shops={shops}
            loading={loading}
            onApprove={(id) => {
               const shop = shops.find(s => s.id === id);
               if (shop) confirmUnblock(shop);
            }}
            onView={(shop) => toast(`Viewing ${shop.shopName}`, { icon: '👀' })}
         />

         <ConfirmationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleUnblock}
            title="Unblock Shop"
            message={`Are you sure you want to unblock "${selectedShop?.name}"? It will be visible on the marketplace again.`}
            confirmText="Unblock & Approve"
         />
      </div>
   );
};

export default AdminBlockedShops;
