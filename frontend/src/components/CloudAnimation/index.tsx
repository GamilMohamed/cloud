"use client";
import { CloudText } from "./CloudText";
import { CloudBackground } from "./CloudBackground";
import { InfoCards } from "./InfoCards";
import { useState } from "react";

export default function CloudAnimation() {
  const [showCards, setShowCards] = useState(true);
  
  return (
    <main className="h-screen w-screen bg-sky-400 overflow-hidden transform translate-z-0 flex justify-center items-center">
      {!showCards && (
        <>
          <CloudBackground  />
          <CloudText onAnimationComplete={() => setShowCards(true)} />
        </>
      )}
      {showCards && <InfoCards />}
    </main>
  );
}
