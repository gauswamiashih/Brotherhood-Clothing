
import { User, Shop, UserRole, ShopStatus, ShopCategory } from './types';
import { FOUNDER_SHOP } from './constants';

const SHOPS_KEY = 'brotherhood_shops';
const USER_KEY = 'brotherhood_user';

export const getShops = (): Shop[] => {
  const saved = localStorage.getItem(SHOPS_KEY);
  if (!saved) {
    return [FOUNDER_SHOP];
  }
  const shops = JSON.parse(saved);
  // Ensure founder is always present and first
  const others = shops.filter((s: Shop) => s.id !== FOUNDER_SHOP.id);
  return [FOUNDER_SHOP, ...others];
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

export const getCurrentUser = (): User | null => {
  const saved = localStorage.getItem(USER_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const loginUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const generateId = () => Math.random().toString(36).substr(2, 9);
