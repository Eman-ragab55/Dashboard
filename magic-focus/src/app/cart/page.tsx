"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSalesStore } from "@/src/Store/useSalesStore";
import { Sidebar } from "@/src/Components/Dashboard/Sidebar";
import { TopHeader } from "@/src/Components/Dashboard/TopHeader";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

// تعريف الواجهة لضمان توافق البيانات - جعلنا الـ quantity أساسية هنا للعمليات الحسابية
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number; 
}

export default function CartPage() {
  const router = useRouter();
  
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    addOrder, 
    addCustomer, 
    addLog 
  } = useSalesStore();

  const [isClient, setIsClient] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { subtotal, shipping, total } = useMemo(() => {
    const sub = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const ship = cart.length > 0 ? 15.00 : 0;
    return {
      subtotal: sub,
      shipping: ship,
      total: sub + ship
    };
  }, [cart]);

  if (!isClient) return null;

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const randomId = Math.floor(Math.random() * 1000);
      
      const newCustomer = {
        id: randomId,
        username: `Guest_${randomId}`,
        email: `guest${randomId}@salespro.com`,
        phone: "000-000-0000", 
        address: { 
          city: "Cairo",
          street: "Main St",
          number: 1,
          zipcode: "12345"
        },
        name: {
          firstname: "Guest",
          lastname: "User"
        }
      };

      const newOrder = {
        id: Math.floor(Math.random() * 90000) + 10000,
        userId: randomId, 
        date: new Date().toISOString(),
        // تحويل المنتجات للشكل الذي يتوقعه الـ Store (productId)
        products: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity || 1
        })),
        total: total.toFixed(2),
        status: "Success" as const 
      };

      try {
        addCustomer(newCustomer);
        addOrder(newOrder); 
        
        addLog(
          "Order Processed", 
          `New order #ORD-${newOrder.id} confirmed for $${newOrder.total}`, 
          'info'
        );

        toast.success("Transaction Successful!", {
          description: `Order #ORD-${newOrder.id} has been saved.`,
        });

        clearCart();
        router.push("/orders");
      } catch (error) {
        toast.error("Process Failed");
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopHeader title="Your Shopping Cart" />
        
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
          
          <button 
            onClick={() => router.push("/products")} 
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-all group w-fit text-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Shopping
          </button>
          
          <h1 className="text-4xl font-black tracking-tight uppercase italic">Cart Details</h1>

          {cart.length === 0 ? (
            <div className="text-center py-24 bg-[#111]/30 rounded-4xl border border-dashed border-white/10 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={40} className="text-gray-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-400">Your cart is feeling light</h2>
              <button 
                onClick={() => router.push("/products")} 
                className="mt-8 px-10 py-4 bg-purple-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              
              <div className="xl:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-[#111] p-6 rounded-4xl border border-white/5 gap-6 hover:border-purple-500/20 transition-all group relative overflow-hidden">
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="w-24 h-24 bg-black/40 rounded-2xl p-4 flex items-center justify-center border border-white/5 shrink-0">
                        <img src={item.image} alt={item.title} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg leading-tight truncate">{item.title}</h3>
                        <p className="text-purple-500 font-black mt-1 text-sm">${item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-xl border border-white/10">
                        <button onClick={() => updateQuantity(item.id, "decrease")} className="text-gray-500 hover:text-white transition-colors"><Minus size={14} /></button>
                        <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item.id, "increase")} className="text-gray-400 hover:text-white transition-colors"><Plus size={14} /></button>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <p className="font-black text-xl text-white min-w-25 text-right">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="p-3 bg-red-500/5 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#111] p-8 rounded-4xl border border-white/5 h-fit sticky top-6 shadow-2xl">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <CreditCard size={20} className="text-purple-500" /> Checkout Details
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Shipping</span>
                    <span className="text-white font-bold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/5 my-2" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-400 text-sm">Total Amount</span>
                    <span className="text-3xl font-black text-purple-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout} 
                  disabled={isProcessing}
                  className="w-full py-5 bg-purple-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isProcessing ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : "Complete Order"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}