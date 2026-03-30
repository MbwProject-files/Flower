import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Easter from './pages/Easter'
import Roses from './pages/Roses'
import Birthday from './pages/Birthday'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Account from './pages/Account'
import OrderSuccess from './pages/OrderSuccess'
import { CartProvider } from './context/CartContext'
import ScrollToTop from './components/ScrollToTop'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import ProductManagement from './pages/admin/ProductManagement'
import MenuOverview from './pages/admin/MenuOverview'
import AdminComingSoon from './pages/admin/ComingSoon'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* User Side */}
          <Route path="/" element={<Home />} />
          <Route path="/easter" element={<Easter />} />
          <Route path="/roses" element={<Roses />} />
          <Route path="/birthday" element={<Birthday />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Admin Side */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/all-menus" element={<MenuOverview />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/orders" element={<AdminComingSoon title="Order Management" />} />
          <Route path="/admin/customers" element={<AdminComingSoon title="Customer Management" />} />
          <Route path="/admin/settings" element={<AdminComingSoon title="Settings" />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App

