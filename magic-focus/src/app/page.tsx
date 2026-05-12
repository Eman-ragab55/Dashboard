"use client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/src/Components/Dashboard/Sidebar";
import { StatsGrid } from "@/src/Components/Dashboard/StatsGrid";
import { RecentSales } from "@/src/Components/Dashboard/RecentSales";
import { SalesChart } from "@/src/Components/Dashboard/SalesChart";
import { TopHeader } from "@/src/Components/Dashboard/TopHeader";
import { SkeletonLoader } from "@/src/Components/Dashboard/SkeletonLoader";
import { useSalesStore } from "@/src/Store/useSalesStore";

export default function DashboardPage() {
  const { fetchDashboardData, products, loading } = useSalesStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // حل مشكلة الـ Cascading Renders باستخدام requestAnimationFrame
    const handle = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    if (products.length === 0) {
      fetchDashboardData();
    }

    return () => cancelAnimationFrame(handle);
  }, [fetchDashboardData, products.length]);

  if (!isMounted) return null; 

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* دلوقتي الـ TopHeader هيقبل العنوان عادي من غير Errors */}
        <TopHeader title="Admin Dashboard" />

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10 custom-scrollbar">
          
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {/* Welcome Section */}
              <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-in fade-in duration-700">
                <div className="space-y-1">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">Overview</h2>
                  <p className="text-gray-500 text-sm font-medium">
                    Welcome back! Your store is performing <span className="text-purple-500 font-bold italic">excellently</span> today.
                  </p>
                </div>
                <div className="flex gap-3">
                   <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all active:scale-95">
                     Download Report
                   </button>
                   <button className="px-5 py-2.5 bg-purple-600 rounded-xl text-xs font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 active:scale-95">
                     Manage Store
                   </button>
                </div>
              </section>

              {/* 1. Statistics Grid */}
              <StatsGrid />

              {/* 2. Main Analytics & Promo Section */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-[#111] p-8 rounded-4xl border border-white/5 hover:border-white/10 transition-all shadow-2xl">
                  <SalesChart />
                </div>
                
                {/* Upgrade Card */}
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/5 rounded-4xl border border-purple-500/10 p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-[60px] -mr-16 -mt-16 group-hover:bg-purple-600/40 transition-all duration-700" />
                  
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-3xl mb-8 border border-white/10 backdrop-blur-xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    🚀
                  </div>
                  
                  <h4 className="font-black text-2xl mb-4 tracking-tight">Go Professional</h4>
                  <p className="text-gray-400 text-sm mb-10 leading-relaxed font-medium">
                    Unlock AI-powered insights, custom reporting, and priority 24/7 support.
                  </p>
                  
                  <button className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-purple-500 hover:text-white transition-all shadow-xl active:scale-95">
                    Upgrade Now - $15/mo
                  </button>
                </div>
              </div>

              {/* 3. Transactions Section */}
              <div className="w-full pb-10">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-2xl font-black flex items-center gap-3">
                      <span className="w-3 h-3 bg-purple-500 rounded-full animate-ping"></span>
                      Recent Sales
                   </h3>
                   <button className="text-purple-500 text-xs font-bold hover:underline underline-offset-4">
                     View All Transactions
                   </button>
                </div>
                <div className="bg-[#111] rounded-4xl border border-white/5 overflow-hidden shadow-2xl">
                   <RecentSales />
                </div>
              </div>
            </>
          )}
          
        </div>
      </main>
    </div>
  );
}