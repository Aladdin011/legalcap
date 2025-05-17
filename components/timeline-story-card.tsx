"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { TimelineStory } from "@/types/stories"
import { AudioPlayer } from "./audio-player"

interface TimelineStoryCardProps {
  story: TimelineStory
  isEven: boolean
}

export function TimelineStoryCard({ story, isEven }: TimelineStoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className={`relative mb-8 md:mb-0 ${isEven ? "md:ml-auto md:mr-8 md:text-right" : "md:mr-auto md:ml-8"}`}>
      {/* Timeline dot */}
      <div className="absolute top-0 left-0 md:left-auto md:right-0 w-6 h-6 rounded-full bg-blush-pink transform -translate-x-1/2 md:translate-x-1/2 z-10">
        <div className="absolute inset-1 rounded-full bg-white"></div>
      </div>

      {/* Card */}
      <motion.div
        layout
        className={`relative ml-8 md:ml-0 bg-white rounded-lg shadow-sm overflow-hidden ${
          isExpanded ? "ring-2 ring-muted-lavender" : "hover:shadow-md"
        }`}
        style={{ maxWidth: "500px" }}
      >
        <div
          className="p-5 cursor-pointer"
          onClick={toggleExpand}
          role="button"
          aria-expanded={isExpanded}
          aria-controls={`story-content-${story.id}`}
        >
          <div className="flex items-center mb-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted-lavender/30">
                {story.author.avatar && (
                  <Image
                    src={story.author.avatar || "/placeholder.svg"}
                    alt={story.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-deep-charcoal">{story.author.name}</p>
              <p className="text-xs text-deep-charcoal/60">{formatDate(story.date)}</p>
            </div>
          </div>

          <h3 className="font-heading text-xl mb-2">{story.title}</h3>
          <p className="text-deep-charcoal/80">{story.summary}</p>

          <div className="mt-3 flex items-center text-muted-lavender">
            <span className="text-sm">{isExpanded ? "Read less" : "Read more"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={`story-content-${story.id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-5 pb-5"
            >
              <div className="pt-2 border-t border-warm-cream/50">
                <div className="prose prose-sm max-w-none text-deep-charcoal/90">
                  {story.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {story.audioUrl && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Listen to {story.author.name}'s story</h4>
                    <AudioPlayer audioUrl={story.audioUrl} title={story.title} />
                  </div>
                )}

                {story.tags && story.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-warm-cream text-deep-charcoal"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
