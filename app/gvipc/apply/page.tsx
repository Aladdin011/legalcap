"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function GVIPCApplicationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    favoriteMovie: "",
    whyFan: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const favoriteMovies = [
    "The Matrix",
    "John Wick",
    "Speed",
    "Point Break",
    "Bill & Ted's Excellent Adventure",
    "Constantine",
    "The Devil's Advocate",
    "47 Ronin",
    "A Scanner Darkly",
    "The Lake House",
    "Other",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.favoriteMovie) {
      newErrors.favoriteMovie = "Please select your favorite Keanu movie"
    }

    if (!formData.whyFan.trim()) {
      newErrors.whyFan = "Please tell us why you're a fan"
    } else if (formData.whyFan.length > 250) {
      newErrors.whyFan = "Please keep your response to 250 characters or less"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/gvipc/challenge")
    }, 1500)
  }

  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-white">GVIPC Membership Card</h1>
            <p className="text-lg text-brand-silver max-w-3xl mx-auto">
              Join the Global VIP Partnership Club and get exclusive access to Keanu content, events, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Column */}
            <div className="bg-brand-gray p-6 md:p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-brand-white">Application Form</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-brand-silver mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-light-gray border border-brand-gray rounded-md text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-silver mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-light-gray border border-brand-gray rounded-md text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="favoriteMovie" className="block text-sm font-medium text-brand-silver mb-1">
                    Favorite Keanu Movie
                  </label>
                  <select
                    id="favoriteMovie"
                    name="favoriteMovie"
                    value={formData.favoriteMovie}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-brand-light-gray border border-brand-gray rounded-md text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  >
                    <option value="">Select a movie</option>
                    {favoriteMovies.map((movie) => (
                      <option key={movie} value={movie}>
                        {movie}
                      </option>
                    ))}
                  </select>
                  {errors.favoriteMovie && <p className="mt-1 text-sm text-red-500">{errors.favoriteMovie}</p>}
                </div>

                <div>
                  <label htmlFor="whyFan" className="block text-sm font-medium text-brand-silver mb-1">
                    Why I'm a Fan (250 characters max)
                  </label>
                  <textarea
                    id="whyFan"
                    name="whyFan"
                    value={formData.whyFan}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-brand-light-gray border border-brand-gray rounded-md text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    placeholder="Tell us why you're a fan of Keanu Reeves..."
                    maxLength={250}
                  ></textarea>
                  <p className="mt-1 text-xs text-brand-silver text-right">{formData.whyFan.length}/250 characters</p>
                  {errors.whyFan && <p className="mt-1 text-sm text-red-500">{errors.whyFan}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-md text-lg font-medium transition-all duration-300 ${
                      isSubmitting
                        ? "bg-brand-light-gray text-brand-silver cursor-not-allowed"
                        : "bg-gradient-accent text-brand-white hover:shadow-accent-glow"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Card Preview Column */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md aspect-[1.6/1] card-3d">
                <div className="absolute inset-0 bg-gradient-accent rounded-xl overflow-hidden shadow-subtle-glow border border-brand-accent/30">
                  <div className="absolute inset-0 p-6 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-brand-white text-xl font-bold">GVIPC</h3>
                        <p className="text-brand-silver text-xs">Global VIP Partnership Club</p>
                      </div>
                      <div className="w-16 h-16 relative">
                        <div className="absolute inset-0 bg-brand-accent/20 rounded-full"></div>
                        <div className="absolute inset-1 bg-brand-dark rounded-full flex items-center justify-center">
                          <span className="text-brand-accent font-mono text-xs">KEANU</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="mb-4">
                        <p className="text-brand-silver text-xs">MEMBER NAME</p>
                        <p className="text-brand-white text-lg font-medium truncate">
                          {formData.fullName || "Your Name Here"}
                        </p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-brand-silver text-xs">MEMBER SINCE</p>
                          <p className="text-brand-white text-sm">{new Date().getFullYear()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-brand-silver text-xs">STATUS</p>
                          <p className="text-brand-accent text-sm">PREMIUM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Holographic effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-20"></div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-brand-silver text-sm max-w-md">
                  Complete your application to receive your personalized GVIPC card. After submission, you'll need to
                  complete a challenge to activate your membership.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
