"use client";
import React, { useEffect } from "react";
import { useSalesStore } from "@/src/Store/useSalesStore";
import { Sidebar } from "@/src/Components/Dashboard/Sidebar";
import { TopHeader } from "@/src/Components/Dashboard/TopHeader";
import { Clock, Eye, Package } from "lucide-react";

export default function OrdersPage() {
  const { orders, fetchDashboardData, loading } = useSalesStore();

  useEffect(() => {
    if (orders.length === 0) {
      fetchDashboardData();
    }
  }, [fetchDashboardData, orders.length]);

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight">Order Management</h1>
              <p className="text-gray-500 mt-2">View and track all store transactions</p>
            </div>
            <div className="bg-[#111] px-6 py-3 rounded-2xl border border-white/5 flex gap-8">
               <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Total Transactions</p>
                  <p className="text-xl font-black text-purple-500">{orders.length}</p>
               </div>
            </div>
          </div>

          <div className="bg-[#111] rounded-[2.5rem] border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                  <th className="p-6 font-bold">Order ID</th>
                  <th className="p-6 font-bold">Date</th>
                  <th className="p-6 font-bold">Total Amount</th>
                  <th className="p-6 font-bold">Status</th>
                  <th className="p-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-all group">
                    <td className="p-6 font-mono text-purple-400">#ORD-{order.id}</td>
                    <td className="p-6 text-sm text-gray-300">
                        {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-6 text-sm font-black text-white">
                      ${order.total || "0.00"}
                    </td>
                    <td className="p-6">
                      <span className={`flex items-center gap-2 w-fit px-4 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {order.status === 'Success' ? <Package size={12} /> : <Clock size={12} />}
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button className="p-2 hover:bg-purple-600 rounded-lg transition-all text-gray-400 hover:text-white" aria-label="View Order">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {loading && orders.length === 0 && (
              <div className="p-20 text-center text-gray-500 font-bold animate-pulse">
                Fetching latest orders...
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}