
import React from 'react';
import { User, UserRole } from '../types';

interface UsersTableProps {
   users: User[];
   loading: boolean;
   onRoleChange: (userId: string, newRole: UserRole) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, loading, onRoleChange }) => {
   if (loading) {
      return (
         <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading users...</p>
         </div>
      );
   }

   return (
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="p-4 rounded-tl-xl">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Joined</th>
                  <th className="p-4 rounded-tr-xl text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                     <td className="p-4">
                        <div className="flex items-center gap-3">
                           <img
                              src={user.picture || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                              alt={user.name}
                              className="h-10 w-10 rounded-full object-cover border border-gray-100 shadow-sm"
                           />
                           <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                     </td>
                     <td className="p-4 text-gray-600">{user.email}</td>
                     <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium border ${user.role === UserRole.ADMIN ? 'bg-purple-50 text-purple-700 border-purple-100' :
                              user.role === UserRole.OWNER ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                 'bg-gray-100 text-gray-600 border-gray-200'
                           }`}>
                           {user.role}
                        </span>
                     </td>
                     <td className="p-4 text-gray-500 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                     </td>
                     <td className="p-4 text-right">
                        <select
                           value={user.role}
                           onChange={(e) => onRoleChange(user.id, e.target.value as UserRole)}
                           className="bg-white border border-gray-200 text-gray-700 py-1 px-2 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                        >
                           <option value={UserRole.VISITOR}>Visitor</option>
                           <option value={UserRole.OWNER}>Owner</option>
                           <option value={UserRole.ADMIN}>Admin</option>
                        </select>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default UsersTable;
