"use client";

import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";

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
      {children}
    </TransitionRouter>
  );
}