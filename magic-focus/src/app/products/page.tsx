"use client";
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/src/Components/Dashboard/Sidebar";
import { TopHeader } from "@/src/Components/Dashboard/TopHeader";
import { ProductCard } from "@/src/Components/Ui/ProductCard";
import { useSalesStore } from "@/src/Store/useSalesStore";
import { Search, Filter, LayoutGrid } from "lucide-react";

export default function ProductsPage() {
  const { products, loading, fetchDashboardData } = useSalesStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopHeader title="Products Inventory" />

        <div className="flex-1 overflow-y-auto p-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center bg-[#111]/50 backdrop-blur-xl p-5 rounded-4xl border border-white/5 gap-4">
            <div className="flex items-center gap-3 bg-black/40 px-5 py-3 rounded-2xl border border-white/10 w-full md:w-112">
              <Search size={18} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search premium products..." 
                className="bg-transparent border-none outline-none text-sm w-full text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 text-gray-400 transition-all">
                <Filter size={20} />
              </button>
              <button className="p-3 bg-purple-600 rounded-xl hover:bg-purple-700 text-white transition-all">
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-96 bg-white/5 animate-pulse rounded-4xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}