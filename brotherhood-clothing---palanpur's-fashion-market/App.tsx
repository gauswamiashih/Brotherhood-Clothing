
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ShopsList from './pages/ShopsList';
import ShopProfile from './pages/ShopProfile';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

/**
 * ARCHITECTURE OVERVIEW: Brotherhood Clothing
 * 
 * 1. FRONTEND (Framer/React):
 *    - Responsibilities: UI/UX Rendering, Search Logic, Route Management, State Management (Zustand/Context).
 *    - Tech: React 18, Tailwind (for visual fidelity), Framer Motion (for animations).
 * 
 * 2. BACKEND (YouBase/YouWare):
 *    - Responsibilities: Auth (JWT), Database (PostgreSQL/NoSQL), Storage (Cloudinary/S3), API Gateway.
 *    - Data Flow: Framer Components -> YouBase REST API -> Database.
 * 
 * 3. SECURITY:
 *    - Role-based Access Control (RBAC).
 *    - Admin approval workflow for new shops.
 */

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shops" element={<ShopsList />} />
            <Route path="/shop/:slug" element={<ShopProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<OwnerDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
