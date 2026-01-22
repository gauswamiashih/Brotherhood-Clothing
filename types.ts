
export enum ShopCategory {
  MEN = 'Men',
  WOMEN = 'Women',
  KIDS = 'Kids',
  ALL = 'All'
}

export enum ShopStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  BLOCKED = 'Blocked'
}

export enum UserRole {
  VISITOR = 'Visitor',
  OWNER = 'Owner',
  ADMIN = 'Admin'
}

export interface ShopMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  isPinned: boolean;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: UserRole;
  followedShopIds: string[];
  createdAt: number;
}

export interface Shop {
  id: string;
  ownerId: string;
  ownerName: string;
  shopName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  instagramUrl?: string;
  category: ShopCategory;
  logoUrl: string;
  media: ShopMedia[];
  status: ShopStatus;
  isFounder: boolean;
  followersCount: number;
  followingCount: number;
  description: string;
  bio: string;
  createdAt: number;
}
