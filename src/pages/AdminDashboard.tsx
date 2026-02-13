
import React, { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard';
import { supabase } from '../lib/supabase';

const AdminDashboard: React.FC = () => {
   const [stats, setStats] = useState({
      totalUsers: 0,
      totalShops: 0,
      pendingShops: 0,
      approvedShops: 0
   });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchStats();
   }, []);

   const fetchStats = async () => {
      try {
         setLoading(true);

         // Using Supabase count for efficiency
         const { count: usersCount } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });

         const { count: totalShopsCount } = await supabase
            .from('shops')
            .select('*', { count: 'exact', head: true });

         const { count: pendingShopsCount } = await supabase
            .from('shops')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Pending');

         const { count: approvedShopsCount } = await supabase
            .from('shops')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Approved');

         setStats({
            totalUsers: usersCount || 0,
            totalShops: totalShopsCount || 0,
            pendingShops: pendingShopsCount || 0,
            approvedShops: approvedShopsCount || 0
         });

      } catch (error) {
         console.error('Error fetching dashboard stats:', error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
               title="Total Users"
               value={stats.totalUsers}
               icon="👥"
               color="blue"
               loading={loading}
            />
            <StatsCard
               title="Total Shops"
               value={stats.totalShops}
               icon="🏪"
               color="purple"
               loading={loading}
            />
            <StatsCard
               title="Pending Approvals"
               value={stats.pendingShops}
               icon="⏳"
               color="orange"
               loading={loading}
            />
            <StatsCard
               title="Active Shops"
               value={stats.approvedShops}
               icon="✅"
               color="green"
               loading={loading}
            />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Placeholder for future charts or recent activity */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
               Chart Placeholder: User Growth
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
               Chart Placeholder: Shop Categories
            </div>
         </div>
      </div>
   );
};

export default AdminDashboard;
