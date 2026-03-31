import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  IconLayoutDashboard, 
  IconPhoto, 
  IconShoppingBag, 
  IconCategory,
  IconHelp,
  IconStar,
  IconSettings,
  IconLogout,
  IconMenu2,
  IconX,
  IconFlower,
  IconHeader,
  IconBulb,
  IconSparkles,
  IconPhone,
  IconFooter,
  IconSquareRoundedPlus
} from '@tabler/icons-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { admin, logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: IconLayoutDashboard, color: 'violet' },
    { path: '/admin/header', label: 'Header', icon: IconHeader, color: 'blue' },
    { path: '/admin/banners', label: 'Banners', icon: IconPhoto, color: 'pink' },
    { path: '/admin/why-choose-us', label: 'Why Choose Us', icon: IconBulb, color: 'amber' },
    { path: '/admin/categories', label: 'Categories', icon: IconCategory, color: 'green' },
    { path: '/admin/products', label: 'Products', icon: IconShoppingBag, color: 'purple' },
    { path: '/admin/discoveries', label: 'Discoveries', icon: IconSparkles, color: 'cyan' },
    { path: '/admin/faqs', label: 'FAQs', icon: IconHelp, color: 'indigo' },
    { path: '/admin/testimonials', label: 'Testimonials', icon: IconStar, color: 'yellow' },
    { path: '/admin/cta', label: 'CTA Section', icon: IconSquareRoundedPlus, color: 'rose' },
    { path: '/admin/contact', label: 'Contact Info', icon: IconPhone, color: 'teal' },
    { path: '/admin/footer', label: 'Footer', icon: IconFooter, color: 'slate' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-violet-600 to-purple-700 text-white transition-all duration-300 flex flex-col shadow-2xl`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <IconFlower size={24} />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Flower Shop</h1>
                  <p className="text-xs text-white/70">Admin Panel</p>
                </div>
              </div>
            ) : (
              <IconFlower size={24} className="mx-auto" />
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-2"
            >
              {sidebarOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    active 
                      ? 'bg-white text-violet-600 shadow-lg' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Icon size={22} className={active ? `text-${item.color}-500` : ''} />
                  {sidebarOpen && (
                    <span className={`font-medium ${active ? 'font-bold' : ''}`}>
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className={`${sidebarOpen ? 'flex items-center gap-3 mb-3' : 'mb-3'}`}>
            {sidebarOpen ? (
              <>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  {admin?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{admin?.username}</p>
                  <p className="text-xs text-white/70">{admin?.role}</p>
                </div>
              </>
            ) : (
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold mx-auto">
                {admin?.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
          >
            <IconLogout size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
              </h2>
              <p className="text-sm text-slate-500">Manage your website content</p>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                target="_blank"
                className="px-4 py-2 bg-violet-100 text-violet-600 rounded-lg font-medium hover:bg-violet-200 transition-colors"
              >
                View Website
              </Link>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
