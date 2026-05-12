"use client";
import React from "react";
import { useSalesStore } from "@/src/Store/useSalesStore";
// استيراد مكونات الـ UI اللي عملناها
import { Card, CardHeader, CardContent } from "../Ui/Card";
import { Badge } from "../Ui/Badge";
import { Button } from "../Ui/Button";
import { MoreHorizontal, ExternalLink } from "lucide-react";

export const RecentSales = () => {
  const { products, loading } = useSalesStore();

  // حالة التحميل بشكل نظيف
  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-[400px] flex items-center justify-center text-gray-500 font-medium">
          Fetching live data from API...
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl">
      {/* استخدام CardHeader اللي عملناه */}
      <CardHeader 
        title="Inventory Snapshot" 
        subtitle="Real-time product availability and ratings from FakeStore API" 
      />
      
      <CardContent className="p-0"> {/* p-0 عشان الجدول يوصل للحواف بشكل جمالي */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-gray-500 text-[10px] uppercase font-black tracking-[0.15em]">
              <tr>
                <th className="px-8 py-5">Product Info</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Rating</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.slice(0, 6).map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-all group">
                  {/* معلومات المنتج */}
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 bg-white rounded-xl p-2 flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-200 truncate w-48 group-hover:text-purple-400 transition-colors">
                          {product.title}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">ID: #{product.id}024</span>
                      </div>
                    </div>
                  </td>

                  {/* استخدام الـ Badge اللي عملناه */}
                  <td className="px-6 py-4">
                    <Badge variant="info">
                      {product.category}
                    </Badge>
                  </td>

                  {/* السعر */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-white italic">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>

                  {/* التقييم */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-yellow-500">
                        {"★".repeat(Math.round(product.rating?.rate || 0))}
                        <span className="text-gray-700">{"★".repeat(5 - Math.round(product.rating?.rate || 0))}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">({product.rating?.count})</span>
                    </div>
                  </td>

                  {/* استخدام الـ Button اللي عملناه */}
                  <td className="px-8 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={14} className="mr-2" /> View
                    </Button>
                    <Button variant="secondary" size="sm" className="px-2">
                      <MoreHorizontal size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* تذييل الجدول */}
        <div className="p-6 border-t border-white/5 flex justify-center">
          <Button variant="ghost" className="text-xs text-gray-500 hover:text-purple-400">
            Show all inventory items
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};