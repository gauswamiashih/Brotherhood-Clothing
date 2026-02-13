import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRole } from './types';

// Page Imports
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterShop from './pages/RegisterShop';
import ShopProfile from './pages/ShopProfile';
import OwnerDashboard from './pages/OwnerDashboard';
import ShopsList from './pages/ShopsList';
import About from './pages/About';
import LoginPrompt from './pages/LoginPrompt';
import Register from './pages/Register';

// Component Imports
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

const ProtectedRoute: React.FC<{ children: React.ReactNode, allowedRoles?: UserRole[] }> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-luxury-gold font-serif text-2xl animate-pulse tracking-widest uppercase">
          Verifying Identity...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on actual role if access is forbidden
    if (user.role === UserRole.ADMIN) return <Navigate to="/admin-dashboard" replace />;
    if (user.role === UserRole.OWNER) return <Navigate to="/dashboard" replace />;
    return <Navigate to="/marketplace" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'serif'
          },
          success: {
            iconTheme: {
              primary: '#d4af37',
              secondary: '#000',
            },
          },
        }}
      />

      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<ShopsList />} />
          <Route path="/shops" element={<Navigate to="/marketplace" replace />} />

          <Route path="/shop/:id" element={<ShopProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login-required" element={<LoginPrompt />} />

          {/* Protected Routes */}
          <Route
            path="/register-shop"
            element={
              <ProtectedRoute allowedRoles={[UserRole.VISITOR, UserRole.OWNER]}>
                <RegisterShop />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[UserRole.OWNER, UserRole.ADMIN]}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <div className="pt-32 text-center text-white">
                  <h1 className="text-4xl font-serif mb-8 text-luxury-gold">Admin Headquarters</h1>
                  <p className="text-gray-500 uppercase tracking-widest text-xs">Command Center Under Construction</p>
                </div>
              </ProtectedRoute>
            }
          />

          <Route path="/admin/*" element={<Navigate to="/admin-dashboard" replace />} />
        </Routes>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
