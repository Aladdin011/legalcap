"use client"

import { motion } from "framer-motion"
import type { BlogPost } from "@/types/content"
import { CategoryTag } from "./category-tag"
import { TextHighlight } from "./text-highlight"
import Image from "next/image"

interface BlogCardProps {
  post: BlogPost
  searchQuery?: string
}

export function BlogCard({ post, searchQuery = "" }: BlogCardProps) {
  const { title, excerpt, category, image, readTime, date } = post

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="group h-full rounded-card bg-white overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
    >
      {image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex justify-between items-center">
          <CategoryTag category={category} />
          <span className="text-xs text-deep-charcoal/60">{readTime} min read</span>
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-muted-lavender transition-colors duration-300">
          <TextHighlight text={title} highlight={searchQuery} />
        </h3>
        <p className="text-deep-charcoal/80 mb-4 line-clamp-3">
          <TextHighlight text={excerpt} highlight={searchQuery} />
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-deep-charcoal/60">
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <button className="text-muted-lavender hover:text-deep-charcoal transition-colors duration-300 text-sm font-medium">
            Read more →
          </button>
        </div>
      </div>
    </motion.div>
  )
}
