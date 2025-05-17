"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { FanSubmission, SubmissionType } from "@/types/fan-submissions"
import { SubmissionDetailModal } from "./submission-detail-modal"

interface ModernGalleryProps {
  submissions: FanSubmission[]
}

export function ModernGallery({ submissions }: ModernGalleryProps) {
  const [selectedType, setSelectedType] = useState<SubmissionType | "all">("all")
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<FanSubmission | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Filter submissions
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesType = selectedType === "all" || submission.type === selectedType
    const matchesSearch =
      searchQuery === "" ||
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (submission.tags && submission.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    return matchesType && matchesSearch
  })

  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime()
    } else {
      return b.likes - a.likes
    }
  })

  // Open modal with selected submission
  const openSubmissionModal = (submission: FanSubmission) => {
    setSelectedSubmission(submission)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "art":
        return "bg-matrix-green/10 text-matrix-green border border-matrix-green/30"
      case "photo":
        return "bg-john-wick-gold/10 text-john-wick-gold border border-john-wick-gold/30"
      case "video":
        return "bg-neo-red/10 text-neo-red border border-neo-red/30"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-12">
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search submissions..."
              className="w-full py-3 px-5 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-matrix-green focus:border-transparent"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {searchQuery ? (
                <button onClick={() => setSearchQuery("")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === "all" ? "bg-black text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All Submissions
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedType("art")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === "art"
                ? "bg-matrix-green text-black"
                : "bg-matrix-green/10 text-matrix-green hover:bg-matrix-green/20"
            }`}
          >
            Artwork
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedType("photo")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === "photo"
                ? "bg-john-wick-gold text-black"
                : "bg-john-wick-gold/10 text-john-wick-gold hover:bg-john-wick-gold/20"
            }`}
          >
            Photos
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedType("video")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === "video" ? "bg-neo-red text-white" : "bg-neo-red/10 text-neo-red hover:bg-neo-red/20"
            }`}
          >
            Videos
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedType("other")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === "other" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Other
          </motion.button>
        </div>

        {/* Sort options */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setSortBy("newest")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "newest" ? "bg-black text-white" : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy("popular")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "popular" ? "bg-black text-white" : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              Most Popular
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-8 text-gray-600">
          Showing {sortedSubmissions.length} {sortedSubmissions.length === 1 ? "submission" : "submissions"}
        </div>
      </div>

      {/* Gallery Grid */}
      <AnimatePresence>
        {sortedSubmissions.length > 0 ? (
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sortedSubmissions.map((submission) => (
              <motion.div
                key={submission.id}
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                className="group"
                onClick={() => openSubmissionModal(submission)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={submission.thumbnailUrl || submission.imageUrl || "/placeholder.svg?height=400&width=400"}
                      alt={submission.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Play button for videos */}
                    {submission.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Overlay with info on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-white font-medium">View Details</span>
                    </div>

                    {/* Type badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(submission.type)}`}
                      >
                        {submission.type.charAt(0).toUpperCase() + submission.type.slice(1)}
                      </span>
                    </div>

                    {/* Featured badge */}
                    {submission.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-john-wick-gold/10 text-john-wick-gold border border-john-wick-gold/30">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-medium text-lg mb-2 group-hover:text-matrix-green transition-colors duration-300">
                      {submission.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden mr-2">
                          {submission.creator.avatar ? (
                            <Image
                              src={submission.creator.avatar || "/placeholder.svg"}
                              alt={submission.creator.name}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                              {submission.creator.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-600">{submission.creator.name}</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-john-wick-gold"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span className="text-xs text-gray-600">{submission.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No submissions found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <SubmissionDetailModal submission={selectedSubmission} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
