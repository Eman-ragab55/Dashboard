"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSalesStore } from "@/src/Store/useSalesStore";
import { Sidebar } from "@/src/Components/Dashboard/Sidebar";
import { TopHeader } from "@/src/Components/Dashboard/TopHeader";
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Tag, Check } from "lucide-react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, fetchDashboardData, addToCart, cart } = useSalesStore();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (products.length === 0) {
        await fetchDashboardData();
      }
      setDataLoaded(true);
    };
    init();
  }, [products.length, fetchDashboardData]);

  const product = products.find((p) => p.id === Number(id));
  const isInCart = cart.some((item) => item.id === product?.id);

  if (!dataLoaded) {
    return <div className="h-screen bg-[#0A0A0A] flex items-center justify-center text-white italic animate-pulse">Loading Product Details...</div>;
  }

  if (!product) {
    return (
      <div className="h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <button onClick={() => router.push('/products')} className="bg-purple-600 px-6 py-2 rounded-xl">Back to Products</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-white mb-10 transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1" />
            Back to Inventory
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-[#111] rounded-[3rem] p-16 border border-white/5 flex items-center justify-center shadow-2xl relative group">
              <div className="absolute inset-0 bg-purple-500/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src={product.image} alt={product.title} className="max-h-[400px] object-contain relative z-10" />
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-[10px] font-black tracking-widest border border-purple-500/20 uppercase">
                  {product.category}
                </span>
                <h1 className="text-5xl font-black tracking-tighter">{product.title}</h1>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" /> <span className="text-white font-bold">4.9</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <ShieldCheck size={18} /> <span>Authentic Product</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#111]/50 p-6 rounded-2xl border border-white/5">
                <p className="text-gray-400 leading-relaxed italic">
                  {product.description || "Premium quality product designed for modern lifestyle needs."}
                </p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-black text-purple-500">${product.price}</span>
              </div>

              <div className="flex gap-4 pt-6">
                {/* زرار الـ Checkout ينقلنا لصفحة الكارت */}
                <button 
                  onClick={() => router.push("/cart")}
                  className="flex-1 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-purple-50 transition-all active:scale-[0.98]"
                >
                  Checkout Now
                </button>
                
                {/* زرار إضافة للكارت */}
                <button 
                  onClick={() => addToCart(product)}
                  className={`p-5 rounded-2xl border transition-all ${
                    isInCart 
                      ? "bg-green-500/10 border-green-500/20 text-green-500" 
                      : "bg-purple-600/10 border-purple-500/20 text-purple-500 hover:bg-purple-600 hover:text-white"
                  }`}
                >
                  {isInCart ? <Check /> : <ShoppingCart />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}