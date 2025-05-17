"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { BlogPost } from "@/types/content"
import { TextHighlight } from "./text-highlight"

interface SearchSuggestionsProps {
  query: string
  posts: BlogPost[]
  visible: boolean
  onSelectSuggestion: (suggestion: string) => void
  onClose: () => void
}

export function SearchSuggestions({ query, posts, visible, onSelectSuggestion, onClose }: SearchSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Generate suggestions based on post titles and excerpts
  const generateSuggestions = (): string[] => {
    if (!query || query.length < 2) return []

    const lowerQuery = query.toLowerCase()
    const titleMatches = new Set<string>()
    const excerptMatches = new Set<string>()
    const allSuggestions = new Set<string>()

    // Extract words from query that are at least 3 characters
    const queryWords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length >= 3)

    // Add the full query
    allSuggestions.add(query)

    // Check post titles and excerpts for matches
    posts.forEach((post) => {
      // Check if title contains query
      if (post.title.toLowerCase().includes(lowerQuery)) {
        titleMatches.add(post.title)
      }

      // Check if any words in title match query words
      const titleWords = post.title.toLowerCase().split(/\s+/)
      queryWords.forEach((queryWord) => {
        titleWords.forEach((titleWord) => {
          if (titleWord.includes(queryWord) && titleWord.length >= 4) {
            allSuggestions.add(titleWord)
          }
        })
      })

      // Check excerpt for relevant phrases
      const excerptLower = post.excerpt.toLowerCase()
      if (excerptLower.includes(lowerQuery)) {
        // Find the sentence containing the query
        const sentences = post.excerpt.split(/[.!?]+/)
        sentences.forEach((sentence) => {
          if (sentence.toLowerCase().includes(lowerQuery)) {
            const trimmed = sentence.trim()
            if (trimmed.length > 0 && trimmed.length < 60) {
              excerptMatches.add(trimmed)
            }
          }
        })
      }

      // Extract keywords from excerpt
      const excerptWords = excerptLower.split(/\s+/)
      queryWords.forEach((queryWord) => {
        excerptWords.forEach((excerptWord) => {
          if (excerptWord.includes(queryWord) && excerptWord.length >= 4) {
            allSuggestions.add(excerptWord)
          }
        })
      })
    })

    // Combine and limit suggestions
    const combinedSuggestions: string[] = []

    // Add title matches first (they're most relevant)
    titleMatches.forEach((title) => {
      if (combinedSuggestions.length < 7) {
        combinedSuggestions.push(title)
      }
    })

    // Add individual word suggestions
    allSuggestions.forEach((suggestion) => {
      if (
        combinedSuggestions.length < 7 &&
        !combinedSuggestions.includes(suggestion) &&
        suggestion.toLowerCase() !== query.toLowerCase()
      ) {
        combinedSuggestions.push(suggestion)
      }
    })

    // Add excerpt matches last
    excerptMatches.forEach((excerpt) => {
      if (combinedSuggestions.length < 7 && !combinedSuggestions.includes(excerpt)) {
        combinedSuggestions.push(excerpt)
      }
    })

    return combinedSuggestions.slice(0, 7) // Limit to 7 suggestions
  }

  const suggestions = generateSuggestions()

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible || suggestions.length === 0) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
          break
        case "Enter":
          e.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            onSelectSuggestion(suggestions[selectedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [visible, suggestions, selectedIndex, onSelectSuggestion, onClose])

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1)
  }, [suggestions])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [visible, onClose])

  if (!visible || suggestions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={suggestionsRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-50"
      >
        <div className="py-2 max-h-60 overflow-y-auto" role="listbox" aria-label="Search suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              role="option"
              aria-selected={index === selectedIndex}
              className={`px-4 py-2 cursor-pointer transition-colors duration-150 ${
                index === selectedIndex ? "bg-muted-lavender/20" : "hover:bg-warm-cream/50"
              }`}
              onClick={() => onSelectSuggestion(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <TextHighlight text={suggestion} highlight={query} className="text-sm" />
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
