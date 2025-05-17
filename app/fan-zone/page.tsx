"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ModernGallery } from "@/components/fan-gallery/modern-gallery"
import { SubmissionFormModal } from "@/components/fan-gallery/submission-form-modal"
import { fanSubmissions } from "@/data/fan-submissions"

export default function FanGalleryPage() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-3 px-3 py-1 bg-gray-100 rounded-full">
              <span className="text-xs font-medium text-gray-600">Community • Creativity • Connection</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Fan Art Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Explore amazing fan creations from our talented community. Share your own artwork, photos, and videos to
              celebrate Keanu's iconic roles and moments.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormModalOpen(true)}
              className="px-8 py-4 bg-black text-white rounded-lg hover:bg-matrix-green hover:text-black transition-colors"
            >
              Submit Your Fan Art
            </motion.button>
          </motion.div>

          <ModernGallery submissions={fanSubmissions} />
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Featured Artists</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Celebrating the incredible talent and creativity of our community members.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fanSubmissions
              .filter((submission) => submission.featured)
              .slice(0, 3)
              .map((artist) => (
                <motion.div
                  key={artist.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-64">
                    <img
                      src={artist.imageUrl || "/placeholder.svg"}
                      alt={artist.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-medium text-lg mb-2">{artist.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{artist.description}</p>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-3">
                        {artist.creator.avatar ? (
                          <img
                            src={artist.creator.avatar || "/placeholder.svg"}
                            alt={artist.creator.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                            {artist.creator.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium">{artist.creator.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-4xl font-bold mb-2">{fanSubmissions.length}+</p>
              <p className="text-gray-600">Fan Submissions</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold mb-2">24</p>
              <p className="text-gray-600">Countries</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <p className="text-4xl font-bold mb-2">4K+</p>
              <p className="text-gray-600">Community Members</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <p className="text-4xl font-bold mb-2">12</p>
              <p className="text-gray-600">Featured Artists</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Join Our Creative Community</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Share your passion for Keanu Reeves through your creative expressions. Submit your artwork, photos, or
              videos and become part of our growing community.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormModalOpen(true)}
              className="px-8 py-4 bg-matrix-green text-black rounded-lg hover:bg-white transition-colors"
            >
              Submit Your Creation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Submission Form Modal */}
      <SubmissionFormModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} />
    </div>
  )
}
