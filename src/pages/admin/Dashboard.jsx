import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  IconTrendingUp, 
  IconUsers, 
  IconShoppingBag, 
  IconFlower,
  IconArrowUpRight,
  IconArrowDownRight,
  IconDotsVertical,
  IconLayoutGrid,
  IconTruckDelivery
} from "@tabler/icons-react";

const metrics = [
  { 
    label: "Total Sales", 
    value: "$12,450.00", 
    trend: "+12.5%", 
    trendUp: true, 
    icon: IconShoppingBag, 
    color: "bg-brand-primary" 
  },
  { 
    label: "Active Orders", 
    value: "156", 
    trend: "+8.2%", 
    trendUp: true, 
    icon: IconTruckDelivery, 
    color: "bg-amber-500" 
  },
  { 
    label: "Total Customers", 
    value: "2,400", 
    trend: "-2.4%", 
    trendUp: false, 
    icon: IconUsers, 
    color: "bg-blue-500" 
  },
  { 
    label: "Products Sold", 
    value: "845", 
    trend: "+18.3%", 
    trendUp: true, 
    icon: IconFlower, 
    color: "bg-green-500" 
  },
];

const recentOrders = [
  { id: "#1254", customer: "Sophia Miller", product: "Red Roses Bouquet", amount: "$45.00", status: "Delivered", date: "2 mins ago" },
  { id: "#1253", customer: "Jackson Davis", product: "Spring Mix", amount: "$38.50", status: "Pending", date: "15 mins ago" },
  { id: "#1252", customer: "Emma Wilson", product: "White Lily Arrangement", amount: "$52.00", status: "In Transit", date: "1 hour ago" },
  { id: "#1251", customer: "Liam Brown", product: "Sunflower Delight", amount: "$29.99", status: "Delivered", date: "3 hours ago" },
];

const DashboardCard = ({ metric }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-opacity-30 ${metric.color}`}>
        <metric.icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${metric.trendUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
        {metric.trendUp ? <IconArrowUpRight size={14} /> : <IconArrowDownRight size={14} />}
        {metric.trend}
      </div>
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{metric.label}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{metric.value}</h3>
    </div>
    
    {/* Decoration */}
    <div className={`absolute -right-4 -bottom-4 w-16 h-16 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-500 ${metric.color}`} />
  </div>
);

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-serif">Quick Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((metric, idx) => (
          <DashboardCard key={idx} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Recent Orders</h3>
            <button className="text-brand-primary text-sm font-semibold hover:underline">View All Orders</button>
          </div>

          <div className="overflow-x-auto overflow-hidden">
            <table className="w-full text-left min-w-[500px]">
              <thead className="border-b border-slate-100">
                <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-semibold text-slate-700">{order.id}</td>
                    <td className="py-4 font-medium text-slate-600">{order.customer}</td>
                    <td className="py-4 text-slate-500">{order.product}</td>
                    <td className="py-4 font-bold text-slate-800">{order.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === "Delivered" ? "bg-green-100 text-green-600" :
                        order.status === "Pending" ? "bg-amber-100 text-amber-600" :
                        "bg-blue-100 text-blue-600"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400 text-sm">{order.date}</td>
                    <td className="py-4">
                      <button className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
                        <IconDotsVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Summary */}
        <div className="bg-gradient-to-br from-brand-primary to-violet-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold font-serif">Quick Inventory</h3>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <IconLayoutGrid size={20} />
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { title: "Red Roses", count: 42, color: "bg-red-400" },
                { title: "Lilies", count: 28, color: "bg-blue-400" },
                { title: "Sunflowers", count: 15, color: "bg-amber-400" },
                { title: "Orchids", count: 12, color: "bg-purple-400" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium opacity-90">{item.title}</span>
                    <span className="text-xs font-bold">{item.count} items left</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transition-all duration-1000 ease-out shadow-sm`} 
                      style={{ width: `${(item.count / 50) * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-10 w-full py-4 bg-white text-brand-primary rounded-2xl font-bold hover:bg-opacity-90 transition-all transform active:scale-95 flex items-center justify-center gap-2">
              <IconFlower size={20} />
              Restock Inventory
            </button>
          </div>

          <div className="absolute right-[-30px] bottom-[-20px] text-white/5 transform rotate-[-15deg] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <IconFlower size={300} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
