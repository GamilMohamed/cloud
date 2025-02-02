"use client";

import { TransitionRouter } from "next-transition-router";
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./lib/queryClient";

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
      {/* <QueryClientProvider client={queryClient}> */}
      <SessionProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </SessionProvider>
      {/* </QueryClientProvider> */}
    </TransitionRouter>
  );
}