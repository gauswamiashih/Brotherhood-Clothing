
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

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: UserRole;
}

export interface Shop {
  id: string;
  ownerId: string;
  name: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  category: ShopCategory;
  instagram?: string;
  images: string[];
  status: ShopStatus;
  isFounder: boolean;
  followersCount: number;
  description: string;
}
