
import React, { useEffect, useState } from 'react';
import ShopsTable from '../components/ShopsTable';
import ConfirmationModal from '../components/ConfirmationModal';
import { supabase } from '../lib/supabase';
import { Shop } from '../types';
import toast from 'react-hot-toast';

const AdminPendingShops: React.FC = () => {
   const [shops, setShops] = useState<Shop[]>([]);
   const [loading, setLoading] = useState(true);
   const [modalOpen, setModalOpen] = useState(false);
   const [selectedShop, setSelectedShop] = useState<{ id: string, name: string, action: 'approve' | 'block' } | null>(null);

   useEffect(() => {
      fetchPendingShops();
   }, []);

   const fetchPendingShops = async () => {
      try {
         setLoading(true);
         // Join with users to get owner name
         const { data, error } = await supabase
            .from('shops')
            .select('*, users(name)')
            .eq('status', 'Pending')
            .order('createdAt', { ascending: false });

         if (error) throw error;

         // Map users.name to ownerName for display if available
         const mappedShops = (data || []).map((shop: any) => ({
            ...shop,
            ownerName: shop.users?.name || shop.ownerName
         }));

         setShops((mappedShops as unknown as Shop[]) || []);
      } catch (error) {
         console.error('Error fetching pending shops:', error);
         toast.error('Failed to fetch pending shops');
      } finally {
         setLoading(false);
      }
   };

   const confirmAction = (shop: Shop, action: 'approve' | 'block') => {
      setSelectedShop({ id: shop.id, name: shop.shopName, action });
      setModalOpen(true);
   };

   const handleAction = async () => {
      if (!selectedShop) return;

      const { id, action } = selectedShop;
      const newStatus = action === 'approve' ? 'Approved' : 'Blocked';
      const toastId = toast.loading(`Processing ${action}...`);

      try {
         const { error } = await supabase
            .from('shops')
            .update({ status: newStatus })
            .eq('id', id);

         if (error) throw error;

         // Remove from list
         setShops(prev => prev.filter(s => s.id !== id));
         toast.success(`Shop ${newStatus.toLowerCase()} successfully`, { id: toastId });
      } catch (error) {
         console.error(`Error ${action}ing shop:`, error);
         toast.error(`Failed to ${action} shop`, { id: toastId });
      } finally {
         setModalOpen(false);
         setSelectedShop(null);
      }
   };

   const handleView = (shop: Shop) => {
      toast(`Viewing details for ${shop.shopName}`, { icon: '👀' });
      // Logic to open view modal or navigate
   };

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Pending Approvals</h1>
            <button
               onClick={fetchPendingShops}
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
               if (shop) confirmAction(shop, 'approve');
            }}
            onBlock={(id) => {
               const shop = shops.find(s => s.id === id);
               if (shop) confirmAction(shop, 'block');
            }}
            onView={handleView}
         />

         <ConfirmationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleAction}
            title={selectedShop?.action === 'approve' ? 'Approve Shop' : 'Block Shop'}
            message={`Are you sure you want to ${selectedShop?.action} "${selectedShop?.name}"? ${selectedShop?.action === 'approve' ? 'It will be visible on the marketplace.' : 'It will be hidden from users.'}`}
            confirmText={selectedShop?.action === 'approve' ? 'Approve' : 'Block'}
            isDestructive={selectedShop?.action === 'block'}
         />
      </div>
   );
};

export default AdminPendingShops;
