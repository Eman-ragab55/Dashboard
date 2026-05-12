"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; 
import { useSalesStore } from "@/src/Store/useSalesStore";
import { ChevronDown, LogIn, UserPlus, LogOut, ShoppingCart } from "lucide-react";

interface TopHeaderProps {
  title?: string;
}

export const TopHeader = ({ title }: TopHeaderProps) => {
  const router = useRouter();
  const { isLoggedIn, user, logout, cart } = useSalesStore();

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-[#0A0A0A]/50 backdrop-blur-md border-b border-white/5 w-full z-50">
      <div className="flex items-center gap-4">
        <div 
          className="text-white font-black italic tracking-tighter text-xl cursor-pointer" 
          onClick={() => router.push("/")}
        >
          SALES<span className="text-purple-500">PRO</span>
        </div>
        
        {title && (
          <>
            <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block" />
            <h1 className="text-gray-400 text-sm font-medium hidden md:block">{title}</h1>
          </>
        )}
      </div>

      <div className="flex items-center gap-6">
        <Link 
          href="/cart" 
          className="relative cursor-pointer group p-2 hover:bg-white/5 rounded-xl transition-all"
        >
          <ShoppingCart size={20} className="text-gray-400 group-hover:text-purple-500" />
          
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0A0A0A] animate-in zoom-in duration-300">
              {cart.length}
            </span>
          )}
        </Link>

        {isLoggedIn ? (
          <div className="relative group">
            <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-white/5 transition-all">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-purple-500/50 relative">
                <Image 
                  src={user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Eman"} 
                  alt="User profile" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] font-bold text-white">{user?.username || "Admin"}</p>
                <p className="text-[8px] text-purple-400 font-black uppercase">Verified Admin</p>
              </div>
              <ChevronDown size={14} className="text-gray-500" />
            </div>

            <div className="absolute right-0 top-full mt-2 w-48 bg-[#111] border border-white/10 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl">
              <button 
                onClick={() => router.push("/profile")} 
                className="w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                Profile Settings
              </button>
              <button 
                onClick={logout} 
                className="w-full flex items-center gap-3 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/login")} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-400 hover:text-white">
              <LogIn size={16} /> Login
            </button>
            <button onClick={() => router.push("/register")} className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-purple-600 text-white rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-600/20">
              <UserPlus size={16} /> Join Now
            </button>
          </div>
        )}
      </div>
    </header>
  );
};