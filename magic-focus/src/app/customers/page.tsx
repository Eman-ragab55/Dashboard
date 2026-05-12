"use client";
import React, { useEffect, useState } from "react";
import { useSalesStore } from "@/src/Store/useSalesStore";
import { Sidebar } from "@/src/Components/Dashboard/Sidebar";
import { TopHeader } from "@/src/Components/Dashboard/TopHeader";
import { Mail, MapPin, Phone, Trash2, Search, UserPlus } from "lucide-react";

export default function CustomersPage() {
  const { customers, fetchDashboardData, loading } = useSalesStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // الحل لمنع الـ Cascading Renders
    const handle = requestAnimationFrame(() => {
      setIsClient(true);
    });

    if (customers.length === 0) {
      fetchDashboardData();
    }

    return () => cancelAnimationFrame(handle);
  }, [customers.length, fetchDashboardData]);

  // تصفية العملاء بناءً على البحث
  const filteredCustomers = customers.filter((customer) =>
    customer.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isClient) return null;

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopHeader title="Customer Management" />
        
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-4xl font-black tracking-tight uppercase italic">Customer Base</h1>
              <p className="text-gray-500 mt-2 font-medium">Manage and monitor your registered users</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#111] border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:border-purple-500/50 outline-none transition-all text-sm font-medium"
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 p-3.5 rounded-2xl transition-all shadow-lg shadow-purple-600/20 active:scale-95">
                <UserPlus size={20} />
              </button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
            <div className="bg-[#111] p-6 rounded-4xl border border-white/5 hover:border-purple-500/10 transition-all group">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest group-hover:text-purple-500 transition-colors">Total Customers</p>
              <p className="text-3xl font-black mt-2 text-white">{customers.length}</p>
            </div>
            <div className="bg-[#111] p-6 rounded-4xl border border-white/5 hover:border-green-500/10 transition-all group">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest group-hover:text-green-500 transition-colors">Growth Rate</p>
              <p className="text-3xl font-black mt-2 text-green-500">+{Math.floor(customers.length / 3)}%</p>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-[#111] rounded-4xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] text-gray-400 text-xs uppercase tracking-widest">
                    <th className="p-6 font-black">User Profile</th>
                    <th className="p-6 font-black">Contact Info</th>
                    <th className="p-6 font-black">Location</th>
                    <th className="p-6 font-black text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="p-24 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Accessing Directory...</p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-white/[0.01] transition-all group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/5 flex items-center justify-center font-black text-lg text-purple-500 group-hover:scale-110 transition-transform">
                              {customer.username?.[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-white capitalize group-hover:text-purple-400 transition-colors">{customer.username}</p>
                              <p className="text-[10px] text-gray-600 font-black uppercase tracking-tighter">#USR-{customer.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Mail size={14} className="text-purple-500/50" /> {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                            <Phone size={14} /> {customer.phone || "+20 123 456 789"}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin size={14} className="text-gray-600" /> 
                            <span className="capitalize">{customer.address?.city || "New York, USA"}</span>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <button className="p-3 bg-red-500/5 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 active:scale-90">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-gray-600 italic font-medium">
                        No customers found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}