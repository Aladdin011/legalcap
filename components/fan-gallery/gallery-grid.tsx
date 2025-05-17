"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { FanSubmission, SubmissionType } from "@/types/fan-submissions"
import { GalleryItemCard } from "./gallery-item-card"
import { SubmissionDetailModal } from "./submission-detail-modal"
import { GalleryFilters } from "./gallery-filters"

interface GalleryGridProps {
  submissions: FanSubmission[]
}

export function GalleryGrid({ submissions }: GalleryGridProps) {
  const [selectedType, setSelectedType] = useState<SubmissionType | "all">("all")
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<FanSubmission | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  return (
    <div>
      <GalleryFilters
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Results count */}
      <div className="text-center mb-6 text-gray-400">
        Showing {sortedSubmissions.length} {sortedSubmissions.length === 1 ? "submission" : "submissions"}
      </div>

      <AnimatePresence>
        {sortedSubmissions.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedSubmissions.map((submission) => (
              <GalleryItemCard
                key={submission.id}
                submission={submission}
                onClick={() => openSubmissionModal(submission)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-matrix-green/20 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-matrix-green"
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
            <h3 className="text-xl font-bold text-white mb-2">No submissions found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <SubmissionDetailModal submission={selectedSubmission} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
