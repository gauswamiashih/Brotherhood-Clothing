
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { User, UserRole } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
   session: Session | null;
   user: User | null;
   loading: boolean;
   isAuthenticated: boolean;
   signInWithGoogle: () => Promise<void>;
   signOut: () => Promise<void>;
   isAdmin: boolean;
   isOwner: boolean;
   isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [session, setSession] = useState<Session | null>(null);
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      // Check active session
      supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session);
         if (session?.user) {
            fetchUserProfile(session.user);
         } else {
            setLoading(false);
         }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
         setSession(session);
         if (session?.user) {
            await fetchUserProfile(session.user);
         } else {
            setUser(null);
            setLoading(false);
         }
      });

      return () => subscription.unsubscribe();
   }, []);

   const fetchUserProfile = async (authUser: SupabaseUser) => {
      try {
         const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();

         if (error) {
            if (error.code === 'PGRST116') {
               // User doesn't exist, create them
               const newUser: User = {
                  id: authUser.id,
                  name: authUser.user_metadata.full_name || authUser.email?.split('@')[0] || 'Anonymous',
                  email: authUser.email || '',
                  picture: authUser.user_metadata.avatar_url || '',
                  role: UserRole.VISITOR, // Default role
                  followedShopIds: [],
                  createdAt: Date.now()
               };

               const { error: insertError } = await supabase.from('users').insert(newUser);
               if (insertError) {
                  console.error('Error creating user:', insertError);
                  toast.error('Failed to create user profile');
               } else {
                  setUser(newUser);
               }
            } else {
               console.error('Error fetching user:', error);
            }
         } else {
            setUser(data as User);
         }
      } catch (err) {
         console.error('Unexpected error fetching user:', err);
      } finally {
         setLoading(false);
      }
   };

   const signInWithGoogle = async () => {
      try {
         const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
               redirectTo: window.location.origin
            }
         });
         if (error) throw error;
      } catch (error: any) {
         toast.error(`Login failed: ${error.message}`);
      }
   };

   const signOut = async () => {
      try {
         const { error } = await supabase.auth.signOut();
         if (error) throw error;
         toast.success('Logged out successfully');
         setSession(null);
         setUser(null);
      } catch (error: any) {
         toast.error(`Logout failed: ${error.message}`);
      }
   };

   const value = {
      session,
      user,
      loading,
      isAuthenticated: !!session?.user,
      signInWithGoogle,
      signOut,
      isAdmin: user?.role === UserRole.ADMIN,
      isOwner: user?.role === UserRole.OWNER,
      isCustomer: user?.role === UserRole.VISITOR || !user?.role, // Treat visitor as customer for now
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};
