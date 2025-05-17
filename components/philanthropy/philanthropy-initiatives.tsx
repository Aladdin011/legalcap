"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function PhilanthropyInitiatives() {
  const initiatives = [
    {
      title: "Cancer Research",
      description: "Supporting innovative research to find cures and improve treatments for various forms of cancer.",
      icon: "/philanthropy/icons/research.png",
    },
    {
      title: "Children's Hospitals",
      description: "Providing funding for equipment, facilities, and programs that improve care for children.",
      icon: "/philanthropy/icons/hospital.png",
    },
    {
      title: "Environmental Conservation",
      description: "Protecting natural habitats and supporting sustainable practices for a healthier planet.",
      icon: "/philanthropy/icons/environment.png",
    },
    {
      title: "Arts & Education",
      description: "Fostering creativity and learning through support for educational and artistic programs.",
      icon: "/philanthropy/icons/education.png",
    },
  ]

  return (
    <section id="initiatives" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 text-matrix-green font-medium tracking-wider"
          >
            KEY INITIATIVES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Real Impact,
            <br />
            Tangible Results
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 dark:text-gray-300"
          >
            Our foundation focuses on several key areas where we believe we can make the most significant difference.
            Each initiative is carefully selected and managed to ensure maximum positive impact.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 mb-6 text-matrix-green">
                <Image src={initiative.icon || "/placeholder.svg"} alt={initiative.title} width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{initiative.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{initiative.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
