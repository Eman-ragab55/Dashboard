"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSalesStore } from "@/src/Store/useSalesStore";
import { Button } from "@/src/Components/Ui/Button";
import { Mail, Lock, User } from "lucide-react"; // شيلنا Github من هنا
export default function RegisterPage() {
  const login = useSalesStore((state) => state.login);
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleAction = () => {
    // محاكاة تسجيل ناجح
    login({ 
      name: formData.name || "New User", 
      email: formData.email, 
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" 
    });
    router.push("/");
  };

  return (
    <div className="h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-[#111] p-10 rounded-3xl border border-white/5 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-black text-white italic">SalesPro</h2>
          <p className="text-gray-500 mt-2">Join us to manage your store</p>
        </div>

        {/* أزرار التواصل الاجتماعي */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleAction} className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold">
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" /> Google
          </button>
          <button onClick={handleAction} className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold">
             <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" /> Facebook
          </button>
        </div>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <span className="relative bg-[#111] px-4 text-[10px] text-gray-600 uppercase font-black block text-center">Or use email</span>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAction(); }}>
          <div className="relative">
            <User className="absolute left-4 top-4 text-gray-600" size={18} />
            <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-purple-500 text-sm" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-600" size={18} />
            <input required type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-purple-500 text-sm" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-600" size={18} />
            <input required type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-purple-500 text-sm" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <Button type="submit" className="w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-purple-600/20">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}