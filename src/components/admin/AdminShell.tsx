"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If on the login page, just render the children without the sidebar and header
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="h-screen bg-[#020617] text-white flex overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col h-screen relative">
        {/* Top Header */}
        <header className="h-16 bg-[#0a0f1c]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
           <h2 className="text-xl font-bold font-outfit uppercase lg:hidden">
            Dviora<span className="text-cyan-400">.Admin</span>
          </h2>
          <div className="hidden lg:block text-slate-400 font-medium">
            Dashboard
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative group ml-auto">
            <button className="flex items-center gap-3 focus:outline-none">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-slate-400">admin@dviora.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold uppercase overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=Admin+User&background=0D9488&color=fff`} alt="Admin" className="w-full h-full object-cover" />
              </div>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-[#0a0f1c] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => {
                    sessionStorage.removeItem("adminAuth");
                    window.location.href = "/admin/login";
                  }}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {/* Background glowing gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
