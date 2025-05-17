"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  const matrixCodeRef = useRef<HTMLDivElement>(null)

  // Matrix code rain effect
  useEffect(() => {
    if (!matrixCodeRef.current) return

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    if (!context) return

    matrixCodeRef.current.appendChild(canvas)

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (!matrixCodeRef.current) return
      canvas.width = matrixCodeRef.current.offsetWidth
      canvas.height = matrixCodeRef.current.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix code characters
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    // Draw the matrix code
    const draw = () => {
      if (!context) return

      // Semi-transparent black to create fade effect
      context.fillStyle = "rgba(0, 0, 0, 0.05)"
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Green text
      context.fillStyle = "#00FF41"
      context.font = `${fontSize}px matrix`

      // Loop through each column
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length))

        // x = column * fontSize, y = drops[i] * fontSize
        context.fillText(text, i * fontSize, drops[i] * fontSize)

        // Randomly reset some drops to the top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Increment y position
        drops[i]++
      }
    }

    // Animation loop
    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
      if (matrixCodeRef.current && matrixCodeRef.current.contains(canvas)) {
        matrixCodeRef.current.removeChild(canvas)
      }
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Matrix code background */}
      <div ref={matrixCodeRef} className="absolute inset-0 z-0 opacity-20"></div>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-john-wick-navy to-matrix-black opacity-90 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-matrix-green shadow-neo-glow"
        >
          <Image src="/keanu-portrait.png" alt="Keanu Reeves" fill className="object-cover" priority />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glitch"
          data-text="Welcome to My Journey"
        >
          Welcome to My Journey
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="max-w-xl text-lg md:text-xl text-gray-300"
        >
          Actor. Director. Musician. Philanthropist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#filmography"
            className="px-6 py-3 bg-matrix-black border border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black transition-all duration-300 rounded-md"
          >
            Explore Filmography
          </a>
          <a
            href="/gvipc/apply"
            className="px-6 py-3 bg-john-wick-navy border border-john-wick-gold text-john-wick-gold hover:bg-john-wick-gold hover:text-john-wick-navy transition-all duration-300 rounded-md"
          >
            Get GVIPC Card
          </a>
        </motion.div>
      </div>
    </section>
  )
}
