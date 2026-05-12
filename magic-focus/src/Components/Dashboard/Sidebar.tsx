"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSalesStore } from "@/src/Store/useSalesStore";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  LogOut,
  Terminal // استيراد أيقونة التيرمينال
} from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname(); 
  const router = useRouter();
  const logout = useSalesStore((state) => state.logout);

  // أضفنا System Logs هنا في مصفوفة الروابط
  const menuItems = [
    { label: "Overview", icon: <LayoutDashboard size={20}/>, href: "/" },
    { label: "Products", icon: <Package size={20}/>, href: "/products" },
    { label: "Orders", icon: <ShoppingCart size={20}/>, href: "/orders" },
    { label: "Customers", icon: <Users size={20}/>, href: "/customers" },
    { label: "System Logs", icon: <Terminal size={20}/>, href: "/logs" }, // الزرار الجديد
  ];

  const handleLogout = () => {
    logout(); 
    router.push("/login"); 
  };

  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col h-screen p-6 z-20">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-purple-600/20">S</div>
        <span className="font-bold text-xl text-white tracking-tighter">SALES<span className="text-purple-500">PRO</span></span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          // تمييز لون زرار الـ Logs باللون الأخضر لو هو اللي شغال
          const activeClass = item.href === "/logs" 
            ? "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
            : "bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]";

          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                isActive 
                ? activeClass 
                : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <span className={`${
                isActive 
                ? (item.href === "/logs" ? "text-green-400" : "text-purple-400") 
                : "group-hover:text-gray-200"
              }`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="pt-6 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-red-400 transition-all w-full group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-sm font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
};