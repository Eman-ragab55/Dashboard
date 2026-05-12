"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSalesStore } from "@/src/Store/useSalesStore";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useSalesStore((state) => state.isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. قائمة الصفحات العامة (مسموح بدخولها بدون تسجيل)
    const isPublicPage = pathname === "/login" || pathname === "/register";

    // 2. لو مش مسجل دخول وبتحاول تدخل صفحة خاصة (زي الداشبورد أو المنتجات)
    if (!isLoggedIn && !isPublicPage) {
      router.push("/login"); // اطرده لصفحة الدخول
    }
    
    // 3. لو مسجل دخول وبتحاول تفتح صفحة الـ login أو الـ register
    // وديه للداشبورد فوراً لأن ملوش لازمة يسجل تاني
    if (isLoggedIn && isPublicPage) {
      router.push("/");
    }
  }, [isLoggedIn, pathname, router]);

  return <>{children}</>;
}