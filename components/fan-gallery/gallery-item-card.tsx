"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { FanSubmission } from "@/types/fan-submissions"
import { cn } from "@/lib/utils"

interface GalleryItemCardProps {
  submission: FanSubmission
  onClick: () => void
}

export function GalleryItemCard({ submission, onClick }: GalleryItemCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "art":
        return "bg-matrix-green text-black"
      case "photo":
        return "bg-john-wick-gold text-black"
      case "video":
        return "bg-neo-red text-white"
      default:
        return "bg-keanu-silver text-black"
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="group h-full rounded-lg bg-black/40 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-neo-glow transition-all duration-300 cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={submission.thumbnailUrl || submission.imageUrl || "/placeholder.svg?height=400&width=400"}
            alt={submission.title}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
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

          {/* Featured badge */}
          {submission.featured && (
            <div className="absolute top-2 right-2 bg-john-wick-gold text-black text-xs font-bold px-2 py-1 rounded">
              FEATURED
            </div>
          )}

          {/* Type badge */}
          <div
            className={`absolute top-2 left-2 ${getTypeBadgeColor(submission.type)} text-xs font-bold px-2 py-1 rounded`}
          >
            {submission.type.toUpperCase()}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-heading font-semibold text-lg mb-1 text-white group-hover:text-matrix-green transition-colors duration-300 line-clamp-1">
            {submission.title}
          </h3>

          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-keanu-charcoal overflow-hidden mr-2">
              {submission.creator.avatar ? (
                <Image
                  src={submission.creator.avatar || "/placeholder.svg"}
                  alt={submission.creator.name}
                  width={24}
                  height={24}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-white">
                  {submission.creator.name.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-300">{submission.creator.name}</span>
            {submission.creator.country && (
              <span className="text-xs text-gray-400 ml-1">• {submission.creator.country}</span>
            )}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{formatDate(submission.dateSubmitted)}</span>
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
              <span>{submission.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
