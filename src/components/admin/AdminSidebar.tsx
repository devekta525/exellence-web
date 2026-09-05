"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  MonitorPlay, 
  Briefcase, 
  LogOut, 
  Lightbulb, 
  Wrench, 
  Workflow,
  FileText
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard",      href: "/admin",              icon: LayoutDashboard },
    { name: "Leads",           href: "/admin/leads",        icon: Users },
    { name: "Hero Section",    href: "/admin/hero",         icon: MonitorPlay },
    { name: "Work (Case Studies)", href: "/admin/work",     icon: Briefcase },
    { name: "Why We Started",  href: "/admin/why-we-started", icon: Lightbulb },
    { name: "Services",        href: "/admin/services",     icon: Wrench },
    { name: "Process",         href: "/admin/process",      icon: Workflow },
    { name: "Blogs",           href: "/admin/blogs",        icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1c] border-r border-white/5 h-screen sticky top-0 flex flex-col hidden lg:flex">
      <div className="p-6 border-b border-white/5">
        <Link href="/admin">
          <h2 className="text-2xl font-bold font-outfit text-white tracking-wider uppercase">
            Dviora<span className="text-cyan-400">.Admin</span>
          </h2>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/20 to-transparent text-cyan-400 border-l-2 border-cyan-400"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-white/5">
        <Link 
          href="/admin/login"
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
