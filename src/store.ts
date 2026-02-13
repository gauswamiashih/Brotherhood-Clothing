
import { User, Shop, UserRole, ShopStatus, ShopCategory, ShopMedia } from './src/types';
import { FOUNDER_SHOP } from './constants';

const SHOPS_KEY = 'brotherhood_shops_v3';
const USER_PROFILES_KEY = 'brotherhood_user_profiles_v1';

export const getShops = (): Shop[] => {
  const saved = localStorage.getItem(SHOPS_KEY);
  if (!saved) {
    return [FOUNDER_SHOP];
  }
  const shops: Shop[] = JSON.parse(saved);
  const others = shops.filter((s: Shop) => s.id !== FOUNDER_SHOP.id);
  // Sort others by creation date descending
  others.sort((a, b) => b.createdAt - a.createdAt);
  return [FOUNDER_SHOP, ...others];
};

export const getPublicMarketplaceShops = (): Shop[] => {
  const shops = getShops();
  // Public view: Approved shops only, Founder always first
  return shops.filter(s => s.status === ShopStatus.APPROVED || s.isFounder);
};

export const getShopsByStatus = (status: ShopStatus): Shop[] => {
  const shops = getShops();
  return shops.filter(s => s.status === status && !s.isFounder);
};

export const saveShop = (shop: Shop) => {
  const shops = getShops();
  const index = shops.findIndex(s => s.id === shop.id);
  if (index >= 0) {
    shops[index] = shop;
  } else {
    shops.push(shop);
  }
  localStorage.setItem(SHOPS_KEY, JSON.stringify(shops));
};

export const getUserProfile = (userId: string): User | null => {
  const saved = localStorage.getItem(USER_PROFILES_KEY);
  if (!saved) return null;
  const profiles: Record<string, User> = JSON.parse(saved);
  return profiles[userId] || null;
};

export const saveUserProfile = (user: User) => {
  const saved = localStorage.getItem(USER_PROFILES_KEY);
  const profiles: Record<string, User> = saved ? JSON.parse(saved) : {};
  profiles[user.id] = user;
  localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(profiles));
};

export const toggleFollowShop = (userId: string, shopId: string): { user: User, shop: Shop } | null => {
  const shops = getShops();
  const shop = shops.find(s => s.id === shopId);
  const user = getUserProfile(userId);

  if (!shop || !user) return null;

  const isFollowing = user.followedShopIds.includes(shopId);

  if (isFollowing) {
    user.followedShopIds = user.followedShopIds.filter(id => id !== shopId);
    shop.followersCount = Math.max(0, shop.followersCount - 1);
  } else {
    user.followedShopIds.push(shopId);
    shop.followersCount += 1;
  }

  saveShop(shop);
  saveUserProfile(user);
  return { user, shop };
};

export const generateId = () => Math.random().toString(36).substr(2, 9);
