"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface CloudTextProps {
  onAnimationComplete: () => void;
}
export function CloudText({ onAnimationComplete }: CloudTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const cloudZoomRef = useRef<HTMLDivElement>(null);
  const letters = "CLOUD".split("");

  useEffect(() => {
    if (!textRef.current) return;

    const timeline = gsap.timeline();
    const times = ["-15vw", "21vw", "9vw", "-15vw", "15vw"];
    letters.forEach((_, i) => {
      const letterRef = textRef.current?.children[i + 1] as HTMLElement;
      if (!letterRef) return;

      timeline
        .fromTo(
          letterRef,
          {
            opacity: 0,
            x: times[i],
          },
          {
            opacity: 1,
            x: 0,
            ease: "power4.inOut",
          }
        )
        .to(letterRef, {
          rotate: 5,
          duration: 0.3,
          repeat: -1,
          yoyo: true,
        });
    });
    timeline.fromTo(cloudZoomRef.current,
      {
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
        ease: "power4.inOut",
      }).to(textRef.current, {
        scale: 190,
        // duration: 1,
        // delay: 1,
        ease: "power4.inOut",
      }).add(() => {
        onAnimationComplete();
      });

    // timeline.eventCallback("onComplete", onAnimationComplete);

    return () => {
      // gsap.delayedCall(5, onAnimationComplete);
      // gsap.killTweensOf(textRef.current?.children);
    };
  }, [onAnimationComplete, letters]);

  return (
    <>
      <div
        onClick={() => onAnimationComplete()}
        ref={textRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center"
      >
        <div ref={cloudZoomRef} className="bg-sky-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-24 opacxity-0"></div>

        {letters.map((letter, index) => (
          <h1
            key={index}
            className="relative text-[270px] opacity-0 text-sky-700 overflow-hidden"
          >
            {letter}
          </h1>
        ))}
      </div>
    </>
  );
}
