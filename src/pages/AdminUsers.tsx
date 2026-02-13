
import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import ConfirmationModal from '../components/ConfirmationModal';
import { supabase } from '@/lib/supabase';
import { User, UserRole } from '../types';
import toast from 'react-hot-toast';

const AdminUsers: React.FC = () => {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState(true);
   const [modalOpen, setModalOpen] = useState(false);
   const [pendingRoleChange, setPendingRoleChange] = useState<{ userId: string, userName: string, newRole: UserRole, oldRole: UserRole } | null>(null);

   useEffect(() => {
      fetchUsers();
   }, []);

   const fetchUsers = async () => {
      try {
         setLoading(true);
         const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('createdAt', { ascending: false })
            .limit(50);

         if (error) throw error;
         setUsers((data as unknown as User[]) || []);
      } catch (error) {
         console.error('Error fetching users:', error);
         toast.error('Failed to fetch users');
      } finally {
         setLoading(false);
      }
   };

   const initiateRoleChange = (userId: string, newRole: UserRole) => {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      // If no change, ignore
      if (user.role === newRole) return;

      setPendingRoleChange({
         userId,
         userName: user.name,
         newRole,
         oldRole: user.role
      });
      setModalOpen(true);
   };

   const executeRoleChange = async () => {
      if (!pendingRoleChange) return;
      const { userId, newRole, oldRole } = pendingRoleChange;

      // Optimistic update
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      const toastId = toast.loading(`Updating role to ${newRole}...`);

      try {
         const { error } = await supabase
            .from('users')
            .update({ role: newRole })
            .eq('id', userId);

         if (error) throw error;

         toast.success('Role updated successfully', { id: toastId });
      } catch (error) {
         console.error('Error updating user role:', error);
         toast.error('Failed to update role', { id: toastId });
         // Revert
         setUsers(users.map(u => u.id === userId ? { ...u, role: oldRole } : u));
      } finally {
         setModalOpen(false);
         setPendingRoleChange(null);
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
               <p className="text-gray-500 text-sm mt-1">Manage user roles and permissions.</p>
            </div>
            <button
               onClick={fetchUsers}
               className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
               Refresh List
            </button>
         </div>

         <UsersTable
            users={users}
            loading={loading}
            onRoleChange={initiateRoleChange}
         />

         <ConfirmationModal
            isOpen={modalOpen}
            onClose={() => {
               setModalOpen(false);
               setPendingRoleChange(null);
               // Re-fetch or force re-render might be needed if Table component doesn't handle controlled value well?
               // Actually UsersTable probably displays `user.role` from props, so checking if initiateRoleChange updates state?
               // No, initiateRoleChange only opens modal. The state `users` is NOT updated yet.
               // So if user cancelled, Table still shows old role.
               // Wait, `UsersTable` dropdown `onChange` triggers this.
               // HTML select immediately shows new value if uncontrolled, or controlled by internal state.
               // `UsersTable` likely uses `value={user.role}`. 
               // If I don't update state, it snaps back.
               // But `initiateRoleChange` is called.
            }}
            onConfirm={executeRoleChange}
            title="Change User Role"
            message={`Are you sure you want to change ${pendingRoleChange?.userName}'s role from ${pendingRoleChange?.oldRole} to ${pendingRoleChange?.newRole}?`}
            confirmText="Update Role"
            warn={pendingRoleChange?.newRole === UserRole.ADMIN} // Optional property if I add it to modal, or use isDestructive
            isDestructive={false}
         // UserRole is VISITOR, OWNER, ADMIN. BLOCKED in ShopStatus.
         />
      </div>
   );
};

export default AdminUsers;
