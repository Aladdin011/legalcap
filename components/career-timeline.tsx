"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

interface TimelineEvent {
  id: string
  year: string
  title: string
  role?: string
  description: string
  imageUrl: string
  category: "film" | "award" | "milestone"
  link?: string
}

export function CareerTimeline() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "film" | "award" | "milestone">("all")
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Timeline data
  const timelineEvents: TimelineEvent[] = [
    {
      id: "bill-ted",
      year: "1989",
      title: "Bill & Ted's Excellent Adventure",
      role: "Ted 'Theodore' Logan",
      description:
        "Keanu's breakthrough role as the lovable slacker Ted in this cult classic comedy about two friends who travel through time to complete their history project.",
      imageUrl: "/timeline/bill-ted.jpg",
      category: "film",
      link: "/filmography/bill-ted",
    },
    {
      id: "point-break",
      year: "1991",
      title: "Point Break",
      role: "Johnny Utah",
      description:
        "As FBI agent Johnny Utah, Keanu infiltrates a group of surfers suspected of being bank robbers, leading to one of the most iconic action films of the 90s.",
      imageUrl: "/timeline/point-break.jpg",
      category: "film",
      link: "/filmography/point-break",
    },
    {
      id: "speed",
      year: "1994",
      title: "Speed",
      role: "Officer Jack Traven",
      description:
        "Keanu stars as LAPD officer Jack Traven who must prevent a bomb from exploding on a city bus by keeping its speed above 50 mph.",
      imageUrl: "/timeline/speed.jpg",
      category: "film",
      link: "/filmography/speed",
    },
    {
      id: "matrix",
      year: "1999",
      title: "The Matrix",
      role: "Neo",
      description:
        "In his most iconic role as Neo, Keanu discovers that the world is a simulation and he is destined to be 'The One' who will save humanity.",
      imageUrl: "/timeline/matrix.jpg",
      category: "film",
      link: "/filmography/matrix",
    },
    {
      id: "hollywood-star",
      year: "2005",
      title: "Hollywood Walk of Fame",
      description:
        "Keanu receives his star on the Hollywood Walk of Fame, cementing his status as one of Hollywood's most beloved actors.",
      imageUrl: "/timeline/walk-of-fame.jpg",
      category: "milestone",
    },
    {
      id: "john-wick",
      year: "2014",
      title: "John Wick",
      role: "John Wick",
      description:
        "Keanu reinvents himself as the legendary hitman John Wick, launching a successful franchise and revitalizing his action star status.",
      imageUrl: "/timeline/john-wick.jpg",
      category: "film",
      link: "/filmography/john-wick",
    },
    {
      id: "toy-story-4",
      year: "2019",
      title: "Toy Story 4",
      role: "Duke Caboom",
      description:
        "Keanu voices the Canadian daredevil toy Duke Caboom in this acclaimed Pixar sequel, showcasing his versatility as a performer.",
      imageUrl: "/timeline/toy-story.jpg",
      category: "film",
      link: "/filmography/toy-story-4",
    },
    {
      id: "matrix-resurrections",
      year: "2021",
      title: "The Matrix Resurrections",
      role: "Neo",
      description:
        "Keanu returns to the role of Neo in this fourth installment of the Matrix franchise, exploring new themes and expanding the universe.",
      imageUrl: "/timeline/matrix-resurrections.jpg",
      category: "film",
      link: "/filmography/matrix-resurrections",
    },
    {
      id: "john-wick-4",
      year: "2023",
      title: "John Wick: Chapter 4",
      role: "John Wick",
      description:
        "The fourth installment in the John Wick franchise sees Keanu's character fighting his way to freedom against increasingly powerful enemies.",
      imageUrl: "/timeline/john-wick-4.jpg",
      category: "film",
      link: "/filmography/john-wick-4",
    },
  ]

  // Filter events based on selected category
  const filteredEvents =
    selectedFilter === "all" ? timelineEvents : timelineEvents.filter((event) => event.category === selectedFilter)

  // Handle event click
  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event)
  }

  // Close detail modal
  const closeDetail = () => {
    setSelectedEvent(null)
  }

  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "film":
        return "bg-matrix-green text-black"
      case "award":
        return "bg-john-wick-gold text-black"
      case "milestone":
        return "bg-neo-red text-white"
      default:
        return "bg-gray-200 text-black"
    }
  }

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Career Timeline</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore Keanu Reeves' remarkable journey through Hollywood, from his breakout roles to his most iconic
            performances.
          </p>

          {/* Category filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "all" ? "bg-black text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedFilter("film")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "film" ? "bg-matrix-green text-black" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Films
            </button>
            <button
              onClick={() => setSelectedFilter("award")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "award"
                  ? "bg-john-wick-gold text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Awards
            </button>
            <button
              onClick={() => setSelectedFilter("milestone")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "milestone" ? "bg-neo-red text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Milestones
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative min-h-[800px]">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200"></div>

          {/* Animated progress line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-px bg-matrix-green z-10"
            style={{ height: lineHeight }}
          ></motion.div>

          {/* Timeline events */}
          <div className="relative">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`mb-16 flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} relative`}
              >
                {/* Year marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-matrix-green flex items-center justify-center z-20">
                    <span className="text-xs font-bold">{event.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.imageUrl || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}
                        >
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading font-medium text-lg mb-1">{event.title}</h3>
                      {event.role && <p className="text-sm text-gray-500 mb-2">Role: {event.role}</p>}
                      <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                      <button className="mt-4 text-sm font-medium text-matrix-green hover:underline">Learn more</button>
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeDetail}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-80">
                <Image
                  src={selectedEvent.imageUrl || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={closeDetail}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedEvent.category)}`}
                    >
                      {selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/50 text-white text-xs font-medium">
                      {selectedEvent.year}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">{selectedEvent.title}</h2>
                  {selectedEvent.role && <p className="text-gray-300">Role: {selectedEvent.role}</p>}
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <p className="text-gray-700 mb-6">{selectedEvent.description}</p>

                {/* Additional content could go here - quotes, trivia, etc. */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Did you know?</h3>
                  <p className="text-sm text-gray-600">
                    {selectedEvent.id === "matrix"
                      ? "Keanu trained for four months prior to filming The Matrix, learning over 200 martial arts moves."
                      : selectedEvent.id === "john-wick"
                        ? "Keanu performed about 90% of the fight scenes himself in the original John Wick film."
                        : "Keanu is known for his generosity on set, often giving gifts to crew members and taking pay cuts to ensure projects get made."}
                  </p>
                </div>

                {selectedEvent.link && (
                  <Link
                    href={selectedEvent.link}
                    className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-matrix-green hover:text-black transition-colors"
                  >
                    View Full Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
