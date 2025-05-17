"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function PhilanthropyMission() {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-4 text-matrix-green font-medium tracking-wider">OUR MISSION</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              A Journey of Passion
              <br />
              and Dedication
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              For over two decades, I've been committed to supporting causes that create meaningful change. My
              foundation focuses on cancer research, children's hospitals, and environmental conservation.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              I believe in giving back without seeking recognition. Many of my charitable contributions have been made
              anonymously, reflecting my belief that true philanthropy comes from the heart, not from the desire for
              acknowledgment.
            </p>
            <div className="flex items-center mt-8">
              <div className="w-16 h-1 bg-matrix-green mr-4"></div>
              <p className="text-gray-500 dark:text-gray-400 italic">
                "The simple act of caring is heroic." — Edward Albert
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src="/philanthropy/mission-image.png"
              alt="Keanu Reeves at charity event"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
