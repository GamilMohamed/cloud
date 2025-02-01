"use client";

import { TransitionRouter } from "next-transition-router";
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from "./contexts/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      leave={(next) => {
        next();
      }}
      enter={(next) => {
        next();
      }}
    >
      <SessionProvider>
        <AuthProvider>
      {children}
        </AuthProvider>
      </SessionProvider>
    </TransitionRouter>
  );
}