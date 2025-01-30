"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

const CloudAnimation = () => {
	const cloudContainerRef = useRef<HTMLDivElement>(null)
	const mainCloudRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLHeadingElement>(null)
	const bigRef = useRef<HTMLDivElement>(null)

	const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min

	// Cloud data: [src, width, height, top, duration]
	const cloudsData = [["/cloudpixel.png", "190px", "auto", "10%", randomNumber(4, 25)], ["/cloudpixel2.png", "390px", "auto", "20%", randomNumber(4, 25)], ["/cloudpixel.png", "190px", "auto", "30%", randomNumber(4, 25)], ["/cloudpixel.png", "190px", "auto", "40%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "190px", "50%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "190px", "60%", randomNumber(4, 25)], ["/cloudpixel.png", "290px", "auto", "70%", randomNumber(4, 25)], ["/cloudpixel.png", "290px", "auto", "110%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "290px", "120%", randomNumber(4, 25)], ["/cloudpixel.png", "390px", "auto", "130%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "390px", "140%", randomNumber(4, 25)], ["/cloudpixel.png", "390px", "auto", "150%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "490px", "200%", randomNumber(4, 25)], ["/cloudpixel.png", "590px", "auto", "210%", randomNumber(4, 25)], ["/cloudpixel.png", "490px", "auto", "190%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "590px", "220%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "590px", "240%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "390px", "160%", randomNumber(4, 25)], ["/cloudpixel.png", "490px", "auto", "170%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "490px", "180%", randomNumber(4, 25)], ["/cloudpixel.png", "690px", "auto", "250%", randomNumber(4, 25)], ["/cloudpixel.png", "590px", "auto", "230%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "190px", "80%", randomNumber(4, 25)], ["/cloudpixel.png", "190px", "auto", "90%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "290px", "100%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "690px", "260%", randomNumber(4, 25)], ["/cloudpixel.png", "690px", "auto", "270%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "690px", "280%", randomNumber(4, 25)], ["/cloudpixel.png", "790px", "auto", "290%", randomNumber(4, 25)], ["/cloudpixel2.png", "auto", "790px", "300%", randomNumber(4, 25)],
	];
	const mainCloud = ["/cloudpixel.png", "400px", "auto", "auto", 10]

	useEffect(() => {
		// if (!cloudContainerRef.current || !textRef.current || !mainCloudRef.current) return

		const clouds = cloudContainerRef.current.querySelectorAll<HTMLImageElement>(".cloud")
		const text = textRef.current

		clouds.forEach((cloud, i) => {
			gsap.fromTo(
				cloud,
				{ x: randomNumber(-100, -50) + "vw" },
				{
					x: "100vw",
					duration: cloudsData[i][4],
					repeat: -1,
					ease: "none",
				},
			)
		})
		const bigRefcurr = bigRef.current

		gsap.fromTo(bigRefcurr, {
			// x: "-50vw",
			// y: "-50vh",
		},
			{
				x: "150vw",
				duration: 5,
				delay: 1,
				ease: "none",
			}
		)

		// gsap.fromTo(bigRefcurr, {
		// 	opacity: 1,
		// },
		// 	{
		// 		opacity: 0,
		// 		duration: 1,
		// 		delay: 6,
		// 		ease: "none",
		// 	}
		// )

		// gasp.timeline when mainCloud goes above the CloudText it appears

		// gsap.fromTo(
		// 	mainCloudRef.current,
		// 	{ x: "-100vw" },
		// 	{
		// 		x: "100vw",
		// 		duration: mainCloud[4],
		// 		repeat: -1,
		// 		ease: "none",
		// 	},
		// )

		// gsap.fromTo(
		// 	text,
		// 	{ opacity: 0 },
		// 	{
		// 		opacity: 1,
		// 		duration: 40,
		// 		delay: 1,
		// 	}
		// )


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
						zIndex: 100,
						// boxShadow: "0 0 10px 5px red",
						// filter: "drop-shadow(0 0 10px red)",
					}}
				/>
			))}
			<div ref={bigRef} className="absolute top-0 left-0 h-[100vh] w-[100vw] z-40 bg-[#87CEEB] opacity-100">
				<img src={mainCloud[0]} style={styles.mainCloud}></img>
				{/* <div  style={styles.bigAss}></div> */}
			</div>
			<img 
				src={"/cloudtext.png"} alt="cloudtext" style={styles.cloudText} ref={textRef} />
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
		zIndex: 10,
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

