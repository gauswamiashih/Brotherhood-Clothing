
import React from 'react';
import { Shop, ShopCategory, ShopStatus } from './types';

export const FOUNDER_SHOP: Shop = {
  id: 'founder-001',
  ownerId: 'admin-ashish',
  name: 'Brotherhood Clothing',
  ownerName: 'Ashish Gauswami',
  phone: '9664592743',
  email: 'gauswamiashish760@gmail.com',
  city: 'Palanpur, Gujarat',
  category: ShopCategory.ALL,
  instagram: 'https://www.instagram.com/gauswami_8_07_18',
  images: [
    'https://picsum.photos/seed/shop1/800/600',
    'https://picsum.photos/seed/shop2/800/600',
    'https://picsum.photos/seed/shop3/800/600',
    'https://picsum.photos/seed/shop4/800/600',
    'https://picsum.photos/seed/shop5/800/600',
    'https://picsum.photos/seed/shop6/800/600'
  ],
  status: ShopStatus.APPROVED,
  isFounder: true,
  followersCount: 12500,
  description: 'The premier fashion destination in Palanpur. Established by Ashish Gauswami, Brotherhood Clothing represents the pinnacle of style and community quality. Join our brotherhood.'
};

export const Icons = {
  Instagram: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Verified: () => (
    <svg className="w-5 h-5 instagram-verified" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.5 12.5c0-1.58-.8-3.04-2.12-3.88.23-1.55-.17-3.14-1.1-4.39-1.25-.93-2.84-1.33-4.39-1.1-.84-1.32-2.3-2.12-3.88-2.12s-3.04.8-3.88 2.12c-1.55-.23-3.14.17-4.39 1.1-.93 1.25-1.33 2.84-1.1 4.39-1.32.84-2.12 2.3-2.12 3.88s.8 3.04 2.12 3.88c-.23 1.55.17 3.14 1.1 4.39 1.25.93 2.84 1.33 4.39 1.1.84 1.32 2.3 2.12 3.88 2.12s3.04-.8 3.88-2.12c1.55.23 3.14-.17 4.39-1.1.93-1.25 1.33-2.84 1.1-4.39 1.32-.84 2.12-2.3 2.12-3.88zM10.69 17.03l-3.5-3.5 1.41-1.41 2.09 2.09 5.83-5.83 1.41 1.41-7.24 7.24z"/>
    </svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  ),
  Location: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
    </svg>
  )
};
