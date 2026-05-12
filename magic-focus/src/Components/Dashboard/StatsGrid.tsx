"use client";
import React from "react";
import { useSalesStore, Order } from "@/src/Store/useSalesStore"; // استيراد الـ Order type
import { Card, CardContent } from "../Ui/Card";
import { Badge } from "../Ui/Badge";
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";

export const StatsGrid = () => {
  const { products, orders, customers } = useSalesStore();

  // حسابات حقيقية من بيانات الـ API والـ Store
  const totalProducts = products.length;
  
  // تعديل الـ reduce ليكون أكثر أماناً مع الـ Types
  const totalRevenue = orders.reduce((acc, curr: Order) => {
    const amount = typeof curr.total === 'string' ? parseFloat(curr.total) : (curr.total || 0);
    return acc + amount;
  }, 0);

  const avgOrderValue = orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : "0.00";

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: <DollarSign size={18} />,
      trend: "+12.5%",
      trendUp: true,
      color: "bg-green-500"
    },
    {
      label: "Inventory",
      value: totalProducts.toString(),
      icon: <Package size={18} />,
      trend: "Live",
      trendUp: true,
      color: "bg-purple-500"
    },
    {
      label: "Avg Order",
      value: `$${avgOrderValue}`,
      icon: <TrendingUp size={18} />,
      trend: "+5.2%",
      trendUp: true,
      color: "bg-blue-500"
    },
    {
      label: "Customers",
      value: customers.length.toLocaleString(),
      icon: <Users size={18} />,
      trend: "-1.4%",
      trendUp: false,
      color: "bg-red-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="group hover:border-purple-500/40 transition-all duration-500 bg-[#111] border-white/5 rounded-[2rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 blur-[40px] -mr-12 -mt-12 group-hover:bg-purple-600/10 transition-all" />
          
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-5">
              <div className="p-3 bg-white/5 rounded-2xl text-purple-400 border border-white/5 group-hover:scale-110 group-hover:text-white group-hover:bg-purple-600 transition-all duration-500">
                {stat.icon}
              </div>
              <Badge variant={stat.trendUp ? "success" : "error"}>
                <div className="flex items-center gap-1 text-[10px] font-bold">
                  {stat.trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {stat.trend}
                </div>
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-white tracking-tighter">
                {stat.value}
              </h3>
            </div>

            <div className="mt-4 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all duration-1000 ${stat.trendUp ? 'bg-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'bg-red-500/50'}`} 
                 style={{ width: stat.trendUp ? '70%' : '30%' }}
               />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};