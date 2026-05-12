"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({ variant = "primary", size = "md", children, className, ...props }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50";
  
  const variants = {
    primary: "bg-purple-600 text-white shadow-lg shadow-purple-600/20 hover:bg-purple-700",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};