import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './AdminSidebar';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
   const { signOut } = useAuth();

   return (
      <div className="flex bg-[#050505] min-h-screen text-white">
         <Sidebar onLogout={signOut} />
         <div className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
            <div className="max-w-7xl mx-auto space-y-8">
               <header className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                  <div>
                     <h2 className="text-3xl font-serif font-bold">Dashboard</h2>
                     <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2 block">Overview & Statistics</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-500 border border-purple-600/30">
                        <i className="fa-solid fa-bell"></i>
                     </div>
                  </div>
               </header>
               <Outlet />
            </div>
         </div>
      </div>
   );
};

export default AdminLayout;
