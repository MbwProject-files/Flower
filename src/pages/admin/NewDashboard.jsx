import { useState, useEffect } from 'react';
import { dashboardAPI, bannerAPI, productAPI, categoryAPI } from '../../services/api';
import AdminLayout from '../../components/admin/NewAdminLayout';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IconShoppingBag, IconCategory, IconStar, IconPhoto, IconTrendingUp, IconUsers } from '@tabler/icons-react';
import toast from 'react-hot-toast';

const NewDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, bannersRes, productsRes, categoriesRes] = await Promise.all([
        dashboardAPI.getStats(),
        bannerAPI.getAll(),
        productAPI.getAll(),
        categoryAPI.getAll()
      ]);

      setStats(statsRes.data.data.stats);
      
      // Prepare chart data
      const categoryData = categoriesRes.data.data.slice(0, 6).map(cat => ({
        name: cat.name,
        items: cat.item_count || 0
      }));
      setRecentData(categoryData);
      
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: IconShoppingBag, color: 'violet', trend: '+12%' },
    { label: 'Categories', value: stats?.totalCategories || 0, icon: IconCategory, color: 'green', trend: '+3%' },
    { label: 'Testimonials', value: stats?.totalTestimonials || 0, icon: IconStar, color: 'yellow', trend: '+8%' },
    { label: 'Banners', value: stats?.totalBanners || 0, icon: IconPhoto, color: 'pink', trend: '+2%' },
  ];

  const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#ec4899'];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-violet-100">Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                    <Icon size={24} className={`text-${stat.color}-600`} />
                  </div>
                  <span className="text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Items by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="items" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={recentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="items"
                >
                  {recentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-violet-50 hover:bg-violet-100 rounded-xl text-violet-600 font-semibold transition-all">
              Add Product
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl text-green-600 font-semibold transition-all">
              Add Category
            </button>
            <button className="p-4 bg-pink-50 hover:bg-pink-100 rounded-xl text-pink-600 font-semibold transition-all">
              Add Banner
            </button>
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-blue-600 font-semibold transition-all">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewDashboard;
