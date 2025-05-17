"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []

    // Always show first page
    pageNumbers.push(1)

    // Calculate range around current page
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push("ellipsis-start")
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis-end")
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex justify-center items-center mt-12" aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        {/* Previous button */}
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
              currentPage === 1
                ? "text-deep-charcoal/30 cursor-not-allowed"
                : "text-deep-charcoal hover:bg-muted-lavender/30",
            )}
            aria-label="Go to previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </li>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) => (
          <li key={`page-${index}`}>
            {page === "ellipsis-start" || page === "ellipsis-end" ? (
              <span className="w-10 h-10 flex items-center justify-center text-deep-charcoal/60">...</span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => typeof page === "number" && onPageChange(page)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
                  currentPage === page
                    ? "bg-muted-lavender/50 text-deep-charcoal font-medium"
                    : "text-deep-charcoal hover:bg-muted-lavender/30",
                )}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </motion.button>
            )}
          </li>
        ))}

        {/* Next button */}
        <li>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300",
              currentPage === totalPages
                ? "text-deep-charcoal/30 cursor-not-allowed"
                : "text-deep-charcoal hover:bg-muted-lavender/30",
            )}
            aria-label="Go to next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}
