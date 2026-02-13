
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
   const [user, setUser] = useState<User | null>(null);
   const [session, setSession] = useState<Session | null>(null);
   const [loading, setLoading] = useState(true);

   const fetchUserProfile = async (userId: string, email: string, metadata: any) => {
      try {
         const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

         if (error) {
            if (error.code === 'PGRST116') {
               // User doesn't exist, create them
               const newUser: User = {
                  id: userId,
                  name: metadata.full_name || email.split('@')[0] || 'Anonymous',
                  email: email,
                  picture: metadata.avatar_url || '',
                  role: UserRole.VISITOR,
                  followedShopIds: [],
                  createdAt: Date.now()
               };

               const { error: insertError } = await supabase.from('users').insert(newUser);
               if (insertError) throw insertError;
               setUser(newUser);
            } else {
               throw error;
            }
         } else {
            setUser(data as User);
         }
      } catch (err) {
         console.error('Error in fetchUserProfile:', err);
         setUser(null);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      // 1. Initial Session Check
      const initAuth = async () => {
         try {
            const { data: { session: initialSession }, error } = await supabase.auth.getSession();
            if (error) throw error;

            setSession(initialSession);
            if (initialSession?.user) {
               await fetchUserProfile(
                  initialSession.user.id,
                  initialSession.user.email!,
                  initialSession.user.user_metadata
               );
            } else {
               setLoading(false);
            }
         } catch (error) {
            console.error('Auth initialization error:', error);
            setLoading(false);
         }
      };

      initAuth();

      // 2. Listen for Auth State Changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
         console.log('Auth State Change Event:', event);
         setSession(currentSession);

         if (currentSession?.user) {
            await fetchUserProfile(
               currentSession.user.id,
               currentSession.user.email!,
               currentSession.user.user_metadata
            );
         } else {
            setUser(null);
            setLoading(false);
         }
      });

      return () => {
         subscription.unsubscribe();
      };
   }, []);

   const signInWithGoogle = async () => {
      try {
         const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
               redirectTo: window.location.origin,
               queryParams: {
                  access_type: 'offline',
                  prompt: 'consent',
               },
            }
         });
         if (error) throw error;
      } catch (error: any) {
         toast.error(`Login failed: ${error.message}`);
         console.error('Login error:', error);
      }
   };

   const signOut = async () => {
      try {
         const { error } = await supabase.auth.signOut();
         if (error) throw error;
         setUser(null);
         setSession(null);
         toast.success('Logged out successfully');
      } catch (error: any) {
         toast.error(`Logout failed: ${error.message}`);
      }
   };

   const value = {
      session,
      user,
      loading,
      isAuthenticated: !!session,
      signInWithGoogle,
      signOut,
      isAdmin: user?.role === UserRole.ADMIN,
      isOwner: user?.role === UserRole.OWNER,
      isCustomer: user?.role === UserRole.VISITOR || !user?.role,
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
