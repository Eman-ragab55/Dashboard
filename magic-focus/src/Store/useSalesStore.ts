"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// --- التعريفات (Interfaces) ---

interface ActivityLog {
  id: number;
  timestamp: string;
  action: string;
  details: string;
  type: 'info' | 'warning' | 'error';
}

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  quantity?: number;
}

export interface User {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  image?: string;
}

// تعريف دقيق لمحتويات الطلب بدل استخدام any
interface OrderProduct {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  date: string;
  products: OrderProduct[]; // تم استبدال any بـ OrderProduct[]
  total?: string | number;
  status?: 'Success' | 'Pending' | string;
}

// src/Store/useSalesStore.ts

interface Customer {
  id: number;
  username: string;
  email: string;
  phone?: string; // أضيفي السطر ده
  address?: {     // وأضيفي الأوبجكت ده
    city: string;
    street?: string;
  };
  name?: {
    firstname: string;
    lastname: string;
  };
}


interface SalesState {
  isLoggedIn: boolean;
  user: User | null;
  products: Product[];
  customers: Customer[];
  orders: Order[];
  cart: Product[];
  logs: ActivityLog[];
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  fetchDashboardData: () => Promise<void>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, action: "increase" | "decrease") => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  addCustomer: (customer: Customer) => void;
  addLog: (action: string, details: string, type: 'info' | 'warning' | 'error') => void;
}

// --- بناء الـ Store ---

export const useSalesStore = create<SalesState>()(
  persist(
    (set, get) => ({
      isLoggedIn: !!Cookies.get("user_session"),
      user: Cookies.get("user_session") ? JSON.parse(Cookies.get("user_session")!) : null,
      products: [],
      customers: [],
      orders: [],
      cart: [],
      logs: [],
      loading: false,

      login: (userData: User) => {
        Cookies.set("user_session", JSON.stringify(userData), { expires: 7 });
        set({ isLoggedIn: true, user: userData });
        get().addLog("Login Success", `User ${userData.username || 'admin'} logged in`, 'info');
      },

      logout: () => {
        Cookies.remove("user_session");
        get().addLog("Logout", "User logged out of the system", 'warning');
        set({ isLoggedIn: false, user: null });
      },

      addLog: (action, details, type) => {
        const newLog: ActivityLog = {
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          action,
          details,
          type,
        };
        set((state) => ({ logs: [newLog, ...state.logs].slice(0, 50) }));
      },

      addToCart: (product: Product) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id);
          get().addLog("Cart Update", `Added ${product.title} to cart`, 'info');
          if (existingProduct) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (productId: number) =>
        set((state) => {
          const product = state.cart.find(p => p.id === productId);
          if (product) {
            get().addLog("Cart Update", `Removed ${product.title} from cart`, 'info');
          }
          return { cart: state.cart.filter((p) => p.id !== productId) };
        }),

      updateQuantity: (productId: number, action: "increase" | "decrease") =>
        set((state) => ({
          cart: state.cart.map((p) => {
            if (p.id === productId) {
              const currentQty = p.quantity || 1;
              const newQty = action === "increase" ? currentQty + 1 : currentQty - 1;
              return { ...p, quantity: newQty < 1 ? 1 : newQty };
            }
            return p;
          }),
        })),

      clearCart: () => set({ cart: [] }),

      addOrder: (order: Order) => 
        set((state) => ({
          orders: [order, ...state.orders]
        })),

      addCustomer: (customer: Customer) =>
        set((state) => {
          const exists = state.customers.find((c) => c.email === customer.email);
          if (exists) return state;
          return { customers: [customer, ...state.customers] };
        }),

      fetchDashboardData: async () => {
        const existingOrders = get().orders;
        const existingCustomers = get().customers;
        set({ loading: true });
        try {
          const [prodRes, userRes, cartRes] = await Promise.all([
            api.get<Product[]>("products"),
            api.get<Customer[]>("users"),
            api.get<Order[]>("carts"),
          ]);
          
          // تم استبدال (order: any) بـ (order: Order) لضمان النوع الصحيح
          const mappedOrders: Order[] = cartRes.data.map((order: Order) => ({
            ...order,
            total: (Math.random() * 200 + 50).toFixed(2), 
            status: Math.random() > 0.5 ? 'Success' : 'Pending'
          }));

          set({
            products: prodRes.data,
            customers: existingCustomers.length > 10 ? existingCustomers : userRes.data,
            orders: existingOrders.length > 0 ? existingOrders : mappedOrders,
            loading: false,
          });
        } catch (error) {
          const message = error instanceof AxiosError ? error.message : "Failed to fetch dashboard data";
          get().addLog("API Error", message, 'error');
          set({ loading: false });
        }
      },
    }),
    { name: "sales-pro-storage" }
  )
);