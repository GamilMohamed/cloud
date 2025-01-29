"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Link from "next/link"
const CloudAnimation = () => {
	const cloudContainerRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLHeadingElement>(null)
	const bigRef = useRef<HTMLDivElement>(null)

	const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min

	// Cloud data: [src, width, height, top, duration]
	// const cloudsData = [["
	const cloudsData = [
		['/cloudpixel.png', '190px', 'auto', '10%', 8, "-400px"],
		['/cloudpixel2.png', '390px', 'auto', '20%', 20, "-400px"],
		['/cloudpixel.png', '190px', 'auto', '30%', 24, "-400px"],
		['/cloudpixel.png', '190px', 'auto', '40%', 23, "-400px"],
		['/cloudpixel2.png', 'auto', '190px', '50%', 5, "-400px"],
		['/cloudpixel2.png', 'auto', '190px', '60%', 6, "-400px"],
		['/cloudpixel.png', '290px', 'auto', '70%', 9, "-400px"],
		['/cloudpixel.png', '290px', 'auto', '80%', 8, "-400px"],
		['/cloudpixel2.png', 'auto', '190px', '80%', 4, "-400px"],
		['/cloudpixel.png', '190px', 'auto', '90%', 13, "-400px"],
		['/cloudpixel2.png', 'auto', '290px', '100%', 12, "-400px"],


		['/cloudpixel.png', '190px', 'auto', '10%', 24, "-400px"],
		['/cloudpixel2.png', '390px', 'auto', '20%', 18, "-400px"],
		['/cloudpixel.png', '190px', 'auto', '30%', 19, "-400px"],
		['/cloudpixel2.png', '190px', 'auto', '40%', 19, "-400px"],
		['/cloudpixel.png', 'auto', '190px', '50%', 16, "-400px"],
		['/cloudpixel2.png', 'auto', '190px', '60%', 22, "-400px"],
		['/cloudpixel.png', '290px', 'auto', '70%', 10, "-400px"],
		['/cloudpixel2.png', '290px', 'auto', '80%', 21, "-400px"],
		['/cloudpixel.png', 'auto', '190px', '80%', 13, "-400px"],
		['/cloudpixel2.png', '190px', 'auto', '90%', 5, "-400px"],
		['/cloudpixel.png', 'auto', '290px', '100%', 15, "-400px"],

		['/cloudpixel2.png', '190px', 'auto', '10%', 9, "120vw"],
		['/cloudpixel.png', '390px', 'auto', '20%', 15, "120vw"],
		['/cloudpixel2.png', '190px', 'auto', '30%', 12, "120vw"],
		['/cloudpixel.png', '190px', 'auto', '40%', 24, "120vw"],
		['/cloudpixel2.png', 'auto', '190px', '50%', 14, "120vw"],
		['/cloudpixel.png', 'auto', '190px', '60%', 5, "120vw"],
		['/cloudpixel2.png', '290px', 'auto', '70%', 16, "120vw"],
		['/cloudpixel.png', '290px', 'auto', '80%', 16, "120vw"],
		['/cloudpixel2.png', 'auto', '190px', '80%', 10, "120vw"],



	]
	console.log("SA",cloudsData)
	const mainCloud = ["/cloudpixel.png", "400px", "auto", "auto", 10]

	useEffect(() => {
		if (!cloudContainerRef.current) return

		const clouds = cloudContainerRef.current.querySelectorAll<HTMLImageElement>(".cloud")
		const text = textRef.current

		clouds.forEach((cloud, i) => {
			if (cloudsData[i][5] == "120vw") {
			cloud.style.transform = "scaleX(-1)";
			}

			gsap.fromTo(
				cloud,
				{ x: cloudsData[i][5] },
				{
					x: cloudsData[i][5] == "120vw" ? "-100vw" : "100vw",
					// x: "100vw",
					duration: cloudsData[i][4],
					repeat: -1,
					ease: "none",
				},
			)
		})
		const bigRefcurr = bigRef.current

		gsap.to(bigRefcurr,
			{
				x: "150vw",
				duration: 5,
				delay: 0,
				ease: "none",
			}
		)

	}, [cloudsData]) // Added cloudsData to the dependency array

	return (
		<div style={styles.container} ref={cloudContainerRef}>
			{cloudsData.map((cloud, i) => (
				<img
					key={i}
					className="cloud absolute"
					src={cloud[0] || "/placeholder.svg"}
					alt="cloud"
					style={{
						width: cloud[1],
						height: cloud[2],
						top: cloud[3],
						left: 0,
						zIndex: 170,
					}}
				/>
			))}
			<div ref={bigRef} className="absolute top-0 left-0 h-[100vh] w-[100vw] bg-[#87CEEB] bg-xred-200 opacity-100" style={{ zIndex: 120 }}>
			<img src={mainCloud[0]} style={styles.mainCloud}></img>
			</div>
			<img src={"/cloudtext.png"} alt="cloudtext" style={styles.cloudText} ref={textRef} />
		</div>
	)
}

const styles = {
	container: {
		position: "relative" as const,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		backgroundColor: "skyblue",
		overflow: "hidden",
	},
	cloudText: {
		zIndex: 110,
	},
	bigAss: {
		position: "absolute" as const,
		top: 0,
		left: 0,
		width: "100vw",
		height: "100vh",
		backgroundColor: "red",
		zIndex: 40,
		opacity: 1,
	},
	mainCloud: {
		position: "absolute" as const,
		width: "400px",
		height: "auto",
		top: "50%",
		transform: "translate(-50%, -50%)",

	}
}

export default CloudAnimation

