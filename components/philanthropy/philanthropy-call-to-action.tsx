"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function PhilanthropyCallToAction() {
  return (
    <section id="support" className="py-24 bg-gradient-to-r from-john-wick-navy to-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 text-matrix-green font-medium tracking-wider"
          >
            JOIN THE MOVEMENT
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Together, We Can
            <br />
            Make a Difference
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 mb-8"
          >
            Your support enables us to continue our work and expand our impact. Whether through donations, volunteering,
            or spreading awareness, every contribution matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="#donate"
              className="px-8 py-4 bg-matrix-green text-black font-medium rounded-md hover:bg-opacity-90 transition-all"
            >
              Donate Now
            </Link>
            <Link
              href="#volunteer"
              className="px-8 py-4 border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Volunteer
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 text-gray-400 text-sm"
          >
            100% of public donations go directly to our initiatives. Administrative costs are covered separately.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
