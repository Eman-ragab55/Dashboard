"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 6890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

export const SalesChart = () => {
  return (
    <div className="w-full h-full min-h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Sales Analytics</h3>
          <p className="text-xs text-gray-500 font-medium">Weekly revenue performance</p>
        </div>
        <select className="bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-gray-400 rounded-xl px-4 py-2 outline-none focus:border-purple-500/50 transition-all cursor-pointer">
          <option className="bg-[#1a1a1a]">Last 7 Days</option>
          <option className="bg-[#1a1a1a]">Last Month</option>
        </select>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "15px", fontSize: "12px" }}
              itemStyle={{ color: "#8b5cf6" }}
              cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#8b5cf6" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorSales)" 
              animationDuration={2000}
            />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#555', fontSize: 11, fontWeight: 'bold' }} 
              dy={15}
            />
            <YAxis hide domain={['auto', 'auto']} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};