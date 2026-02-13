
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { user, loading, isAdmin } = useAuth();

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
         </div>
      );
   }

   if (!user || !isAdmin) {
      return <Navigate to="/" replace />;
   }

   return <>{children}</>;
};

export default AdminRoute;
