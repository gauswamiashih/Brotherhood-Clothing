
import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
   const location = useLocation();

   const getTitle = () => {
      switch (location.pathname) {
         case '/admin/dashboard': return 'Dashboard Overview';
         case '/admin/shops/pending': return 'Pending Shop Approvals';
         case '/admin/shops/approved': return 'Approved Shops';
         case '/admin/shops/blocked': return 'Blocked Shops';
         case '/admin/users': return 'User Management';
         default: return 'Admin Panel';
      }
   };

   return (
      <header className="fixed top-0 left-64 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 flex items-center justify-between px-8 shadow-sm">
         <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
            {getTitle()}
         </h2>

         <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
               <span className="text-sm font-medium text-gray-900">Admin User</span>
               <span className="text-xs text-green-500 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                  Super Admin
               </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 border-2 border-white shadow-md flex items-center justify-center text-white text-sm font-bold">
               AD
            </div>
         </div>
      </header>
   );
};

export default AdminNavbar;
