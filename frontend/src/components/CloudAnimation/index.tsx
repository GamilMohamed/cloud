"use client";
import { CloudText } from "./CloudText";
import { CloudBackground } from "./CloudBackground";
import { InfoCards } from "./InfoCards";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function CloudAnimation() {
  const router = useRouter();
  const [showCards, setShowCards] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    async function fetchSession() {
      console.log("fetching session");
      const response = await fetch("http://localhost:3000/api/auth/session", {
        credentials: "include", // Important! This sends cookies
      });
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
      }
    }
    fetchSession();

    
  }, []);
  function CompleteAnimation() {
    router.push("/allclouds");
  }

  return (
    <main className="h-screen w-screen bg-sky-400 overflow-hidden transform translate-z-0 flex justify-center items-center">
      {!showCards && (
        <>
          <CloudBackground />
          <CloudText onAnimationComplete={CompleteAnimation} />
        </>
      )}
      {showCards && <InfoCards />}
    </main>
  );
}
