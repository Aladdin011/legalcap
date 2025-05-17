"use client"

import { motion } from "framer-motion"
import type { Category } from "@/types/content"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  selectedCategory: Category | null
  onCategoryChange: (category: Category | null) => void
}

interface CategoryOption {
  value: Category | null
  label: string
  color: string
}

const categoryOptions: CategoryOption[] = [
  { value: null, label: "All", color: "bg-warm-cream border border-deep-charcoal/20" },
  { value: "mindfulness", label: "Mindfulness", color: "bg-tag-mindfulness" },
  { value: "self-care", label: "Self-Care", color: "bg-tag-selfcare" },
  { value: "meditation", label: "Meditation", color: "bg-muted-lavender/40" },
  { value: "healing", label: "Healing", color: "bg-blush-pink/60" },
  { value: "community", label: "Community", color: "bg-sage-green/40" },
]

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="font-heading text-center text-lg mb-4">Filter by Category</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {categoryOptions.map((option) => (
          <motion.button
            key={String(option.value || "all")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(option.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              option.color,
              selectedCategory === option.value
                ? "ring-2 ring-deep-charcoal/40 ring-offset-2 ring-offset-warm-cream"
                : "hover:shadow-md",
            )}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
