"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { biographySections } from "@/data/biography-data"

export function BiographyTimeline() {
  const [activeSection, setActiveSection] = useState(biographySections[0].id)
  const timelineRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  // Get the active section data
  const activeSectionData = biographySections.find((section) => section.id === activeSection)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Timeline navigation */}
        <div className="mb-12 overflow-x-auto" ref={timelineRef}>
          <div className="flex min-w-max border-b border-gray-200">
            {biographySections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-6 py-4 text-lg font-medium whitespace-nowrap transition-colors relative ${
                  activeSection === section.id
                    ? "text-matrix-green border-b-2 border-matrix-green"
                    : "text-gray-600 hover:text-matrix-green"
                }`}
              >
                <span className="block text-sm text-gray-500">{section.period}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Biography sections */}
        <div className="space-y-24">
          {biographySections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-32">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">{section.title}</h2>
                <p className="text-lg text-gray-700 mb-12 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>

              {/* Timeline events */}
              <div className="mt-16 relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:translate-x-[-0.5px]"></div>

                <div className="space-y-16">
                  {section.events.map((event, index) => (
                    <motion.div
                      key={`${section.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                      className={`relative flex flex-col md:flex-row ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-white border-4 border-matrix-green transform translate-x-[-10px] md:translate-x-[-12px] z-10"></div>

                      {/* Content */}
                      <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                        <div className={`bg-white rounded-xl shadow-sm p-6 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                          <div className="flex items-center mb-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                event.category === "personal"
                                  ? "bg-blue-100 text-blue-800"
                                  : event.category === "career"
                                    ? "bg-matrix-green/20 text-matrix-green"
                                    : "bg-john-wick-gold/20 text-john-wick-gold"
                              }`}
                            >
                              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </span>
                            <span className="ml-3 text-sm font-bold text-gray-500">{event.year}</span>
                          </div>

                          <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                          <p className="text-gray-600">{event.description}</p>

                          {event.image && (
                            <div className="mt-4 relative h-48 rounded-lg overflow-hidden">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
