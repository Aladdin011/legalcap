"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function PhilanthropyHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-black to-john-wick-navy">
      <div className="absolute inset-0 z-0">
        <Image
          src="/philanthropy/hero-background.png"
          alt="Keanu Reeves at charity event"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 text-matrix-green font-medium tracking-wider"
          >
            THE FOUNDATION
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Compassion Today,
            <br />
            Change Tomorrow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
          >
            Discover how we're making a difference through targeted initiatives, supporting causes that matter, and
            creating lasting positive impact in communities worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#initiatives"
              className="px-6 py-3 bg-matrix-green text-black font-medium rounded-md hover:bg-opacity-90 transition-all"
            >
              Our Initiatives
            </Link>
            <Link
              href="#support"
              className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Support Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
