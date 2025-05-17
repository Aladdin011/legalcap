"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { BlogPost, Mood, Category } from "@/types/content"
import { BlogCard } from "./blog-card"
import { MoodFilter } from "./mood-filter"
import { CategoryFilter } from "./category-filter"
import { SearchBar } from "./search-bar"
import { FilterSummary } from "./filter-summary"
import { Pagination } from "./pagination"

interface FeaturedContentGridProps {
  posts: BlogPost[]
}

export function FeaturedContentGrid({ posts }: FeaturedContentGridProps) {
  const [selectedMood, setSelectedMood] = useState<Mood>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  // Filter posts by mood, category, and search query
  const filteredPosts = posts.filter((post) => {
    const matchesMood = selectedMood === null || post.mood === selectedMood
    const matchesCategory = selectedCategory === null || post.category === selectedCategory

    // Search in title and excerpt
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesMood && matchesCategory && matchesSearch
  })

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedMood, selectedCategory, searchQuery])

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    // Scroll to top of grid with smooth animation
    document.getElementById("content-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })
    setCurrentPage(pageNumber)
  }

  // Handle mood change
  const handleMoodChange = (mood: Mood) => {
    setSelectedMood(mood)
  }

  // Handle category change
  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category)
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedMood(null)
    setSelectedCategory(null)
    setSearchQuery("")
  }

  // Helper function to determine column span based on post height
  const getColumnSpan = (height: "small" | "medium" | "large" | undefined) => {
    switch (height) {
      case "small":
        return "col-span-1"
      case "large":
        return "col-span-2"
      case "medium":
      default:
        return "col-span-1 md:col-span-1"
    }
  }

  // Helper function to determine row span based on post height
  const getRowSpan = (height: "small" | "medium" | "large" | undefined) => {
    switch (height) {
      case "small":
        return "row-span-1"
      case "large":
        return "row-span-2"
      case "medium":
      default:
        return "row-span-1 md:row-span-1"
    }
  }

  return (
    <section id="content-grid" className="py-16 px-4 md:px-8 bg-warm-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-center mb-6">Explore Our Content</h2>
        <p className="text-center max-w-2xl mx-auto mb-10 text-deep-charcoal/80">
          Discover articles, guides, and stories tailored to support your wellbeing journey, wherever you are on your
          path.
        </p>

        <SearchBar onSearch={handleSearch} placeholder="Search for topics, keywords, or phrases..." posts={posts} />

        <div className="mb-8">
          <MoodFilter selectedMood={selectedMood} onMoodChange={handleMoodChange} />
        </div>

        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

        <AnimatePresence>
          {(selectedMood !== null || selectedCategory !== null || searchQuery !== "") && (
            <FilterSummary
              selectedMood={selectedMood}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              clearFilters={clearFilters}
              totalPosts={posts.length}
              filteredCount={filteredPosts.length}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`grid-${currentPage}-${selectedMood}-${selectedCategory}-${searchQuery}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min"
          >
            {currentPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                className={`${getColumnSpan(post.height)} ${getRowSpan(post.height)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <BlogCard post={post} searchQuery={searchQuery} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-xl text-deep-charcoal/70">No content matches your current filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-muted-lavender/30 hover:bg-muted-lavender/50 rounded-full transition-colors duration-300"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {filteredPosts.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </section>
  )
}
