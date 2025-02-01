"use client";
import { ButtonHTMLAttributes } from "react";

interface CloudDivProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function CloudDiv({ className = "", ...props }: CloudDivProps) {
  return (
    <button
      {...props}
      className={`relative flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow ${className}`}
    />
  );
}
