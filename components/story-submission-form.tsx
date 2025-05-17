"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Modal } from "./modal"

interface FormData {
  name: string
  email: string
  title: string
  summary: string
  content: string
  tags: string[]
  audioFile: File | null
  consent: boolean
}

interface FormErrors {
  name?: string
  email?: string
  title?: string
  summary?: string
  content?: string
  consent?: string
}

const availableTags = [
  "anxiety",
  "depression",
  "grief",
  "trauma",
  "healing",
  "therapy",
  "mindfulness",
  "self-care",
  "relationships",
  "boundaries",
  "community",
  "growth",
  "recovery",
  "meditation",
  "art-therapy",
  "movement",
]

export function StorySubmissionForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    title: "",
    summary: "",
    content: "",
    tags: [],
    audioFile: null,
    consent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const audioInputRef = useRef<HTMLInputElement>(null)

  const openModal = () => {
    setIsModalOpen(true)
    // Reset form when opening
    setCurrentStep(1)
    setIsSubmitted(false)
    setFormData({
      name: "",
      email: "",
      title: "",
      summary: "",
      content: "",
      tags: [],
      audioFile: null,
      consent: false,
    })
    setErrors({})
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))

    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => {
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter((t) => t !== tag) }
      } else {
        return { ...prev, tags: [...prev.tags, tag] }
      }
    })
  }

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, audioFile: file }))
  }

  const clearAudioFile = () => {
    setFormData((prev) => ({ ...prev, audioFile: null }))
    if (audioInputRef.current) {
      audioInputRef.current.value = ""
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required"
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }

      if (!formData.title.trim()) {
        newErrors.title = "Title is required"
      }

      if (!formData.summary.trim()) {
        newErrors.summary = "Summary is required"
      } else if (formData.summary.length > 150) {
        newErrors.summary = "Summary should be 150 characters or less"
      }
    }

    if (step === 2) {
      if (!formData.content.trim()) {
        newErrors.content = "Story content is required"
      } else if (formData.content.length < 100) {
        newErrors.content = "Please share a bit more about your experience (minimum 100 characters)"
      }
    }

    if (step === 3) {
      if (!formData.consent) {
        newErrors.consent = "Please confirm your consent to share your story"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
        className="px-6 py-3 bg-white rounded-full shadow-sm text-deep-charcoal hover:bg-warm-cream/70 transition-colors duration-300"
      >
        Share Your Story
      </motion.button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Share Your Story">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-deep-charcoal/80 mb-6">
                  Thank you for your courage in sharing your story. Your experience may help others feel less alone in
                  their journey.
                </p>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-deep-charcoal mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md bg-white border ${
                      errors.name ? "border-red-300" : "border-warm-cream/70"
                    } focus:outline-none focus:ring-2 focus:ring-muted-lavender`}
                    placeholder="Full name or first name with last initial"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-deep-charcoal mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md bg-white border ${
                      errors.email ? "border-red-300" : "border-warm-cream/70"
                    } focus:outline-none focus:ring-2 focus:ring-muted-lavender`}
                    placeholder="Your email (will not be published)"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-deep-charcoal mb-1">
                    Story Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md bg-white border ${
                      errors.title ? "border-red-300" : "border-warm-cream/70"
                    } focus:outline-none focus:ring-2 focus:ring-muted-lavender`}
                    placeholder="Give your story a meaningful title"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-deep-charcoal mb-1">
                    Brief Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    rows={2}
                    className={`w-full px-4 py-2 rounded-md bg-white border ${
                      errors.summary ? "border-red-300" : "border-warm-cream/70"
                    } focus:outline-none focus:ring-2 focus:ring-muted-lavender`}
                    placeholder="A brief summary of your story (150 characters max)"
                    maxLength={150}
                  ></textarea>
                  <p className="mt-1 text-xs text-deep-charcoal/60 text-right">
                    {formData.summary.length}/150 characters
                  </p>
                  {errors.summary && <p className="mt-1 text-sm text-red-500">{errors.summary}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Story Content */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-deep-charcoal/80 mb-6">
                  Share your experience in your own words. Focus on what you feel comfortable sharing and what might
                  help others in similar situations.
                </p>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-deep-charcoal mb-1">
                    Your Story <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={10}
                    className={`w-full px-4 py-2 rounded-md bg-white border ${
                      errors.content ? "border-red-300" : "border-warm-cream/70"
                    } focus:outline-none focus:ring-2 focus:ring-muted-lavender`}
                    placeholder="Share your experience, journey, challenges, and insights..."
                  ></textarea>
                  {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                  <p className="mt-1 text-xs text-deep-charcoal/60">
                    Tip: Use paragraphs to make your story easier to read. You can share as much or as little as you
                    feel comfortable with.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">Tags (Optional)</label>
                  <p className="text-xs text-deep-charcoal/60 mb-3">
                    Select tags that relate to your story to help others find similar experiences.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                          formData.tags.includes(tag)
                            ? "bg-muted-lavender/50 text-deep-charcoal"
                            : "bg-warm-cream/50 text-deep-charcoal/70 hover:bg-warm-cream"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-deep-charcoal mb-2">
                    Audio Recording (Optional)
                  </label>
                  <p className="text-xs text-deep-charcoal/60 mb-3">
                    You can optionally share your story in your own voice. Supported formats: MP3, WAV (max 10MB)
                  </p>

                  {!formData.audioFile ? (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="audio-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-warm-cream/70 rounded-lg cursor-pointer bg-warm-cream/20 hover:bg-warm-cream/30 transition-colors duration-200"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-3 text-deep-charcoal/60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-deep-charcoal/70">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-deep-charcoal/60">MP3 or WAV (MAX. 10MB)</p>
                        </div>
                        <input
                          id="audio-upload"
                          ref={audioInputRef}
                          type="file"
                          accept="audio/mp3,audio/wav"
                          className="hidden"
                          onChange={handleAudioUpload}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-warm-cream/30 rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="w-6 h-6 mr-2 text-deep-charcoal/70"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                          ></path>
                        </svg>
                        <span className="text-sm truncate max-w-xs">{formData.audioFile.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={clearAudioFile}
                        className="p-1 text-deep-charcoal/70 hover:text-deep-charcoal rounded-full hover:bg-warm-cream/50"
                        aria-label="Remove audio file"
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
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Consent and Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-warm-cream/30 p-4 rounded-lg">
                  <h3 className="font-heading text-lg mb-2">Review Your Submission</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Title:</p>
                      <p className="text-deep-charcoal/80">{formData.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Summary:</p>
                      <p className="text-deep-charcoal/80">{formData.summary}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tags:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.tags.length > 0 ? (
                          formData.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-warm-cream text-deep-charcoal"
                            >
                              #{tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-deep-charcoal/60 text-sm">No tags selected</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Audio:</p>
                      <p className="text-deep-charcoal/80">
                        {formData.audioFile ? formData.audioFile.name : "No audio uploaded"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={formData.consent}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-muted-lavender border-warm-cream/70 rounded focus:ring-muted-lavender"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="consent" className="font-medium text-deep-charcoal">
                        I consent to share my story <span className="text-red-500">*</span>
                      </label>
                      <p className="text-deep-charcoal/70">
                        I understand that my story may be published on the Mindful Sanctuary Blog. My email will not be
                        published or shared.
                      </p>
                      {errors.consent && <p className="mt-1 text-sm text-red-500">{errors.consent}</p>}
                    </div>
                  </div>

                  <p className="text-sm text-deep-charcoal/70">
                    Note: Our team reviews all submissions before publishing. We may make minor edits for clarity or
                    length, but will preserve the essence of your story.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 text-deep-charcoal bg-warm-cream/50 hover:bg-warm-cream rounded-md transition-colors duration-200"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 text-deep-charcoal bg-muted-lavender/40 hover:bg-muted-lavender/60 rounded-md transition-colors duration-200"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 text-deep-charcoal rounded-md transition-colors duration-200 ${
                    isSubmitting
                      ? "bg-muted-lavender/30 cursor-not-allowed"
                      : "bg-muted-lavender/40 hover:bg-muted-lavender/60"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-deep-charcoal"
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
                      Submitting...
                    </span>
                  ) : (
                    "Submit Your Story"
                  )}
                </button>
              )}
            </div>

            {/* Step indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep >= step
                            ? "bg-muted-lavender/50 text-deep-charcoal"
                            : "bg-warm-cream/50 text-deep-charcoal/50"
                        }`}
                      >
                        {step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-10 h-0.5 ${currentStep > step ? "bg-muted-lavender/50" : "bg-warm-cream/50"}`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-deep-charcoal/60 px-1">
                <span>Basic Info</span>
                <span>Your Story</span>
                <span>Review</span>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted-lavender/30 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-deep-charcoal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl mb-4">Thank You for Sharing Your Story</h3>
            <p className="text-deep-charcoal/80 mb-6 max-w-md mx-auto">
              Your submission has been received and will be reviewed by our team. We appreciate your courage in sharing
              your journey with our community.
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-muted-lavender/40 hover:bg-muted-lavender/60 text-deep-charcoal rounded-md transition-colors duration-200"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </>
  )
}
