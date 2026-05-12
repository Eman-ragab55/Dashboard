import React from "react";

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-[#111111] border border-white/5 rounded-3xl shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="p-6 border-b border-white/5">
    <h3 className="text-lg font-bold text-white">{title}</h3>
    {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

export const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);