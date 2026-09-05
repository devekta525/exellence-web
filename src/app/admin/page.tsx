"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, TrendingUp, Activity, MousePointerClick } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (!auth) {
      router.replace("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return null;

  const stats = [
    { label: "Total Leads", value: "0", icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
    { label: "Conversion Rate", value: "0%", icon: TrendingUp, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10 border-fuchsia-500/20" },
    { label: "Active Campaigns", value: "0", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "Total Clicks", value: "0", icon: MousePointerClick, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-white mb-2">Welcome Back, Admin</h1>
        <p className="text-slate-400">Here's what's happening with your growth campaigns today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`p-6 rounded-2xl border bg-[#0a0f1c]/50 backdrop-blur-sm ${stat.bg} shadow-lg flex items-center justify-between`}>
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-xl ${stat.bg.split(' ')[0]}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0f1c]/80 border border-white/5 p-6 rounded-3xl h-96 flex items-center justify-center">
          <p className="text-slate-500">Lead Conversion Chart Area (Coming Soon)</p>
        </div>
        <div className="bg-[#0a0f1c]/80 border border-white/5 p-6 rounded-3xl h-96 flex items-center justify-center">
          <p className="text-slate-500">Recent Activity Area (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
}
