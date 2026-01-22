
import React from 'react';

/**
 * STRATEGIC SYSTEM DESIGN GUIDELINES (Brotherhood Clothing)
 * 
 * 1. DATABASE SCHEMA (Logical):
 *    - Users: { id, email, password_hash, role: 'ADMIN' | 'SHOP_OWNER', profile_img }
 *    - Shops: { id, owner_id, name, slug, logo, cover_img, bio, location_lat, location_lng, address, whatsapp, phone, status: 'PENDING' | 'APPROVED', is_verified }
 *    - Products: { id, shop_id, name, description, price, category_id, images: string[], status: 'ACTIVE' | 'DRAFT', views_count }
 *    - ContactLog: { id, shop_id, timestamp, type: 'WHATSAPP' | 'CALL', user_ip }
 * 
 * 2. API ENDPOINTS (Restful):
 *    - GET /api/shops -> Public discovery
 *    - GET /api/shops/:slug -> Public profile
 *    - POST /api/auth/login -> Secure access
 *    - PATCH /api/admin/approve-shop/:id -> Moderation
 *    - POST /api/owner/products -> Inventory management
 * 
 * 3. BEST PRACTICES:
 *    - Security: Use HTTPS, Rate limiting on WhatsApp clicks, input sanitization.
 *    - Validation: Cloudinary for image transformations (enforce specific aspect ratios for premium look).
 *    - Performance: Next.js or Framer SSG for SEO. Lazy load collection grids.
 *    - Local SEO: Include "Palanpur Fashion", "Clothing in Palanpur", and local area names in metadata.
 */

export const BEST_PRACTICES = {
  IMAGE_STORAGE: "Use Cloudinary for auto-optimizing fashion photography. Enforce 4:5 aspect ratio for shop previews.",
  VALIDATION: "Always validate WhatsApp numbers to ensure they include country code (+91).",
  SECURITY: "No customer login means no PII leak risk. Keep owner passwords complex.",
  LOCAL_SEO: "Integrate Google Maps API for shop location verification."
};
