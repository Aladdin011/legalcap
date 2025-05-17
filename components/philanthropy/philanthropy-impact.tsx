"use client"

import { motion } from "framer-motion"

export function PhilanthropyImpact() {
  const stats = [
    { value: "$58M+", label: "Donated to Date" },
    { value: "25+", label: "Years of Giving" },
    { value: "12", label: "Major Initiatives" },
    { value: "100+", label: "Organizations Supported" },
  ]

  return (
    <section className="py-24 bg-john-wick-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 text-matrix-green font-medium tracking-wider"
          >
            OUR IMPACT
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Measuring Our Success
            <br />
            Through Lives Changed
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300"
          >
            While numbers don't tell the whole story, they do provide insight into the scale of our work. Behind each
            statistic are real people whose lives have been positively impacted.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold mb-2 text-matrix-green">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 p-8 border border-gray-700 rounded-lg"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">Our Commitment to Transparency</h3>
          <p className="text-gray-300 mb-4">
            We believe in complete transparency in our philanthropic efforts. While I prefer to keep many donations
            private, our foundation publishes annual reports detailing our initiatives, partnerships, and financial
            allocations.
          </p>
          <p className="text-gray-300">
            This ensures that our supporters can see exactly how their contributions are making a difference and holds
            us accountable to our mission and values.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
