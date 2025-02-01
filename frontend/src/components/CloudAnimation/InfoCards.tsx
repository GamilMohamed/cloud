"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import CloudDiv from "./CloudDiv";
import { LoginModal } from "./LoginModal";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export function InfoCards() {
  const router = useRouter();
  const card1Ref = useRef<HTMLButtonElement>(null);
  const card2Ref = useRef<HTMLButtonElement>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!card1Ref.current || !card2Ref.current) return;

    const timeline = gsap.timeline();

    gsap.set([card1Ref.current, card2Ref.current], { opacity: 0 });
    gsap.to(card1Ref.current, { opacity: 1, duration: 3 });
    gsap.to(card2Ref.current, { opacity: 1, duration: 3 });

    return () => {
      gsap.killTweensOf([card1Ref.current, card2Ref.current]);
    };
  }, []);

  function handleLoginModalOpen() {
    if (!user && !loading)
      setIsLoginModalOpen(true);
    else
      router.push("/uploadcloud");
  }


  return (
    <>
      <div className="flex items-center gap-4 lg:flex-row flex-col h-2/3 justify-around w-2/3">
        <CloudDiv
          ref={card1Ref}
          className="divcloud h-40 cursor-pointer"
          onClick={() => console.log("Cloud checked!")}
        >
          <p className="pt-4">CHECK THEM CLOUDS</p>
        </CloudDiv>
        <CloudDiv
          ref={card2Ref}
          className="divcloud h-40 cursor-pointer"
          onClick={handleLoginModalOpen}
        >
          <p className="pt-4">UPLOAD YOUR CLOUD</p>
        </CloudDiv>
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}