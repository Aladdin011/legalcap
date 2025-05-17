"use client"

import { motion } from "framer-motion"
import type { Category, Mood } from "@/types/content"

interface FilterSummaryProps {
  selectedMood: Mood
  selectedCategory: Category | null
  searchQuery: string
  clearFilters: () => void
  totalPosts: number
  filteredCount: number
}

const getMoodLabel = (mood: Mood): string => {
  switch (mood) {
    case "happy":
      return "Uplifting"
    case "neutral":
      return "Balanced"
    case "sad":
      return "Supportive"
    default:
      return ""
  }
}

const getCategoryLabel = (category: Category | null): string => {
  if (!category) return ""

  return category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")
}

export function FilterSummary({
  selectedMood,
  selectedCategory,
  searchQuery,
  clearFilters,
  totalPosts,
  filteredCount,
}: FilterSummaryProps) {
  const hasActiveFilters = selectedMood !== null || selectedCategory !== null || searchQuery !== ""

  if (!hasActiveFilters) return null

  const filterParts: string[] = []

  if (searchQuery) {
    filterParts.push(`matching "${searchQuery}"`)
  }

  if (selectedMood) {
    filterParts.push(getMoodLabel(selectedMood))
  }

  if (selectedCategory) {
    filterParts.push(getCategoryLabel(selectedCategory))
  }

  let filterText = "Showing "

  if (filterParts.length === 1) {
    filterText += `${filterParts[0]} content`
  } else if (filterParts.length === 2) {
    filterText += `${filterParts[0]} ${filterParts[1]} content`
  } else if (filterParts.length === 3) {
    filterText += `${filterParts[0]} ${filterParts[1]} ${filterParts[2]} content`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-wrap items-center justify-center gap-2 mb-6 text-sm"
    >
      <span className="text-deep-charcoal/70">
        {filterText} ({filteredCount} of {totalPosts})
      </span>
      <button
        onClick={clearFilters}
        className="text-muted-lavender hover:text-deep-charcoal underline underline-offset-2 transition-colors duration-300"
      >
        Clear filters
      </button>
    </motion.div>
  )
}
