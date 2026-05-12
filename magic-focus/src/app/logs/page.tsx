"use client";
import React, { useState } from "react";
import { Sidebar } from "@/src/Components/Dashboard/Sidebar";
import { TopHeader } from "@/src/Components/Dashboard/TopHeader";
import { useSalesStore } from "@/src/Store/useSalesStore";
import { ShieldAlert, Search, Terminal, Clock, Trash2 } from "lucide-react";

export default function LogsPage() {
  const { logs, addLog } = useSalesStore(); // بنجيب السجلات من الـ Store
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // الفلترة المتقدمة (البحث والنوع)
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-[#00FF41] overflow-hidden font-mono">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 custom-scrollbar">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <Terminal size={28} /> SYSTEM_LOG_OBSERVER_V1.0
              </h1>
              <p className="text-gray-500 font-sans text-sm mt-1">Real-time system activity & security monitoring</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] animate-pulse">● SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Controls: Search & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search encrypted logs..." 
                className="w-full bg-[#111] border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#00FF41]/50 text-white transition-all shadow-inner"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="bg-[#111] border border-white/10 rounded-2xl px-4 py-3 outline-none text-white font-bold"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">ALL_EVENTS</option>
              <option value="info">INFO_ONLY</option>
              <option value="warning">WARNINGS</option>
              <option value="error">CRITICAL_ERRORS</option>
            </select>
          </div>

          {/* Terminal Window */}
          <div className="bg-black border border-[#00FF41]/20 rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.05)] relative group">
            {/* Terminal Header */}
            <div className="bg-[#111] p-4 flex justify-between items-center border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
              </div>
              <span className="text-[10px] text-gray-600 tracking-widest uppercase">Console / Root / Activity</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 h-[500px] overflow-y-auto custom-scrollbar space-y-2 text-sm leading-relaxed">
              {filteredLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-50 italic">
                  <ShieldAlert size={48} className="mb-4" />
                  <p>NO_DATA_STREAM_FOUND</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div key={log.id} className="group/line flex gap-4 hover:bg-[#00FF41]/5 p-1 rounded transition-colors border-l-2 border-transparent hover:border-[#00FF41]">
                    <span className="text-[#00FF41]/40 shrink-0 select-none">[{log.timestamp.split(',')[1]}]</span>
                    <span className={`font-bold shrink-0 uppercase ${
                      log.type === 'error' ? 'text-red-500' : 
                      log.type === 'warning' ? 'text-yellow-500' : 'text-[#00FF41]'
                    }`}>
                      {`> ${log.action}:`}
                    </span>
                    <span className="text-gray-300 font-sans tracking-wide">{log.details}</span>
                  </div>
                ))
              )}
              <div className="animate-pulse inline-block w-2 h-5 bg-[#00FF41] ml-2 translate-y-1"></div>
            </div>
          </div>

          <p className="text-[10px] text-gray-600 text-center font-sans">
            CONFIDENTIAL DATA - FOR SYSTEM ADMINISTRATOR USE ONLY
          </p>
        </div>
      </main>
    </div>
  );
}