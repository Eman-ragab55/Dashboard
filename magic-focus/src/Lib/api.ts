import axios from 'axios';

// إنشاء نسخة Axios مع الإعدادات الأساسية
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000, // مهلة الطلب 10 ثوانٍ
});

// جلب المنتجات (Products)
export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data; // Axios يضع البيانات مباشرة في الـ data
};

// جلب المستخدمين (Users)
export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// جلب الطلبات (Orders)
export const fetchOrders = async () => {
  const response = await api.get('/carts');
  return response.data;
};