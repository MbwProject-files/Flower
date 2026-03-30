import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  IconLayoutNavbar, 
  IconLayoutNavbarExpand, 
  IconLayoutSidebarLeftCollapse,
  IconArrowRight,
  IconCircleCheck,
  IconEdit,
  IconTrash,
  IconEye,
  IconSettings2,
  IconChevronDown,
  IconFlower,
  IconSearch,
  IconPlus,
  IconGripVertical,
  IconGift,
  IconConfetti,
  IconMoodSad,
  IconCalendarStar,
  IconCandy,
  IconArrowNarrowRight,
  IconLayoutDashboard,
  IconDeviceFloppy,
  IconRestore,
  IconGridDots
} from "@tabler/icons-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Reorder, motion } from "framer-motion";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const initialMenus = [
    { id: 1, name: "Home", type: "Main Link", submenus: 0, status: "Active" },
    { id: 2, name: "EASTER", type: "Mega Menu", submenus: 12, status: "Active" },
    { id: 3, name: "ROSES", type: "Mega Menu", submenus: 24, status: "Active" },
    { id: 4, name: "BIRTHDAY", type: "Dropdown", submenus: 8, status: "Active" },
    { id: 5, name: "SYMPATHY", type: "Dropdown", submenus: 6, status: "Active" },
    { id: 6, name: "OCCASIONS", type: "Dropdown", submenus: 15, status: "Active" },
    { id: 7, name: "HOLIDAYS", type: "Mega Menu", submenus: 10, status: "Active" },
];

const initialSympathyItems = [
    { id: "s1", name: "Funeral Flowers" },
    { id: "s2", name: "Cremation and Memorial" },
    { id: "s3", name: "Casket Flowers" },
    { id: "s4", name: "Standing Sprays & Wreaths" },
    { id: "s5", name: "Sympathy Arrangements" },
    { id: "s6", name: "For The Home" }
];

const MenuOverview = () => {
  const [menus, setMenus] = useState(initialMenus);
  const [syItems, setSyItems] = useState(initialSympathyItems);
  const [hasChanged, setHasChanged] = useState(false);

  const handleReorderMenus = (newOrder) => {
    setMenus(newOrder);
    setHasChanged(true);
  };

  const handleReorderSubItems = (newOrder) => {
    setSyItems(newOrder);
    setHasChanged(true);
  };

  const handleSave = () => {
    setHasChanged(false);
    alert("Full Navigation Order Saved Successfully!");
  };

  const handleReset = () => {
    setMenus(initialMenus);
    setSyItems(initialSympathyItems);
    setHasChanged(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 no-scrollbar pb-32">
        {/* Header Section */}
        <div className="mb-16 text-center animate-fade-in">
            <h1 className="text-4xl font-black text-slate-900 font-serif mb-3 tracking-tight">Navigation Designer</h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                Organize your frontend menu. You can drag main categories AND individual sub-menu items below.
            </p>
        </div>

        {/* TOP SECTION: Live Simulation Header */}
        <div className="mb-16 animate-fade-up relative z-50">
            <div className="bg-slate-950 rounded-[3rem] p-1 shadow-2xl relative group overflow-visible">
                <div className="bg-white rounded-[2.9rem] p-12 border border-white/20">
                    <nav className="h-20 px-8 flex items-center justify-between border rounded-[2rem] border-slate-100 bg-white relative overflow-visible shadow-xl shadow-slate-100">
                        <div className="flex items-center gap-2 font-serif text-xl font-bold text-slate-800">
                            <IconFlower size={24} className="text-brand-primary" />
                            Bouquet
                        </div>
                        
                        <div className="hidden lg:flex items-center gap-6">
                            {menus.map((menu) => (
                                <div key={menu.id} className="relative group/menu">
                                    <button className={cn(
                                        "flex items-center gap-1.5 text-[10px] font-black uppercase transition-colors py-8 whitespace-nowrap",
                                        menu.name === "SYMPATHY" ? "text-brand-primary" : "text-slate-400 group-hover/menu:text-slate-900"
                                    )}>
                                        {menu.name}
                                        {menu.id === 5 && <IconChevronDown size={14} className="group-hover/menu:rotate-180 transition-all" />}
                                    </button>
                                    
                                    {menu.id === 5 && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 hidden group-hover/menu:block z-[999] animate-fade-in">
                                            <div className="w-72 bg-white border border-slate-100 rounded-3xl shadow-2xl p-4 ring-1 ring-slate-100 mt-2">
                                                <div className="space-y-1">
                                                    <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-2">Sympathy Collection</div>
                                                    {syItems.map((sub, i) => (
                                                        <a key={sub.id} href="#" className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-brand-secondary text-sm font-bold text-slate-600 transition-all group/item">
                                                            <span>{sub.name}</span>
                                                            <IconArrowNarrowRight size={16} className="text-brand-primary opacity-0 group-hover/item:opacity-100 transition-all" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400">
                                <IconSearch size={18} />
                            </div>
                            <div className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold shadow-lg shadow-slate-200">
                                Cart (0)
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

        {/* BOTTOM SECTION: Nested Drag & Drop Manager */}
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-xs font-black text-brand-primary uppercase tracking-[4px]">Menu Reorder System</h2>
                </div>
                
                {hasChanged && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3">
                         <button onClick={handleReset} className="flex items-center gap-2 px-5 py-2.5 text-slate-400 hover:text-slate-600 font-bold text-xs transition-colors">
                            <IconRestore size={18} />
                            Discard Changes
                        </button>
                         <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all">
                            <IconDeviceFloppy size={18} />
                            Save All Changes
                        </button>
                    </motion.div>
                )}
            </div>

            <Reorder.Group axis="y" values={menus} onReorder={handleReorderMenus} className="space-y-4">
                {menus.map((item) => (
                    <Reorder.Item 
                        key={item.id} 
                        value={item}
                        className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
                    >
                        <div className="flex items-center gap-6 mb-2">
                             {/* MAIN GRIP */}
                            <div className="text-slate-200 group-hover:text-brand-primary cursor-grab active:cursor-grabbing transition-colors">
                                <IconGripVertical size={24} />
                            </div>
                            
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-inner">
                                {item.id === 1 && <IconLayoutDashboard size={20} />}
                                {item.id === 2 && <IconCandy size={20} />}
                                {item.id === 3 && <IconFlower size={20} />}
                                {item.id === 4 && <IconConfetti size={20} />}
                                {item.id === 5 && <IconMoodSad size={20} />}
                                {item.id === 6 && <IconCalendarStar size={20} />}
                                {item.id === 7 && <IconGift size={20} />}
                            </div>
                            
                            <div className="flex-1">
                                <h4 className="text-lg font-black text-slate-800 tracking-tight">{item.name}</h4>
                                <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>{item.type}</span>
                                    {item.id === 5 && <span className="text-brand-primary">• Drag Sub-items Below</span>}
                                </div>
                            </div>
                        </div>

                        {/* DRAGGABLE INNER SUBMENU - ONLY FOR SYMPATHY */}
                        {item.id === 5 && (
                            <div className="mt-8 ml-20 pl-8 border-l-2 border-dashed border-slate-100 space-y-2 relative">
                                <Reorder.Group axis="y" values={syItems} onReorder={handleReorderSubItems} className="space-y-2">
                                    {syItems.map((sub) => (
                                        <Reorder.Item 
                                            key={sub.id} 
                                            value={sub}
                                            className="flex items-center justify-between py-3 px-4 bg-slate-50 hover:bg-brand-secondary/50 rounded-2xl cursor-grab active:cursor-grabbing transition-all border border-transparent hover:border-brand-primary/10 group/sub"
                                        >
                                            <div className="flex items-center gap-3">
                                                <IconGridDots size={16} className="text-slate-300 group-hover/sub:text-brand-primary transition-colors" />
                                                <span className="text-sm font-bold text-slate-700">{sub.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover/sub:opacity-100 transition-all">
                                                <button className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-brand-primary hover:bg-white rounded-lg transition-all"><IconEdit size={14} /></button>
                                                <button className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-white rounded-lg transition-all"><IconTrash size={14} /></button>
                                            </div>
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                                
                                <button className="flex items-center gap-2 mx-4 mt-4 text-[10px] font-black text-brand-primary/60 hover:text-brand-primary uppercase tracking-[2px] transition-all">
                                    <IconPlus size={14} />
                                    Add Link Item
                                </button>
                            </div>
                        )}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MenuOverview;
