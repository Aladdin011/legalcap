"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import type { BlogPost } from "@/types/content"
import { SearchSuggestions } from "./search-suggestions"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  posts: BlogPost[]
}

export function SearchBar({ onSearch, placeholder = "Search articles...", posts }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle input change with debounce
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    // Show suggestions if query is at least 2 characters
    setShowSuggestions(value.length >= 2)

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      onSearch(value)
    }, 300) // 300ms debounce
  }

  // Clear search
  const handleClear = () => {
    setQuery("")
    setShowSuggestions(false)
    onSearch("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }

  // Close suggestions
  const handleCloseSuggestions = () => {
    setShowSuggestions(false)
  }

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true)
    if (query.length >= 2) {
      setShowSuggestions(true)
    }
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative flex items-center rounded-full overflow-hidden transition-all duration-300 ${
          isFocused ? "ring-2 ring-muted-lavender ring-offset-2 ring-offset-warm-cream shadow-md" : "shadow-sm"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full py-3 px-5 pr-12 bg-white/80 backdrop-blur-sm border-none focus:ring-0 focus:outline-none text-deep-charcoal placeholder:text-deep-charcoal/50"
          aria-label="Search articles"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-expanded={showSuggestions}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 text-deep-charcoal/50 hover:text-deep-charcoal transition-colors duration-200"
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
        )}
        {!query && (
          <div className="absolute right-4 text-deep-charcoal/50">
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

        {/* Search Suggestions */}
        <SearchSuggestions
          query={query}
          posts={posts}
          visible={showSuggestions}
          onSelectSuggestion={handleSelectSuggestion}
          onClose={handleCloseSuggestions}
        />
      </motion.div>
    </div>
  )
}
