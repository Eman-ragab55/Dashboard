"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; 
import { useSalesStore } from "@/src/Store/useSalesStore";
import { ChevronDown, LogIn, UserPlus, LogOut, ShoppingCart } from "lucide-react";

// تعريف الـ Interface بشكل صحيح لضمان قبول الـ title كـ Prop اختيارية
interface TopHeaderProps {
  title?: string;
}

export const TopHeader = ({ title }: TopHeaderProps) => {
  const router = useRouter();
  const { isLoggedIn, user, logout, cart } = useSalesStore();

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-[#0A0A0A]/50 backdrop-blur-md border-b border-white/5 w-full z-50">
      <div className="flex items-center gap-4">
        {/* شعار SALESPRO مع توجيه للرئيسية */}
        <div 
          className="text-white font-black italic tracking-tighter text-xl cursor-pointer select-none" 
          onClick={() => router.push("/")}
        >
          SALES<span className="text-purple-500">PRO</span>
        </div>
        
        {/* عرض العنوان الديناميكي إذا وُجد */}
        {title && (
          <div className="flex items-center">
            <div className="h-6 w-[1px] bg-white/10 mx-4 hidden md:block" />
            <h1 className="text-gray-400 text-sm font-bold uppercase tracking-widest hidden md:block animate-in fade-in slide-in-from-left duration-500">
              {title}
            </h1>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* أيقونة السلة مع عداد المنتجات */}
        <Link 
          href="/cart" 
          className="relative cursor-pointer group p-2 hover:bg-white/5 rounded-xl transition-all"
        >
          <ShoppingCart size={20} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
          
          {cart && cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0A0A0A] shadow-lg animate-bounce">
              {cart.length}
            </span>
          )}
        </Link>

        {/* التحكم في حالة تسجيل الدخول */}
        {isLoggedIn ? (
          <div className="relative group">
            <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-purple-500/30 relative">
                <Image 
                  src={user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Eman"} 
                  alt="User profile" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] font-bold text-white leading-tight">{user?.username || "Admin"}</p>
                <p className="text-[8px] text-purple-400 font-black uppercase tracking-tighter">Verified Admin</p>
              </div>
              <ChevronDown size={14} className="text-gray-500 group-hover:rotate-180 transition-transform duration-300" />
            </div>

            {/* القائمة المنسدلة للبروفايل */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#111] border border-white/10 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl translate-y-2 group-hover:translate-y-0">
              <button 
                onClick={() => router.push("/profile")} 
                className="w-full text-left px-4 py-3 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
              >
                Profile Settings
              </button>
              <div className="h-[1px] bg-white/5 my-1 mx-2" />
              <button 
                onClick={logout} 
                className="w-full flex items-center gap-3 px-4 py-3 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push("/login")} 
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              <LogIn size={16} /> Login
            </button>
            <button 
              onClick={() => router.push("/register")} 
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-black bg-purple-600 text-white rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-600/20 active:scale-95 transition-all"
            >
              <UserPlus size={16} /> Join Now
            </button>
          </div>
        )}
      </div>
    </header>
  );
};