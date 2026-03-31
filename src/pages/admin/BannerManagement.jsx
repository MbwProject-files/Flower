import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  IconPlus, 
  IconPhoto, 
  IconEdit, 
  IconTrash, 
  IconEye, 
  IconSearch, 
  IconGripVertical,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconArrowRight
} from "@tabler/icons-react";
import { Reorder } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const initialBanners = [
  { id: 1, title: "Summer Blossom Collection", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=400&h=200&auto=format&fit=crop", type: "Hero Slider", status: "Active" },
  { id: 2, title: "Anniversary Special Sale", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=400&h=200&auto=format&fit=crop", type: "Promo Banner", status: "Active" },
  { id: 3, title: "Grand Opening Discounts", image: "https://images.unsplash.com/photo-1548610370-950faec31483?q=80&w=400&h=200&auto=format&fit=crop", type: "Side Banner", status: "Inactive" },
];

const BannerManagement = () => {
    const [banners, setBanners] = useState(initialBanners);
    const [hasChanged, setHasChanged] = useState(false);

    const handleReorder = (newOrder) => {
        setBanners(newOrder);
        setHasChanged(true);
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 no-scrollbar pb-32">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 font-serif mb-2 tracking-tight">Banner Management</h1>
                        <p className="text-slate-500 font-medium">Control your shop's promotional displays and hero sliders.</p>
                    </div>

                    <div className="flex gap-3">
                        {hasChanged && (
                            <button 
                                onClick={() => {setHasChanged(false); alert("Sequence saved!")}}
                                className="px-6 py-3 bg-emerald-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center gap-2"
                            >
                                Save Sequence
                            </button>
                        )}
                        <button className="px-6 py-3 bg-brand-primary text-white rounded-2xl font-bold text-xs shadow-lg shadow-violet-100 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                            <IconPlus size={18} />
                            Create New Banner
                        </button>
                    </div>
                </div>

                {/* Main Table Designer */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-20">Preview & Title</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Banner Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Visibility status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Settings</th>
                                </tr>
                            </thead>
                        </table>
                        
                        <Reorder.Group axis="y" values={banners} onReorder={handleReorder} className="divide-y divide-slate-50">
                            {banners.map((banner) => (
                                <Reorder.Item 
                                    key={banner.id} 
                                    value={banner}
                                    className="group hover:bg-brand-secondary/30 transition-all duration-300 w-full flex items-center cursor-grab active:cursor-grabbing relative"
                                >
                                    <div className="flex-1 flex items-center py-4">
                                        {/* Grip handle */}
                                        <div className="pl-8 text-slate-200 group-hover:text-brand-primary transition-colors">
                                            <IconGripVertical size={24} />
                                        </div>

                                        {/* Thumbnail & Title */}
                                        <div className="flex items-center gap-6 pl-6 flex-1 min-w-[300px]">
                                            <div className="w-32 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 tracking-tight">{banner.title}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">Banner Component #0{banner.id}</p>
                                            </div>
                                        </div>

                                        {/* Type */}
                                        <div className="px-8 w-[200px] text-center">
                                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-200 shadow-sm">{banner.type}</span>
                                        </div>

                                        {/* Status */}
                                        <div className="px-8 w-[180px]">
                                            <div className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                                                banner.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                                            )}>
                                                {banner.status === "Active" ? <IconCircleCheckFilled size={14} /> : <IconCircleXFilled size={14} />}
                                                {banner.status}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="px-8 flex items-center justify-end gap-3 min-w-[180px]">
                                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-white hover:text-blue-500 hover:shadow-xl transition-all border border-transparent hover:border-blue-50">
                                                <IconEye size={18} />
                                            </button>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-white hover:text-brand-primary hover:shadow-xl transition-all border border-transparent hover:border-violet-50 focus:ring-4 focus:ring-violet-50">
                                                <IconEdit size={18} />
                                            </button>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:shadow-xl transition-all border border-transparent hover:border-red-100">
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                    
                    <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Showing {banners.length} promotional components. drag any row to redefine their priority on the homepage.</p>
                    </div>
                </div>

                {/* Preview Hint */}
                <div className="mt-12 p-8 border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 animate-bounce">
                        <IconPhoto size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-600">Homepage Sequence Preview</h3>
                    <p className="text-slate-400 text-sm max-w-md mt-2">Adjust your banners to see exactly how they will transition on your storefront. Visual simulation coming soon.</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BannerManagement;
