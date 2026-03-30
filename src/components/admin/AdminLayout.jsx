import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-60 mt-16 p-8 min-h-[calc(100vh-64px)] overflow-auto animate-fade-in no-scrollbar transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
