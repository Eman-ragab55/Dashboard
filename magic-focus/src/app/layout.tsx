import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// استدعاء مكون الحماية
import AuthWrapper from "@/src/Components/AuthWrapper";
// استدعاء الـ Toaster من مكتبة sonner
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SalesPro Dashboard | Eman Ragab",
  description: "Advanced Sales Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-[#0A0A0A] text-white`}>
        
        {/* الـ AuthWrapper هو اللي هيراقب حالة المستخدم */}
        <AuthWrapper>
          {children}
        </AuthWrapper>

        {/* إضافة مكون الإشعارات هنا 
            - position: يظهر في أعلى اليمين
            - richColors: يخلي لون النجاح أخضر والخطأ أحمر بشكل واضح
            - theme: نخليه dark عشان يليق مع الـ Dashboard بتاعك
        */}
        <Toaster 
          position="top-right" 
          richColors 
          theme="dark" 
          closeButton
          duration={4000} 
        />
        
      </body>
    </html>
  );
}