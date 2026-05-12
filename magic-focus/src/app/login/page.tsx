"use client";
import { useState } from "react";
import { useSalesStore } from "@/src/Store/useSalesStore";
import { useRouter } from "next/navigation";
import { Button } from "@/src/Components/Ui/Button";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const login = useSalesStore((state) => state.login);
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // محاكاة تسجيل الدخول ببيانات متوافقة مع الـ User Interface
    if (email && password) {
      login({ 
        username: "Eman Ragab", // غيرناها من name لـ username عشان تطابق الـ Store
        email: email, 
        password: password, // إضافة الباسورد لتجنب نقص الخصائص
      });
      router.push("/");
    }
  };

  return (
    <div className="h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="bg-[#111] p-10 rounded-3xl border border-white/5 w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl font-bold italic shadow-lg shadow-purple-600/20">S</div>
          <h1 className="text-2xl font-black text-white italic">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-2">Enter your details to access your store</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                type="email" 
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-purple-500/50 transition-all text-sm text-white"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                required
                type="password" 
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-purple-500/50 transition-all text-sm text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-7 rounded-2xl font-bold text-sm mt-4">
            <LogIn size={18} className="mr-2" /> Login to Dashboard
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            {/* الحل: استبدلنا حرف ' بالكود &apos; لمنع خطأ الـ Lint */}
            Don&apos;t have an account? 
            <Link href="/register" className="text-purple-500 font-bold ml-2 hover:underline inline-flex items-center">
              Create Account <UserPlus size={14} className="ml-1" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}