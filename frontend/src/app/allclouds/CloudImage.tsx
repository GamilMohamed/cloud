import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { toTitleCase } from "./page";
import { Cloud } from "@/lib/types";
import Image from "next/image";
import gsap from "gsap";

export function CloudImage({ cloud, i }: { cloud: Cloud; i: number }) {
	const [device, setDevice] = useState("desktop");
  
	const cloudRef = useRef<HTMLDivElement>(null);
	const [filter, setFilter] = useState(false);
	const [showOverlay, setShowOverlay] = useState(false);
  
	useEffect(() => {
	  const handleResize = () => {
		if (window.innerWidth < 640) {
		  setDevice("mobile");
		} else {
		  setDevice("desktop");
		}
	  };
  
	  handleResize();
	  window.addEventListener("resize", handleResize);
  
	  return () => {
		window.removeEventListener("resize", handleResize);
	  };
	}, []);
  
	useEffect(() => {
	  if (!cloudRef.current) return;
	  const { right, left } = cloudRef.current.getBoundingClientRect();
	  const side = right > left ? right : left;
  
	  gsap.fromTo(
		cloudRef.current,
		{
		  opacity: 0,
		  x: side > window.innerWidth / 2 ? 100 : -100,
		},
		{
		  x: 0,
		  duration: 0.3 * i + 0.3,
		  opacity: 1,
		  ease: "power4.inOut",
		}
	  );
  
	  return () => {
		gsap.killTweensOf(cloudRef.current);
	  };
	}, []);
	const dimensions = {
	  square: { width: 300, height: 300 },
	  landscape: { width: 600, height: 300 },
	  portrait: { width: 300, height: 600 },
	};
  
	const mobileDimensions = {
	  square: { width: 180, height: 180 },
	  landscape: { width: 360, height: 180 },
	  portrait: { width: 180, height: 360 },
	};
  
	const { width, height } =
	  device === "desktop"
		? dimensions[cloud.aspect]
		: mobileDimensions[cloud.aspect];
  
	return (
	  <Card
		ref={cloudRef}
		key={cloud.id}
		className="overflow-hidden bg-transparent shadow-lg hover:shadow-xl transition-shadow duration-300"
		style={{ width, height }}
	  >
		<div
		  className="relative group"
		  style={{ width, height }}
		  onMouseEnter={() => setShowOverlay(true)}
		  onMouseLeave={() => setShowOverlay(false)}
		>
		  <Image
			onClick={() => setFilter(!filter)}
			fill
			priority
			sizes="100%"
			src={cloud.image}
			alt="cloud"
			className="object-cover"
		  />
  
		  {filter && (
			<Image
			  onClick={() => setFilter(false)}
			  fill
			  src={cloud.filter}
			  alt="cloud-filter"
			  className="absolute top-0 left-0 object-cover"
			/>
		  )}
  
		  {/* Overlay on hover */}
		  <div
			className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
			  showOverlay ? "opacity-100" : "opacity-0"
			}`}
		  >
			<div className="absolute top-2 right-2">
			  <Button
				onClick={(e) => {
				  e.stopPropagation();
				  setFilter(!filter);
				}}
				variant="secondary"
				size="sm"
				className="bg-white/80 hover:bg-white/90"
			  >
				{filter ? "Hide hint" : "Show hint"}
			  </Button>
			</div>
  
			<div className="absolute bottom-0 left-0 right-0 p-4 text-white space-y-2">
			  <div className="flex items-center gap-2">
				<div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
				  {cloud.user.name.charAt(0)}
				</div>
				<p className="font-medium">{cloud.user.name}</p>
			  </div>
  
			  <p className="text-sm text-white/80">
				{toTitleCase(
				  new Date(cloud.createdAt).toLocaleString("fr-FR", {
					weekday: "long",
					day: "numeric",
					month: "long",
				  })
				)}
			  </p>
  
			  <Input
				type="text"
				placeholder="Que voyez vous ?"
				className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
			  />
			  <Button className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/50">
				Envoyer
			  </Button>
			</div>
		  </div>
		</div>
	  </Card>
	);
  }
  