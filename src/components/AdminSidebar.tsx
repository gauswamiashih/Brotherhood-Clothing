
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
   onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
   const menuItems = [
      { label: 'Dashboard Overview', path: '/admin/dashboard', icon: '📊' },
      { label: 'Pending Shops', path: '/admin/shops/pending', icon: '⏳' },
      { label: 'Approved Shops', path: '/admin/shops/approved', icon: '✅' },
      { label: 'Blocked Shops', path: '/admin/shops/blocked', icon: '🚫' },
      { label: 'Users', path: '/admin/users', icon: '👥' },
   ];

   return (
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg z-50">
         <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
               BROTHERHOOD
            </h1>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Admin Panel</p>
         </div>

         <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
               {menuItems.map((item) => (
                  <li key={item.path}>
                     <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                           `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive
                              ? 'bg-gray-800 text-white border-r-4 border-orange-500'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                           }`
                        }
                     >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium text-sm">{item.label}</span>
                     </NavLink>
                  </li>
               ))}
            </ul>
         </nav>

         <div className="p-4 border-t border-gray-800">
            <button
               onClick={onLogout}
               className="w-full flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white py-2 px-4 rounded-lg transition-all duration-300"
            >
               <span>🚪</span>
               Logout
            </button>
         </div>
      </aside>
   );
};

export default Sidebar;
