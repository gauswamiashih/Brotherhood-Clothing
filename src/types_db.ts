
export type Json =
   | string
   | number
   | boolean
   | null
   | { [key: string]: Json | undefined }
   | Json[]

export interface Database {
   public: {
      Tables: {
         users: {
            Row: {
               id: string
               created_at: string
               email: string
               name: string | null
               picture: string | null
               role: 'Visitor' | 'Owner' | 'Admin'
               followed_shop_ids: string[] | null
            }
            Insert: {
               id: string
               created_at?: string
               email: string
               name?: string | null
               picture?: string | null
               role?: 'Visitor' | 'Owner' | 'Admin'
               followed_shop_ids?: string[] | null
            }
            Update: {
               id?: string
               created_at?: string
               email?: string
               name?: string | null
               picture?: string | null
               role?: 'Visitor' | 'Owner' | 'Admin'
               followed_shop_ids?: string[] | null
            }
         }
         shops: {
            Row: {
               id: string
               created_at: string
               owner_id: string
               shop_name: string
               status: 'Pending' | 'Approved' | 'Blocked'
            }
         }
      }
   }
}
