import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info";
}

export const Badge = ({ children, variant = "info" }: BadgeProps) => {
  const styles = {
    success: "bg-green-500/10 text-green-500",
    warning: "bg-yellow-500/10 text-yellow-500",
    error: "bg-red-500/10 text-red-500",
    info: "bg-purple-500/10 text-purple-400",
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
};