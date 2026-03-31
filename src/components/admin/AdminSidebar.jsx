import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  IconLayoutDashboard, 
  IconFlower, 
  IconShoppingBag, 
  IconUsers, 
  IconSettings,
  IconLogout,
  IconLayoutGrid,
  IconBrush,
  IconChevronRight,
  IconPhoto
} from "@tabler/icons-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { 
    group: "General", 
    items: [
      { label: "Dashboard", icon: IconLayoutDashboard, path: "/admin" },
      { label: "Header", icon: IconBrush, path: "/admin/all-menus", isSpecial: true },
      { label: "Banner", icon: IconPhoto, path: "/admin/banners", isSpecial: true },
    ]
  },
  { 
    group: "Shop Management", 
    items: [
      { label: "Products", icon: IconFlower, path: "/admin/products" },
      { label: "Orders", icon: IconShoppingBag, path: "/admin/orders" },
      { label: "Customers", icon: IconUsers, path: "/admin/customers" },
    ]
  },
  { 
    group: "Configuration", 
    items: [
      { label: "Settings", icon: IconSettings, path: "/admin/settings" },
    ]
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white border-r border-slate-50 z-40 flex flex-col shadow-sm">
      <nav className="flex-1 px-4 py-8 space-y-10 overflow-y-auto no-scrollbar">
        {menuItems.map((section) => (
          <div key={section.group} className="space-y-2">
            <div className="flex items-center justify-between px-4 mb-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">
                {section.group}
                </h3>
                <div className="h-px flex-1 bg-slate-50 ml-4" />
            </div>
            
            <div className="space-y-1">
                {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                    key={item.label}
                    to={item.path}
                    className={cn(
                        "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group text-sm font-bold border-2 border-transparent",
                        isActive 
                        ? "bg-brand-primary text-white shadow-xl shadow-violet-100 border-brand-primary/10" 
                        : item.isSpecial 
                            ? "bg-brand-secondary/40 text-brand-primary hover:bg-brand-secondary border-brand-primary/5" 
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                    >
                    <div className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                        isActive ? "bg-white/20" : item.isSpecial ? "bg-brand-primary/10" : "bg-slate-50 group-hover:bg-brand-secondary"
                    )}>
                        <item.icon 
                            size={18} 
                            className={cn(
                            "transition-all duration-200",
                            isActive ? "text-white" : item.isSpecial ? "text-brand-primary" : "text-slate-400 group-hover:text-brand-primary"
                            )} 
                        />
                    </div>
                    
                    <span className="flex-1">{item.label}</span>
                    
                    {isActive ? (
                        <IconChevronRight size={14} className="opacity-50" />
                    ) : (
                        item.isSpecial && (
                            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse mr-1" />
                        )
                    )}
                    </Link>
                );
                })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Status Section */}
      <div className="p-4 border-t border-slate-50 mt-auto">
        <button className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-2xl text-red-500 bg-red-50 hover:bg-red-100 transition-all duration-200 text-sm font-black group">
          <IconLogout size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          Logout System
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
