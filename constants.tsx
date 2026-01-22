
import React from 'react';
import { Shop, ShopCategory, ShopStatus, ShopMedia } from './types';

const mockFounderMedia: ShopMedia[] = [
  { id: 'm1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', type: 'image', isPinned: true, createdAt: Date.now() },
  { id: 'm2', url: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800', type: 'image', isPinned: true, createdAt: Date.now() },
  { id: 'm3', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', type: 'image', isPinned: true, createdAt: Date.now() },
  { id: 'm4', url: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?auto=format&fit=crop&q=80&w=800', type: 'image', isPinned: false, createdAt: Date.now() },
  { id: 'm5', url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800', type: 'image', isPinned: false, createdAt: Date.now() },
  { id: 'm6', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800', type: 'image', isPinned: false, createdAt: Date.now() },
];

export const FOUNDER_SHOP: Shop = {
  id: 'founder-001',
  ownerId: 'admin-ashish',
  shopName: 'Brotherhood Clothing',
  ownerName: 'Ashish Gauswami',
  phone: '9664592743',
  email: 'gauswamiashish760@gmail.com',
  city: 'Palanpur',
  address: 'Shop No. 7, Elite Plaza, Palanpur, Gujarat',
  category: ShopCategory.ALL,
  instagramUrl: 'https://www.instagram.com/gauswami_8_07_18',
  logoUrl: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=200&h=200',
  media: mockFounderMedia,
  status: ShopStatus.APPROVED,
  isFounder: true,
  followersCount: 12540,
  followingCount: 128,
  description: 'The premier fashion destination in Palanpur. Established by Ashish Gauswami, Brotherhood Clothing represents the pinnacle of style and community quality. Join our brotherhood.',
  bio: 'Premium Men\'s Wear • Lifestyle • Palanpur Native',
  createdAt: Date.now()
};

export const Icons = {
  Home: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
    </svg>
  ),
  Explore: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
  ),
  User: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  ),
  Instagram: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Verified: ({ size = 5, color = 'text-luxury-gold' }: { size?: number, color?: string }) => (
    <svg className={`w-${size} h-${size} ${color}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.5 12.5c0-1.58-.8-3.04-2.12-3.88.23-1.55-.17-3.14-1.1-4.39-1.25-.93-2.84-1.33-4.39-1.1-.84-1.32-2.3-2.12-3.88-2.12s-3.04.8-3.88 2.12c-1.55-.23-3.14.17-4.39 1.1-.93 1.25-1.33 2.84-1.1 4.39-1.32.84-2.12 2.3-2.12 3.88s.8 3.04 2.12 3.88c-.23 1.55.17 3.14 1.1 4.39 1.25.93 2.84 1.33 4.39 1.1.84 1.32 2.3 2.12 3.88 2.12s3.04-.8 3.88-2.12c1.55.23 3.14-.17 4.39-1.1.93-1.25 1.33-2.84 1.1-4.39 1.32-.84 2.12-2.3 2.12-3.88zM10.69 17.03l-3.5-3.5 1.41-1.41 2.09 2.09 5.83-5.83 1.41 1.41-7.24 7.24z"/>
    </svg>
  ),
  Pin: () => (
    <svg className="w-3 h-3 text-luxury-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 9V4l1 0V2H7v2h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/>
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
    </svg>
  )
};
