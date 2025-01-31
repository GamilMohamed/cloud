"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"

export default function Page() {
  const textRef = useRef(null)
  
  useEffect(() => {
    // Split the text into spans
    const text = textRef.current
    const characters = text.textContent.split('')
    text.textContent = ''
    
    characters.forEach((char) => {
      const span = document.createElement('span')
      span.textContent = char
      span.style.display = 'inline-block' // Ensure each letter can be animated independently
      text.appendChild(span)
	  // add a space after each letter
	  const space = document.createElement('span')
	  space.textContent = " "
	  text.appendChild(space)
    })

    // Animate each letter
    gsap.fromTo(
      text.children,
      {
        opacity: 0,
        y: "-15vw",
      },
      {
        opacity: 1,
        y: "0vw",
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.1, // 0.1 second delay between each letter
      }
    )
  }, [])

  return (
    <main className="main bg-[#b6e6fb] w-screen h-screen flex justify-center items-center"> 
      <h1 ref={textRef} 
	 style={{ color: "#FBFCFA" }} 
	  className="text-9xl font-bold  ">
        ABOUT
      </h1>
    </main>
  )
}