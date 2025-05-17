"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function PhilanthropyPartners() {
  const partners = [
    { name: "SickKids Foundation", logo: "/philanthropy/partners/partner-1.png" },
    { name: "Stand Up To Cancer", logo: "/philanthropy/partners/partner-2.png" },
    { name: "Conservation International", logo: "/philanthropy/partners/partner-3.png" },
    { name: "PETA", logo: "/philanthropy/partners/partner-4.png" },
    { name: "Children's Hospital Los Angeles", logo: "/philanthropy/partners/partner-5.png" },
    { name: "World Wildlife Fund", logo: "/philanthropy/partners/partner-6.png" },
  ]

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 text-matrix-green font-medium tracking-wider"
          >
            OUR PARTNERS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Strategic Alliances
            <br />
            for Greater Impact
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300"
          >
            We collaborate with established organizations that share our values and vision. These partnerships allow us
            to leverage expertise and resources for maximum impact.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
        >
          {partners.map((partner) => (
            <div key={partner.name} className="flex justify-center">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
