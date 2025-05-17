"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

type Challenge = "quiz" | "art" | "video"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

export default function GVIPCChallengePage() {
  const router = useRouter()
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [quizScore, setQuizScore] = useState(0)
  const [showQuizResults, setShowQuizResults] = useState(false)

  // Art upload state
  const [artFile, setArtFile] = useState<File | null>(null)
  const [artPreview, setArtPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Video recording state
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [videoURL, setVideoURL] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Quiz questions
  const quizQuestions: QuizQuestion[] = [
    {
      question: "In which year was 'The Matrix' released?",
      options: ["1997", "1998", "1999", "2000"],
      correctAnswer: 2,
    },
    {
      question: "What is the name of Keanu's character in 'John Wick'?",
      options: ["John Wick", "John Smith", "Jonathan Wick", "Jardani Jovonovich"],
      correctAnswer: 0,
    },
    {
      question: "Which of these bands did Keanu Reeves play bass for?",
      options: ["Nirvana", "Dogstar", "Pearl Jam", "Foo Fighters"],
      correctAnswer: 1,
    },
  ]

  // Handle challenge selection
  const selectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge)

    if (challenge === "video") {
      // Request camera access when video challenge is selected
      setupVideoRecording()
    }
  }

  // Quiz handlers
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Calculate score
      let score = 0
      quizQuestions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correctAnswer) {
          score++
        }
      })
      setQuizScore(score)
      setShowQuizResults(true)

      // Mark as completed if score is high enough
      if (score >= 2) {
        setIsCompleted(true)
      }
    }
  }

  // Art upload handlers
  const handleArtUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.")
      return
    }

    setArtFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setArtPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Mark as completed
    setIsCompleted(true)
  }

  // Video recording handlers
  const setupVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Could not access camera. Please try another challenge or check your camera permissions.")
    }
  }

  const startRecording = () => {
    if (!streamRef.current) return

    const mediaRecorder = new MediaRecorder(streamRef.current)
    mediaRecorderRef.current = mediaRecorder

    const chunks: BlobPart[] = []
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" })
      setVideoBlob(blob)
      setVideoURL(URL.createObjectURL(blob))

      // Mark as completed if video is at least 10 seconds
      if (recordingTime >= 10) {
        setIsCompleted(true)
      }
    }

    // Start recording
    mediaRecorder.start()
    setIsRecording(true)
    setRecordingTime(0)

    // Timer for recording
    const timer = setInterval(() => {
      setRecordingTime((prev) => {
        const newTime = prev + 1

        // Stop recording after 15 seconds
        if (newTime >= 15 && mediaRecorderRef.current?.state === "recording") {
          clearInterval(timer)
          stopRecording()
        }

        return newTime
      })
    }, 1000)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }

  // Complete challenge and go to card page
  const completeChallenge = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/gvipc/card")
    }, 1500)
  }

  // Clean up resources when component unmounts
  const cleanupResources = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    if (videoURL) {
      URL.revokeObjectURL(videoURL)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-white">GVIPC Challenge</h1>
            <p className="text-lg text-brand-silver max-w-3xl mx-auto">
              Complete one of the following challenges to activate your GVIPC membership.
            </p>
          </div>

          {!selectedChallenge ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quiz Challenge */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-brand-gray p-6 rounded-xl border border-brand-accent/30 cursor-pointer hover:border-brand-accent transition-colors duration-300"
                onClick={() => selectChallenge("quiz")}
              >
                <div className="h-12 w-12 rounded-full bg-brand-accent/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-brand-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-white mb-2">Keanu Trivia Quiz</h3>
                <p className="text-brand-silver text-sm">
                  Test your knowledge of Keanu Reeves with a short quiz. Score at least 2/3 to pass.
                </p>
              </motion.div>

              {/* Art Challenge */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-brand-gray p-6 rounded-xl border border-brand-accent/30 cursor-pointer hover:border-brand-accent transition-colors duration-300"
                onClick={() => selectChallenge("art")}
              >
                <div className="h-12 w-12 rounded-full bg-brand-accent/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-brand-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-white mb-2">Fan Art Submission</h3>
                <p className="text-brand-silver text-sm">
                  Upload your Keanu-inspired fan art. Show your creativity and appreciation.
                </p>
              </motion.div>

              {/* Video Challenge */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-brand-gray p-6 rounded-xl border border-brand-accent/30 cursor-pointer hover:border-brand-accent transition-colors duration-300"
                onClick={() => selectChallenge("video")}
              >
                <div className="h-12 w-12 rounded-full bg-brand-accent/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-brand-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-white mb-2">Mini Video Tribute</h3>
                <p className="text-brand-silver text-sm">
                  Record a short video (10-15 seconds) sharing why you're a Keanu fan.
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="bg-brand-gray p-6 md:p-8 rounded-xl shadow-lg">
              {/* Challenge Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brand-white">
                  {selectedChallenge === "quiz" && "Keanu Trivia Quiz"}
                  {selectedChallenge === "art" && "Fan Art Submission"}
                  {selectedChallenge === "video" && "Mini Video Tribute"}
                </h2>
                <button
                  onClick={() => {
                    setSelectedChallenge(null)
                    setCurrentQuestionIndex(0)
                    setSelectedAnswers([])
                    setShowQuizResults(false)
                    setArtFile(null)
                    setArtPreview(null)
                    setVideoBlob(null)
                    setVideoURL(null)
                    setIsRecording(false)
                    setRecordingTime(0)
                    setIsCompleted(false)
                    cleanupResources()
                  }}
                  className="text-brand-silver hover:text-brand-white transition-colors"
                >
                  Choose Different Challenge
                </button>
              </div>

              {/* Quiz Challenge */}
              {selectedChallenge === "quiz" && !showQuizResults && (
                <div className="space-y-6">
                  <div className="flex justify-between text-sm text-brand-silver mb-4">
                    <span>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </span>
                    <span>{currentQuestionIndex + 1 > selectedAnswers.length ? "Unanswered" : "Answered"}</span>
                  </div>

                  <h3 className="text-xl text-brand-white">{quizQuestions[currentQuestionIndex].question}</h3>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`p-4 rounded-md cursor-pointer transition-colors ${
                          selectedAnswers[currentQuestionIndex] === index
                            ? "bg-brand-accent/20 border border-brand-accent"
                            : "bg-brand-light-gray border border-brand-gray hover:border-brand-silver"
                        }`}
                      >
                        <span className="text-brand-white">{option}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={goToNextQuestion}
                      disabled={selectedAnswers[currentQuestionIndex] === undefined}
                      className={`py-3 px-6 rounded-md text-lg font-medium transition-all duration-300 ${
                        selectedAnswers[currentQuestionIndex] === undefined
                          ? "bg-brand-light-gray text-brand-silver cursor-not-allowed"
                          : "bg-brand-accent text-brand-white hover:bg-brand-accent/80"
                      }`}
                    >
                      {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "Submit Answers"}
                    </button>
                  </div>
                </div>
              )}

              {/* Quiz Results */}
              {selectedChallenge === "quiz" && showQuizResults && (
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-dark border-4 border-brand-accent mb-4">
                    <span className="text-2xl font-bold text-brand-accent">
                      {quizScore}/{quizQuestions.length}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-brand-white">
                    {quizScore >= 2 ? "Challenge Completed!" : "Try Again"}
                  </h3>

                  <p className="text-brand-silver">
                    {quizScore >= 2
                      ? "You've passed the Keanu Trivia Quiz. Your knowledge of Keanu is impressive!"
                      : "You need to score at least 2/3 to pass. Try again or select a different challenge."}
                  </p>

                  {quizScore >= 2 && (
                    <button
                      onClick={completeChallenge}
                      disabled={isSubmitting}
                      className={`py-3 px-6 rounded-md text-lg font-medium transition-all duration-300 ${
                        isSubmitting
                          ? "bg-brand-light-gray text-brand-silver cursor-not-allowed"
                          : "bg-brand-accent text-brand-white hover:bg-brand-accent/80"
                      }`}
                    >
                      {isSubmitting ? "Processing..." : "Continue to Your GVIPC Card"}
                    </button>
                  )}

                  {quizScore < 2 && (
                    <button
                      onClick={() => {
                        setCurrentQuestionIndex(0)
                        setSelectedAnswers([])
                        setShowQuizResults(false)
                      }}
                      className="py-3 px-6 rounded-md text-lg font-medium bg-brand-light-gray text-brand-white hover:bg-brand-gray transition-all duration-300"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              )}

              {/* Art Challenge */}
              {selectedChallenge === "art" && (
                <div className="space-y-6">
                  <p className="text-brand-silver">
                    Upload your Keanu-inspired fan art. Show your creativity and appreciation for his work.
                  </p>

                  {!artFile ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-brand-accent/50 rounded-lg p-8 text-center cursor-pointer hover:border-brand-accent transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-brand-accent/70 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-brand-white font-medium mb-2">Click to upload your fan art</p>
                      <p className="text-brand-silver text-sm">JPG, PNG, or GIF (max 5MB)</p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleArtUpload}
                        accept="image/jpeg,image/png,image/gif"
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-brand-accent/50">
                        {artPreview && (
                          <Image
                            src={artPreview || "/placeholder.svg"}
                            alt="Fan Art Preview"
                            fill
                            className="object-contain"
                          />
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-brand-white font-medium truncate max-w-xs">{artFile.name}</p>
                        <button
                          onClick={() => {
                            setArtFile(null)
                            setArtPreview(null)
                            setIsCompleted(false)
                          }}
                          className="text-brand-silver hover:text-brand-white transition-colors"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={completeChallenge}
                          disabled={isSubmitting}
                          className={`py-3 px-6 rounded-md text-lg font-medium transition-all duration-300 ${
                            isSubmitting
                              ? "bg-brand-light-gray text-brand-silver cursor-not-allowed"
                              : "bg-brand-accent text-brand-white hover:bg-brand-accent/80"
                          }`}
                        >
                          {isSubmitting ? "Processing..." : "Submit Fan Art"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Video Challenge */}
              {selectedChallenge === "video" && (
                <div className="space-y-6">
                  <p className="text-brand-silver">
                    Record a short video (10-15 seconds) sharing why you're a Keanu fan.
                  </p>

                  <div className="relative aspect-video bg-brand-dark rounded-lg overflow-hidden border border-brand-accent/50">
                    {!videoURL ? (
                      <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover"></video>
                    ) : (
                      <video src={videoURL} controls className="w-full h-full object-cover"></video>
                    )}

                    {isRecording && (
                      <div className="absolute top-4 right-4 flex items-center bg-brand-dark/70 px-3 py-1 rounded-full">
                        <span className="animate-pulse w-3 h-3 rounded-full bg-brand-accent mr-2"></span>
                        <span className="text-brand-white text-sm">{recordingTime}s</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center space-x-4">
                    {!videoURL && !isRecording && (
                      <button
                        onClick={startRecording}
                        className="py-3 px-6 rounded-md font-medium bg-brand-accent text-brand-white hover:bg-brand-accent/80 transition-all duration-300"
                      >
                        Start Recording
                      </button>
                    )}

                    {isRecording && (
                      <button
                        onClick={stopRecording}
                        className="py-3 px-6 rounded-md font-medium bg-brand-light-gray text-brand-white hover:bg-brand-gray transition-all duration-300"
                      >
                        Stop Recording {recordingTime < 10 ? `(${10 - recordingTime}s more needed)` : ""}
                      </button>
                    )}

                    {videoURL && (
                      <>
                        <button
                          onClick={() => {
                            setVideoBlob(null)
                            setVideoURL(null)
                            setIsCompleted(false)
                            setupVideoRecording()
                          }}
                          className="py-3 px-6 rounded-md font-medium bg-brand-light-gray text-brand-white hover:bg-brand-gray transition-all duration-300"
                        >
                          Record Again
                        </button>

                        <button
                          onClick={completeChallenge}
                          disabled={isSubmitting || recordingTime < 10}
                          className={`py-3 px-6 rounded-md font-medium transition-all duration-300 ${
                            isSubmitting || recordingTime < 10
                              ? "bg-brand-light-gray text-brand-silver cursor-not-allowed"
                              : "bg-brand-accent text-brand-white hover:bg-brand-accent/80"
                          }`}
                        >
                          {isSubmitting ? "Processing..." : "Submit Video"}
                        </button>
                      </>
                    )}
                  </div>

                  {videoURL && recordingTime < 10 && (
                    <p className="text-red-500 text-sm text-center">
                      Your video must be at least 10 seconds long. Please record again.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
