import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import ShopsList from './ShopsList';
import ShopProfile from './ShopProfile';
import AdminDashboard from './AdminDashboard';
import OwnerDashboard from './OwnerDashboard';
import Navbar from './Navbar';
import Footer from './Footer';

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
