"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import Image from "next/image"

interface SubmissionFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SubmissionFormModal({ isOpen, onClose }: SubmissionFormModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    name: "",
    email: "",
    country: "",
    tags: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isMounted, setIsMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Set up mounted state for client-side rendering
  useState(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  })

  // Handle input change
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

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: "File is too large. Maximum size is 5MB." }))
      return
    }

    setFile(selectedFile)
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors.file
      return newErrors
    })

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required"
      if (!formData.type) newErrors.type = "Please select a submission type"
      if (!file) newErrors.file = "Please upload a file"
      if (!formData.description.trim()) newErrors.description = "Description is required"
    } else if (step === 2) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    if (step === 1) {
      setStep(2)
      return
    }

    // Submit form
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  // Handle escape key press
  useState(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (overlayRef.current === e.target) {
      onClose()
    }
  }

  // Reset form when closing
  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(1)
      setFormData({
        title: "",
        type: "",
        description: "",
        name: "",
        email: "",
        country: "",
        tags: "",
      })
      setFile(null)
      setPreview(null)
      setErrors({})
      setIsSubmitted(false)
    }, 300)
  }

  if (!isMounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-heading font-bold text-black">
                {isSubmitted ? "Submission Complete" : "Submit Your Fan Art"}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
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
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-grow p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-matrix-green/10 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-matrix-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">Thank You for Your Submission!</h3>
                  <p className="text-gray-700 mb-6">
                    Your fan art has been submitted successfully. Our team will review it shortly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-matrix-green transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step indicator */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 1 ? "bg-black text-white" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        1
                      </div>
                      <div className={`w-16 h-0.5 ${step >= 2 ? "bg-black" : "bg-gray-100"}`}></div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 2 ? "bg-black text-white" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        2
                      </div>
                    </div>
                  </div>

                  {/* Step 1: Submission Details */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-matrix-green focus:border-transparent"
                          placeholder="Give your submission a title"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                      </div>

                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                          Submission Type
                        </label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-matrix-green focus:border-transparent"
                        >
                          <option value="">Select a type</option>
                          <option value="art">Artwork</option>
                          <option value="photo">Photo</option>
                          <option value="video">Video</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                            errors.file
                              ? "border-red-300 bg-red-50"
                              : preview
                                ? "border-matrix-green/30 bg-matrix-green/5"
                                : "border-gray-200 hover:border-gray-300 bg-gray-50"
                          }`}
                        >
                          {preview ? (
                            <div className="relative aspect-video w-full max-h-48 overflow-hidden rounded-md">
                              <Image
                                src={preview || "/placeholder.svg"}
                                alt="Preview"
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 mx-auto text-gray-400 mb-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                              <p className="text-gray-700 mb-1">Click to upload or drag and drop</p>
                              <p className="text-gray-500 text-sm">PNG, JPG, GIF, MP4 (max 5MB)</p>
                            </>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*, video/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                        {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
                        {preview && (
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-sm text-gray-500 truncate max-w-xs">{file?.name}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFile(null)
                                setPreview(null)
                                if (fileInputRef.current) fileInputRef.current.value = ""
                              }}
                              className="text-sm text-gray-500 hover:text-black"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-matrix-green focus:border-transparent"
                          placeholder="Tell us about your submission..."
                        ></textarea>
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                      </div>

                      <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                          Tags (Optional)
                        </label>
                        <input
                          type="text"
                          id="tags"
                          name="tags"
                          value={formData.tags}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-matrix-green focus:border-transparent"
                          placeholder="matrix, neo, john-wick (comma separated)"
                        />
                        <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Creator Information */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-matrix-green focus:border-transparent"
                          placeholder="Enter your name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-matrix-green focus:border-transparent"
                          placeholder="Enter your email address"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        <p className="mt-1 text-xs text-gray-500">Your email will not be displayed publicly</p>
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country (Optional)
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-matrix-green focus:border-transparent"
                          placeholder="Enter your country"
                        />
                      </div>

                      <div className="pt-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-black font-medium mb-2">Submission Guidelines</h4>
                          <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                            <li>All submissions must be your original work</li>
                            <li>Inappropriate or offensive content will be removed</li>
                            <li>By submitting, you grant us permission to display your work</li>
                            <li>We may feature exceptional submissions on our social media</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex justify-between pt-4">
                    {step === 2 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Back
                      </motion.button>
                    ) : (
                      <div></div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        isSubmitting
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-black text-white hover:bg-matrix-green"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      ) : step === 1 ? (
                        "Continue"
                      ) : (
                        "Submit"
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
