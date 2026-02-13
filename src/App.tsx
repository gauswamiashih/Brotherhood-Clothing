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
import About from './pages/About';
import LoginPrompt from './pages/LoginPrompt';
import Register from './pages/Register'; // Keeping for now if needed

// Component Imports
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

const ProtectedRoute: React.FC<{ children: React.ReactNode, allowedRoles?: UserRole[] }> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white font-serif text-2xl animate-pulse">Loading Brotherhood...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Or forbidden page
  }

  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user && isAdmin ? <>{children}</> : <Navigate to="/" />;
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
          <Route path="/register" element={<Register />} /> {/* Optional, keeping for reference */}

          <Route path="/shop/:id" element={<ShopProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login-required" element={<LoginPrompt />} />

          {/* Protected Routes */}
          <Route
            path="/register-shop"
            element={
              <ProtectedRoute allowedRoles={[UserRole.VISITOR, UserRole.OWNER]}> {/* Allow visitors to register shop */}
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
            path="/admin/*"
            element={
              <AdminRoute>
                <div className="pt-32 text-center text-white">Admin Dashboard Coming Soon</div>
              </AdminRoute>
            }
          />

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
