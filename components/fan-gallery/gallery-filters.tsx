"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { SubmissionType } from "@/types/fan-submissions"

interface GalleryFiltersProps {
  selectedType: SubmissionType | "all"
  onTypeChange: (type: SubmissionType | "all") => void
  sortBy: "newest" | "popular"
  onSortChange: (sort: "newest" | "popular") => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

interface TypeOption {
  value: SubmissionType | "all"
  label: string
  color: string
}

const typeOptions: TypeOption[] = [
  { value: "all", label: "All Submissions", color: "bg-keanu-silver/20 border border-keanu-silver/50" },
  { value: "art", label: "Artwork", color: "bg-matrix-green/20 border border-matrix-green/50" },
  { value: "photo", label: "Photos", color: "bg-john-wick-gold/20 border border-john-wick-gold/50" },
  { value: "video", label: "Videos", color: "bg-neo-red/20 border border-neo-red/50" },
  { value: "other", label: "Other", color: "bg-keanu-charcoal/50 border border-keanu-charcoal" },
]

export function GalleryFilters({
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
}: GalleryFiltersProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <div className="mb-8 space-y-6">
      {/* Search bar */}
      <div className="max-w-md mx-auto">
        <div
          className={cn(
            "relative flex items-center rounded-full overflow-hidden transition-all duration-300",
            isSearchFocused
              ? "ring-2 ring-matrix-green ring-offset-2 ring-offset-keanu-charcoal shadow-neo-glow"
              : "shadow-sm",
          )}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search fan submissions..."
            className="w-full py-3 px-5 pr-12 bg-black/50 backdrop-blur-sm border-none focus:ring-0 focus:outline-none text-white placeholder:text-gray-400"
            aria-label="Search fan submissions"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Clear search"
            >
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
            <div className="absolute right-4 text-gray-400">
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
            </div>
          )}
        </div>
      </div>

      {/* Type filters */}
      <div>
        <h3 className="font-heading text-center text-lg mb-4 text-white">Filter by Type</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {typeOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTypeChange(option.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-white",
                option.color,
                selectedType === option.value
                  ? "ring-2 ring-matrix-green ring-offset-2 ring-offset-keanu-charcoal"
                  : "hover:shadow-md",
              )}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sort options */}
      <div className="flex justify-center">
        <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 flex">
          <button
            onClick={() => onSortChange("newest")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
              sortBy === "newest" ? "bg-matrix-green text-black" : "text-white hover:bg-gray-800",
            )}
          >
            Newest
          </button>
          <button
            onClick={() => onSortChange("popular")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300",
              sortBy === "popular" ? "bg-matrix-green text-black" : "text-white hover:bg-gray-800",
            )}
          >
            Most Popular
          </button>
        </div>
      </div>
    </div>
  )
}
