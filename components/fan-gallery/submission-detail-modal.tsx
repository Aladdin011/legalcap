"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import type { FanSubmission } from "@/types/fan-submissions"

interface SubmissionDetailModalProps {
  submission: FanSubmission | null
  isOpen: boolean
  onClose: () => void
}

export function SubmissionDetailModal({ submission, isOpen, onClose }: SubmissionDetailModalProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Set up mounted state for client-side rendering
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Set initial like count when submission changes
  useEffect(() => {
    if (submission) {
      setLikeCount(submission.likes)
      setIsLiked(false)
    }
  }, [submission])

  // Handle like toggle
  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (overlayRef.current === e.target) {
      onClose()
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get category badge color
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

  if (!isMounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && submission && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-heading font-bold text-black">{submission.title}</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-grow">
              {/* Media */}
              <div className="relative">
                {submission.type === "video" && submission.videoUrl ? (
                  <div className="aspect-video w-full">
                    <iframe
                      src={submission.videoUrl}
                      title={submission.title}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="relative aspect-video w-full bg-gray-50">
                    <Image
                      src={submission.imageUrl || "/placeholder.svg?height=600&width=800"}
                      alt={submission.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden mr-3">
                    {submission.creator.avatar ? (
                      <Image
                        src={submission.creator.avatar || "/placeholder.svg"}
                        alt={submission.creator.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg text-gray-500">
                        {submission.creator.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-black">{submission.creator.name}</p>
                    <p className="text-sm text-gray-500">
                      {submission.creator.country && `${submission.creator.country} • `}
                      {formatDate(submission.dateSubmitted)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(submission.type)}`}>
                    {submission.type.charAt(0).toUpperCase() + submission.type.slice(1)}
                  </span>
                  {submission.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-john-wick-gold/10 text-john-wick-gold border border-john-wick-gold/30">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-gray-700 mb-6">{submission.description}</p>

                {/* Tags */}
                {submission.tags && submission.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {submission.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={handleLikeToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked
                        ? "bg-john-wick-gold/10 text-john-wick-gold"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${isLiked ? "fill-john-wick-gold" : "fill-none"}`}
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
                    <span>{likeCount}</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label="Share"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                    <button
                      className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label="Report"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
