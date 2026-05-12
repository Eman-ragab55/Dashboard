"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image"; // استيراد مكون الصورة من Next.js
import { Eye, ShoppingCart, Star, Check } from "lucide-react";
import { useSalesStore, Product } from "@/src/Store/useSalesStore"; // استيراد الـ Product type

// استبدال any بالـ Product type المكتوب في الـ Store
export function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart } = useSalesStore();

  // التحقق إذا كان المنتج موجود مسبقاً في السلة
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="group bg-[#111] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-purple-500/30 transition-all duration-500 shadow-2xl">
      <div className="relative h-64 bg-[#0A0A0A] m-4 rounded-[2rem] overflow-hidden flex items-center justify-center p-8">
        {/* استخدام Image بدلاً من img لتحسين الأداء وتجنب تحذير الـ Lint */}
        <Image 
          src={product.image} 
          alt={product.title} 
          fill // لجعل الصورة تأخذ مساحة الـ Container
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm z-10">
          <Link href={`/products/${product.id}`} className="p-4 bg-white text-black rounded-full hover:bg-purple-500 hover:text-white transition-all">
            <Eye size={20} />
          </Link>
          
          <button 
            onClick={() => addToCart(product)}
            className={`p-4 rounded-full transition-all ${isInCart ? 'bg-green-500 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
          >
            {isInCart ? <Check size={20} /> : <ShoppingCart size={20} />}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg leading-tight truncate w-40">{product.title}</h3>
          <span className="text-purple-500 font-black">${product.price}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{product.category}</p>
          <div className="flex items-center gap-1 text-yellow-500 text-xs">
             <Star size={12} fill="currentColor" />
             <span className="text-gray-400">(4.9)</span>
          </div>
        </div>
        
        <Link href={`/products/${product.id}`} className="block w-full mt-4">
          <button className="w-full py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}