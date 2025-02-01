"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { cloudsData } from "./data";


export function CloudBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const clouds = containerRef.current.querySelectorAll<HTMLImageElement>(".cloud");
    
    clouds.forEach((cloud, i) => {
      const timeline = gsap.timeline();
      timeline
        .fromTo(
          cloud,
          {
            opacity: 0,
            x: cloudsData[i][6] + "vw",
            y: cloudsData[i][3],
          },
          {
            opacity: cloudsData[i][4] * 6 + "%",
            y: cloudsData[i][2],
            duration: cloudsData[i][4],
            ease: "power4.inOut",
          }
        )
        .to(cloud, {
          scale: 1.1,
          duration: 1.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
    });

    // Trigger animation complete after delay
    // gsap.delayedCall(5, onAnimationComplete);

    return () => {
      clouds.forEach(() => gsap.killTweensOf(".cloud"));
    };
  }, []);

  return (
    <div ref={containerRef} className="clouds overflow-hidden relative w-full h-full">
      {cloudsData.map((cloud, index) => (
        <img
          key={index}
          src={cloud[0]}
          alt="cloud"
          style={{ width: cloud[1],
			opacity: 0,
		   }}
          className="cloud absolute overflow-hidden"
        />
      ))}
    </div>
  );
}
