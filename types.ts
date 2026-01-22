
export enum UserRole {
  ADMIN = 'ADMIN',
  SHOP_OWNER = 'SHOP_OWNER',
  CUSTOMER = 'CUSTOMER'
}

export enum ShopStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  followingIds: string[];
}

export interface Shop {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  address: string;
  whatsapp: string;
  phone: string;
  status: ShopStatus;
  category: string;
  isVerified: boolean;
  createdAt: string;
  followersCount: number;
  viewCount: number;
  priority: number; // 1 for Founder, 2 for Others
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  isAvailable: boolean;
}
