
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Shop, ShopStatus } from '../types';

interface AuthContextType {
  user: User | null;
  shops: Shop[];
  register: (userData: any, shopData?: any) => void;
  registerShop: (shopData: any) => void;
  login: (email: string) => boolean;
  logout: () => void;
  toggleFollow: (shopId: string) => void;
  incrementView: (shopId: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// REAL PERMANENT FOUNDER DATA
const FOUNDER_ID = 'founder_ashish';
const FOUNDER_SHOP_ID = 'founder_shop_gauswami';

const FOUNDER_USER: User = {
  id: FOUNDER_ID,
  name: 'Gauswami Ashish',
  email: 'gauswamiashish760@gmail.com',
  role: UserRole.SHOP_OWNER,
  phone: '9664592743',
  followingIds: []
};

const FOUNDER_SHOP: Shop = {
  id: FOUNDER_SHOP_ID,
  ownerId: FOUNDER_ID,
  name: 'Brotherhood Official',
  slug: 'brotherhood-official',
  logo: 'https://images.unsplash.com/photo-1544441893-675973e30605?auto=format&fit=crop&q=80&w=400',
  coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000',
  description: 'The definitive flagship of Palanpur fashion. Curated by Ashish Gauswami, this collection defines the essence of the Brotherhood. Real luxury, local legacy.',
  address: 'Palanpur, Gujarat',
  whatsapp: '9664592743',
  phone: '9664592743',
  status: ShopStatus.APPROVED,
  category: 'Founder Exclusive',
  isVerified: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  followersCount: 0,
  viewCount: 0,
  priority: 1 // ALWAYS FIRST
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);

  // STRICT SORTING: Priority 1 first, then Priority 2 by Newest
  const sortShops = (shopList: Shop[]) => {
    return [...shopList].sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem('bh_users_v2');
    const storedShops = localStorage.getItem('bh_shops_v2');
    const activeUser = localStorage.getItem('bh_active_user_v2');

    let dbUsers = storedUsers ? JSON.parse(storedUsers) : [FOUNDER_USER];
    let dbShops = storedShops ? JSON.parse(storedShops) : [FOUNDER_SHOP];

    // Ensure Founder always exists and has Priority 1
    if (!dbUsers.some((u: User) => u.id === FOUNDER_ID)) dbUsers.push(FOUNDER_USER);
    if (!dbShops.some((s: Shop) => s.id === FOUNDER_SHOP_ID)) {
      dbShops.push(FOUNDER_SHOP);
    } else {
      // Re-apply Founder attributes to ensure consistency
      dbShops = dbShops.map((s: Shop) => s.id === FOUNDER_SHOP_ID ? { ...FOUNDER_SHOP, ...s, priority: 1 } : s);
    }

    setUsers(dbUsers);
    setShops(sortShops(dbShops));
    if (activeUser) setUser(JSON.parse(activeUser));
  }, []);

  const sync = (updatedUsers: User[], updatedShops: Shop[]) => {
    const sorted = sortShops(updatedShops);
    setUsers(updatedUsers);
    setShops(sorted);
    localStorage.setItem('bh_users_v2', JSON.stringify(updatedUsers));
    localStorage.setItem('bh_shops_v2', JSON.stringify(sorted));
  };

  const register = (userData: any, shopData?: any) => {
    const userId = `u_${Date.now()}`;
    const newUser: User = {
      id: userId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      followingIds: []
    };

    const updatedUsers = [...users, newUser];
    let updatedShops = [...shops];

    if (userData.role === UserRole.SHOP_OWNER && shopData) {
      const newShop: Shop = {
        id: `s_${Date.now()}`,
        ownerId: userId,
        name: shopData.name,
        slug: shopData.name.toLowerCase().replace(/\s+/g, '-'),
        logo: 'https://images.unsplash.com/photo-1544441893-675973e30605?auto=format&fit=crop&q=80&w=400',
        coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000',
        description: shopData.description,
        address: shopData.address,
        whatsapp: shopData.whatsapp,
        phone: shopData.phone,
        status: ShopStatus.APPROVED,
        category: shopData.category,
        isVerified: false,
        createdAt: new Date().toISOString(),
        followersCount: 0,
        viewCount: 0,
        priority: 2
      };
      updatedShops.push(newShop);
    }

    sync(updatedUsers, updatedShops);
    setUser(newUser);
    localStorage.setItem('bh_active_user_v2', JSON.stringify(newUser));
  };

  const registerShop = (shopData: any) => {
    if (!user) return;
    
    const newShop: Shop = {
      id: `s_${Date.now()}`,
      ownerId: user.id,
      name: shopData.name,
      slug: shopData.name.toLowerCase().replace(/\s+/g, '-'),
      logo: 'https://images.unsplash.com/photo-1544441893-675973e30605?auto=format&fit=crop&q=80&w=400',
      coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000',
      description: shopData.description,
      address: shopData.address,
      whatsapp: shopData.whatsapp,
      phone: shopData.phone,
      status: ShopStatus.APPROVED,
      category: shopData.category,
      isVerified: false,
      createdAt: new Date().toISOString(),
      followersCount: 0,
      viewCount: 0,
      priority: 2
    };

    const updatedUser = { ...user, role: UserRole.SHOP_OWNER };
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    const updatedShops = [...shops, newShop];

    sync(updatedUsers, updatedShops);
    setUser(updatedUser);
    localStorage.setItem('bh_active_user_v2', JSON.stringify(updatedUser));
  };

  const login = (email: string) => {
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('bh_active_user_v2', JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bh_active_user_v2');
  };

  const toggleFollow = (shopId: string) => {
    if (!user) return;
    const isFollowing = user.followingIds.includes(shopId);
    const updatedUser = {
      ...user,
      followingIds: isFollowing 
        ? user.followingIds.filter(id => id !== shopId) 
        : [...user.followingIds, shopId]
    };
    
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    const updatedShops = shops.map(s => {
      if (s.id === shopId) {
        return { ...s, followersCount: isFollowing ? Math.max(0, s.followersCount - 1) : s.followersCount + 1 };
      }
      return s;
    });

    setUser(updatedUser);
    sync(updatedUsers, updatedShops);
    localStorage.setItem('bh_active_user_v2', JSON.stringify(updatedUser));
  };

  const incrementView = (shopId: string) => {
    const updatedShops = shops.map(s => s.id === shopId ? { ...s, viewCount: s.viewCount + 1 } : s);
    sync(users, updatedShops);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      shops, 
      register, 
      registerShop,
      login, 
      logout, 
      toggleFollow, 
      incrementView,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
