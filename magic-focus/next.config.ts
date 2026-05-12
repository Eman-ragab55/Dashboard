import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // تفعيل عرض الصور من المصادر الخارجية اللي استخدمناها في الـ Store
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // إعداد اختياري يساعد في تقليل رسائل التحذير الخاصة بالـ Hydration في الـ Console
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;