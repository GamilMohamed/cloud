"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Test() {
	const maskContentRef = useRef<HTMLDivElement>(null);
	const incr = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (maskContentRef.current) {
			gsap.fromTo(
				maskContentRef.current,
				{
					x: '-100%'
				},
				{
					x: '0%',
					duration: 2,
					ease: 'power2.inOut',
				}
			);

			const timeline = gsap.timeline();

			timeline.to(maskContentRef.current,
				{
					x: '-100%'
				}).to(maskContentRef.current,
					{
						x: '0%',
						duration: 2,
						ease: 'power2.inOut',
					}
				).to(incr.current, {
					scale: 1.5,
					duration: 2,
				}).seek(0)
		}
	}, []);

	return (
		<main className="container mx-auto flex justify-center items-center h-screen w-screen">
			<div className="relative w-96 h-96">
				<div ref={incr} className="mask1 w-full h-full overflow-hidden">
					<div
						ref={maskContentRef}
						className="w-full h-full bg-green-400"
					/>
				</div>
			</div>
		</main>
	);
}