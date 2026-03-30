import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  IconPlus, 
  IconSearch, 
  IconFilter, 
  IconDownload, 
  IconEdit, 
  IconTrash, 
  IconFlower,
  IconDotsVertical,
  IconChevronLeft,
  IconChevronRight
} from "@tabler/icons-react";

const initialProducts = [
  { id: 1, name: "Velvet Red Roses", category: "Roses", price: "$45.00", stock: 24, status: "In Stock", image: "https://images.unsplash.com/photo-1548678967-f1ecd5039a47?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: 2, name: "Midnight Tulip Bouquet", category: "Spring", price: "$32.99", stock: 12, status: "Low Stock", image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: 3, name: "Spring Sunshine Mix", category: "Birthday", price: "$38.00", stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1582236353380-04470d0505cd?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: 4, name: "Graceful Lily Vase", category: "Anniversary", price: "$52.50", stock: 18, status: "In Stock", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: 5, name: "Enchanted Orchid Garden", category: "Exotic", price: "$65.00", stock: 8, status: "In Stock", image: "https://images.unsplash.com/photo-1567606117528-5696d3625f3c?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: 6, name: "Classic White Daisy", category: "Classic", price: "$28.00", stock: 42, status: "In Stock", image: "https://images.unsplash.com/photo-1502736842968-bcaec719241e?q=80&w=200&h=200&auto=format&fit=crop" },
];

const ProductManagement = () => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif">Product Inventory</h1>
          <p className="text-slate-500 mt-1">Manage your flower collection and stock levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <IconDownload size={18} />
            Export List
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-xl font-bold text-sm hover:bg-violet-800 transition-all shadow-lg shadow-violet-200">
            <IconPlus size={18} />
            Add New Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          {/* Table Toolbar */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                      <IconSearch size={18} />
                  </div>
                  <input 
                      type="text" 
                      placeholder="Search flowers by name, category..." 
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white focus:border-brand-primary/30 transition-all text-sm" 
                  />
              </div>
              <div className="flex items-center gap-2">
                  <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                      <IconFilter size={20} />
                  </button>
                  <div className="h-6 w-px bg-slate-200 mx-1" />
                  <p className="text-sm font-semibold text-slate-500">
                      Showing <span className="text-slate-900">{products.length}</span> products
                  </p>
              </div>
          </div>

          <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                      <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                          <th className="px-6 py-4">Product Info</th>
                          <th className="px-6 py-4">Category</th>
                          <th className="px-6 py-4">Price</th>
                          <th className="px-6 py-4">Stock</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                      {products.map((product) => (
                          <tr key={product.id} className="group hover:bg-brand-secondary/30 transition-colors">
                              <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                          <p className="font-bold text-slate-800 text-sm">{product.name}</p>
                                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: PRD-{1000 + product.id}</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="px-6 py-4">
                                  <span className="text-sm text-slate-600 font-medium">{product.category}</span>
                              </td>
                              <td className="px-6 py-4 font-bold text-slate-900">{product.price}</td>
                              <td className="px-6 py-4 text-sm text-slate-600">{product.stock} pcs</td>
                              <td className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                      product.status === "In Stock" ? "bg-green-100 text-green-600" :
                                      product.status === "Low Stock" ? "bg-amber-100 text-amber-600" :
                                      "bg-red-100 text-red-600"
                                  }`}>
                                      {product.status}
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                      <button className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all transform active:scale-90" title="Edit">
                                          <IconEdit size={18} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all transform active:scale-90" title="Delete">
                                          <IconTrash size={18} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all transform active:scale-90">
                                          <IconDotsVertical size={18} />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <button className="flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors disabled:opacity-30" disabled>
                  <IconChevronLeft size={18} />
                  Previous
              </button>
              <div className="flex items-center gap-1">
                  {[1, 2, 3].map(num => (
                      <button key={num} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${num === 1 ? "bg-brand-primary text-white shadow-md shadow-violet-200" : "text-slate-500 hover:bg-slate-200"}`}>
                          {num}
                      </button>
                  ))}
              </div>
              <button className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-brand-primary transition-colors">
                  Next
                  <IconChevronRight size={18} />
              </button>
          </div>
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;
