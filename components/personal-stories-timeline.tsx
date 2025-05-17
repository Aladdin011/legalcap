"use client"

import { useRef, useState } from "react"
import type { TimelineStory } from "@/types/stories"
import { TimelineStoryCard } from "./timeline-story-card"
import { StorySubmissionForm } from "./story-submission-form"
import { useMobile } from "@/hooks/use-mobile"

interface PersonalStoriesTimelineProps {
  stories: TimelineStory[]
}

export function PersonalStoriesTimeline({ stories }: PersonalStoriesTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const isMobile = useMobile()

  // Handle horizontal scroll
  const handleScroll = () => {
    if (timelineRef.current) {
      setScrollPosition(timelineRef.current.scrollLeft)
    }
  }

  // Scroll left
  const scrollLeft = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      })
    }
  }

  // Scroll right
  const scrollRight = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      })
    }
  }

  // Calculate if we can scroll more in either direction
  const canScrollLeft = scrollPosition > 0
  const canScrollRight = timelineRef.current
    ? scrollPosition < timelineRef.current.scrollWidth - timelineRef.current.clientWidth
    : true

  return (
    <section className="py-16 px-4 md:px-8 bg-warm-cream/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Personal Stories</h2>
          <p className="max-w-2xl mx-auto text-deep-charcoal/80">
            Real journeys of healing and growth, shared by our community members to inspire and connect.
          </p>
        </div>

        {/* Mobile Timeline (Vertical) */}
        {isMobile && (
          <div className="relative pl-8 border-l-2 border-blush-pink/30">
            {stories.map((story, index) => (
              <TimelineStoryCard key={story.id} story={story} isEven={index % 2 === 0} />
            ))}
          </div>
        )}

        {/* Desktop Timeline (Horizontal) */}
        {!isMobile && (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-blush-pink/30 -translate-y-1/2"></div>

            {/* Scroll buttons */}
            <div className="flex justify-between mb-4">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`p-2 rounded-full bg-white shadow-sm ${
                  canScrollLeft ? "text-deep-charcoal hover:bg-warm-cream" : "text-deep-charcoal/30"
                } transition-colors duration-300`}
                aria-label="Scroll left"
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
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`p-2 rounded-full bg-white shadow-sm ${
                  canScrollRight ? "text-deep-charcoal hover:bg-warm-cream" : "text-deep-charcoal/30"
                } transition-colors duration-300`}
                aria-label="Scroll right"
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
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Scrollable timeline */}
            <div
              ref={timelineRef}
              className="relative flex items-center overflow-x-auto pb-8 hide-scrollbar"
              onScroll={handleScroll}
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex-shrink-0 w-8"></div>
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className={`flex-shrink-0 w-[500px] mx-8 ${
                    index % 2 === 0 ? "self-start -translate-y-1/2" : "self-end translate-y-1/2"
                  }`}
                >
                  <TimelineStoryCard story={story} isEven={index % 2 === 0} />
                </div>
              ))}
              <div className="flex-shrink-0 w-8"></div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <StorySubmissionForm />
        </div>
      </div>
    </section>
  )
}
