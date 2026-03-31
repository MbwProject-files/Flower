import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';

// User Pages
import Home from './pages/Home';
import Easter from './pages/Easter';
import Roses from './pages/Roses';
import Birthday from './pages/Birthday';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Account from './pages/Account';
import OrderSuccess from './pages/OrderSuccess';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import NewDashboard from './pages/admin/NewDashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster position="top-right" />
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/easter" element={<Easter />} />
            <Route path="/roses" element={<Roses />} />
            <Route path="/birthday" element={<Birthday />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/order-success" element={<OrderSuccess />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <NewDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;
