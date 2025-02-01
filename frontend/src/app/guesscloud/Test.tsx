// "use client";
// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { cloudsData } from "./data";
// import { useTransitionRouter } from "next-transition-router";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// export default function Test() {
//   const cloudContainerRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLDivElement>(null);
//   const textRefC = useRef<HTMLHeadingElement>(null);
//   const textRefL = useRef<HTMLHeadingElement>(null);
//   const textRefO = useRef<HTMLHeadingElement>(null);
//   const textRefU = useRef<HTMLHeadingElement>(null);
//   const textRefD = useRef<HTMLHeadingElement>(null);
//   const mainCloud = useRef<HTMLDivElement>(null);
//   const mainDiv = useRef<HTMLDivElement>(null);
//   const cardRef = useRef<HTMLDivElement>(null);
//   const cardRef2 = useRef<HTMLDivElement>(null);
//   const divCardRef = useRef<HTMLDivElement>(null);
//   const router = useTransitionRouter();
//   console.log(cloudsData);
//   useEffect(() => {
//     if (!cloudContainerRef.current) return;
//     const cardTimeline = gsap.timeline();

//     const cloudsRef =
//       cloudContainerRef.current.querySelectorAll<HTMLImageElement>(".cloud");
//     // t is an array of timelines

//     const timelines = Array.from({ length: cloudsRef.length }, () =>
//       gsap.timeline()
//     );

//     cloudsRef.forEach((cloud, i) => {
//       const t = timelines[i];
//       t.fromTo(
//         cloud,
//         {
//           opacity: 0,
//           x: cloudsData[i][6] + "vw",
//           y: cloudsData[i][3],
//         },
//         {
//           opacity: cloudsData[i][4] * 6 + "%",
//           y: cloudsData[i][2],
//           duration: cloudsData[i][4],
//           ease: "power4.inOut",
//         }
//       )
//         .set(cloud, {
//           scale: 1,
//           duration: 2,
//         })
//         .to(cloud, {
//           scale: 1.1, // Expand slightly
//           duration: 1.5,
//           // opacity: 0.7,
//           ease: "power1.inOut",
//           repeat: -1, // Infinite loop
//           yoyo: true, // Reverse back to original size
//         });
//     });
//     const newTimeline = gsap.timeline();

//     newTimeline
//       .fromTo(
//         textRefC.current,
//         {
//           opacity: 0,
//           x: "-15vw",
//         },
//         {
//           x: "0vw",
//           opacity: 1,
//           //   duration: 1.5,
//           //   delay: 2,
//           ease: "power4.inOut",
//         }
//       )
//       .fromTo(
//         textRefC.current,
//         {
//           transform: "rotate(-5deg)",
//         },
//         {
//           transform: "rotate(5deg)",
//           repeat: -1,
//           yoyo: true,
//         }
//       )
//       .fromTo(
//         textRefL.current,
//         {
//           opacity: 0,
//           x: "21vw",
//         },
//         {
//           x: "0vw",
//           opacity: 1,
//           //   duration: 1.5,
//           ease: "power3.inOut",
//         }
//       )
//       .fromTo(
//         textRefL.current,
//         {
//           transform: "rotate(-5deg)",
//         },
//         {
//           transform: "rotate(5deg)",
//           repeat: -1,
//           yoyo: true,
//         }
//       )
//       .fromTo(
//         textRefO.current,
//         {
//           opacity: 0,
//           y: "9vw",
//         },
//         {
//           y: "0vw",
//           opacity: 1,
//           //   duration: 1.5,
//           ease: "power3.inOut",
//         }
//       )
//       .fromTo(
//         textRefO.current,
//         {
//           transform: "rotate(-5deg)",
//         },
//         {
//           transform: "rotate(5deg)",
//           repeat: -1,
//           yoyo: true,
//         }
//       )
//       .fromTo(
//         textRefU.current,
//         {
//           opacity: 0,
//           y: "-15vw",
//         },
//         {
//           y: "0vw",
//           opacity: 1,
//           //   duration: 1.5,
//           ease: "power2.inOut",
//         }
//       )
//       .fromTo(
//         textRefU.current,
//         {
//           transform: "rotate(-5deg)",
//         },
//         {
//           transform: "rotate(5deg)",
//           repeat: -1,
//           yoyo: true,
//         }
//       )
//       .fromTo(
//         textRefD.current,
//         {
//           opacity: 0,
//           x: "15vw",
//         },
//         {
//           x: "0vw",
//           opacity: 1,
//           //   duration: 1.5,
//           ease: "power2.inOut",
//         }
//       )
//       .fromTo(
//         textRefD.current,
//         {
//           transform: "rotate(-5deg)",
//         },
//         {
//           transform: "rotate(5deg)",
//           //   duration: 1,
//           repeat: -1,
//           yoyo: true,
//         }
//       )
//       .fromTo(
//         mainCloud.current,
//         {
//           opacity: 0,
//         },
//         {
//           opacity: 1,
//           duration: 1,
//         }
//       )
//       .to(textRef.current, {
//         scale: 150,
//         // duration: 2,
//         // delay: 1,
//         ease: "power4.inOut",
//       })
//       .add(() => {
//         // hide everything
//         if (!cloudContainerRef.current) return;
//         if (!textRef.current) return;
//         if (!mainCloud.current) return;
//         if (!divCardRef.current) return;
//         if (!mainDiv.current) return;
//         cloudContainerRef.current.style.display = "none";
//         textRef.current.style.display = "none";
//         mainCloud.current.style.display = "none";
//         mainDiv.current.style.backgroundColor = "#b6e6fb";
//         divCardRef.current.style.display = "flex";

//         // stop every yoyo
//         timelines.forEach((t) => t.kill());
//         // stop the letter animation
//         if (!textRefC.current) return;
//         if (!textRefL.current) return;
//         if (!textRefO.current) return;
//         if (!textRefU.current) return;
//         if (!textRefD.current) return;
//         textRef.current.innerHTML = "";
//         cloudContainerRef.current.innerHTML = "";

//         // take all of the styles back to nothing
//       })
//       .fromTo(
//         cardRef.current,
//         {
//           opacity: 0,
//         },
//         {
//           opacity: 1,
//           duration: 1,
//         }
//       )

//       .fromTo(
//         cardRef2.current,
//         {
//           opacity: 0,
//         },
//         {
//           opacity: 1,
//           duration: 1,
//         }
//       );

//     // });
//   }, []);
//   return (
//     <main
//       ref={mainDiv}
//       className="h-screen w-screen bg-sky-400 overflow-hidden transform translate-z-0 flex justify-center items-center"
//     >
//       <div
//         ref={cloudContainerRef}
//         className="clouds overflow-hidden relative w-full h-full"
//       >
//         {cloudsData.map((cloud, index) => (
//           <img
//             key={index}
//             src={cloud[0]}
//             alt="cloud"
//             style={{ width: cloud[1] }}
//             className="cloud absolute overflow-hidden"
//           />
//         ))}
//       </div>
//       <div
//         ref={textRef}
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-rexd-400 w-full justify-center overflow-hidden transform translate-z"
//       >
//         <div
//           ref={mainCloud}
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90px] bg-[#b6e6fb] h-[100px] opacity-0 rounded-3xl overflow-hidden"
//         />
//         <h1
//           ref={textRefC}
//           className="relative text-[270px] opacity-0 text-sky-700 overflow-hidden"
//         >
//           C
//         </h1>
//         <h1
//           ref={textRefL}
//           className="relative text-[270px] opacity-0 text-sky-700 overflow-hidden"
//         >
//           L
//         </h1>
//         <h1
//           ref={textRefO}
//           className="relative text-[270px] opacity-0 text-sky-700 overflow-hidden"
//         >
//           O
//         </h1>
//         <h1
//           ref={textRefU}
//           className="relative text-[270px] opacity-0 text-sky-700 overflow-hidden"
//         >
//           U
//         </h1>
//         <h1
//           ref={textRefD}
//           className="relative text-[270px] opacity-0 text-sky-700 overflow-hidden"
//         >
//           D
//         </h1>
//       </div>
//       <div ref={divCardRef} className="justify-center items-center hidden">
//         <Card ref={cardRef} className="bg-red-950 text-white opacity-0 w-1/2">
//           <CardHeader>Test</CardHeader>
//           <CardDescription>
//             <div className="p-4">This is a test page</div>
//           </CardDescription>
//           <CardContent>
//             <p>Test</p>
//           </CardContent>
//           <CardFooter>Footer</CardFooter>
//         </Card>
//         <Card
//           ref={cardRef2}
//           className="bg-green-950 text-white opacity-0 w-1/2"
//         >
//           <CardHeader>Test</CardHeader>
//           <CardDescription>
//             <div className="p-4">This is a test page</div>
//           </CardDescription>
//           <CardContent>
//             <p>Test</p>
//           </CardContent>
//           <CardFooter>Footer</CardFooter>
//         </Card>
//       </div>
//     </main>
//   );
// }

"use client"
import CloudAnimation from "@/components/CloudAnimation";

export default function Test() {
  return (
    <CloudAnimation />
  );
}