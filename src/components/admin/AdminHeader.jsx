import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  IconFlower, 
  IconSearch, 
  IconBell, 
  IconMessageDots, 
  IconExternalLink,
  IconChevronDown,
  IconUser,
  IconLogout,
  IconSettings,
  IconCalendar
} from "@tabler/icons-react";

const AdminHeader = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
        });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center justify-between px-6 shadow-sm">
            {/* Brand & Greeting Section */}
            <div className="flex items-center gap-8 w-auto"> 
                <Link to="/admin/all-menus" className="flex items-center gap-2 group transition-all hover:scale-[1.02]">
                    <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white shadow-lg group-hover:rotate-[360deg] transition-transform duration-700">
                        <IconFlower size={20} />
                    </div>
                    <div className="hidden lg:block">
                        <h2 className="font-serif text-lg font-bold text-slate-900 leading-none">Bouquet</h2>
                        <p className="text-[10px] uppercase tracking-widest text-brand-primary font-bold mt-0.5 opacity-80">Explorer</p>
                    </div>
                </Link>

                <div className="h-8 w-px bg-slate-100 hidden xl:block" />

                <div className="hidden xl:block">
                    <h3 className="text-sm font-bold text-slate-800">{getGreeting()}, Admin!</h3>
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <IconCalendar size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{formatDate(currentTime)}</span>
                    </div>
                </div>
            </div>

            {/* Enhanced User-Friendly Search */}
            <div className="flex-1 max-w-lg mx-8 flex items-center">
                <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none group-focus-within:text-brand-primary transition-colors text-slate-400">
                        <IconSearch size={18} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Quick Search (Ctrl + K)..." 
                        className="w-full pl-10 pr-12 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-primary/5 focus:bg-white focus:border-brand-primary/30 transition-all text-sm font-medium" 
                    />
                    <div className="absolute right-3 inset-y-0 flex items-center">
                        <kbd className="px-1.5 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-200 rounded bg-white">K</kbd>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
                {/* View Store Quick Link */}
                <Link to="/" className="hidden sm:flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-brand-primary font-bold text-xs transition-all hover:bg-brand-secondary rounded-xl">
                    <IconExternalLink size={16} />
                    <span>View Store</span>
                </Link>

                <div className="h-8 w-px bg-slate-100 mx-1 hidden sm:block" />

                <div className="flex items-center gap-1 text-slate-400">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors relative group">
                        <IconMessageDots size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors relative group">
                        <IconBell size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
                
                <div className="h-8 w-px bg-slate-100 mx-1" />
                
                {/* Profile Section */}
                <div className="relative ml-2">
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-2 pl-2 pr-1 py-1 rounded-2xl transition-all ${isProfileOpen ? "bg-brand-secondary/50" : "hover:bg-slate-50"}`}
                    >
                        <div className="w-9 h-9 rounded-full bg-brand-secondary border border-brand-primary/10 p-0.5 overflow-hidden shadow-inner">
                            <img 
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                                alt="Admin Profile" 
                                className="w-full h-full rounded-full object-cover" 
                            />
                        </div>
                        <IconChevronDown size={14} className={`text-slate-400 transition-transform duration-300 mr-1 ${isProfileOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                            <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-3xl shadow-2xl z-50 p-2 animate-fade-in origin-top-right ring-4 ring-slate-900/5">
                                <div className="p-4 flex items-center gap-3 border-b border-slate-50 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center text-brand-primary">
                                        <IconUser size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">Admin User</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Store Manager</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-brand-secondary hover:text-brand-primary rounded-2xl transition-all">
                                        <IconSettings size={18} />
                                        System Settings
                                    </button>
                                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                                        <IconLogout size={18} />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
