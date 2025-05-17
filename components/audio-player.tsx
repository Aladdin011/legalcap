"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AudioPlayerProps {
  audioUrl: string
  title: string
}

export function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [waveformData, setWaveformData] = useState<number[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)
  const animationRef = useRef<number>()

  // Generate random waveform data for visualization
  // In a real implementation, this would be generated from the actual audio file
  useEffect(() => {
    const generateWaveform = () => {
      const data: number[] = []
      for (let i = 0; i < 40; i++) {
        // Create a pattern that resembles a waveform
        const height = 0.2 + Math.sin(i * 0.2) * 0.2 + Math.random() * 0.6
        data.push(height)
      }
      setWaveformData(data)
    }

    generateWaveform()
  }, [audioUrl])

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", updateTime)

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", updateTime)
    }
  }, [])

  // Animation for smooth time update
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
      animationRef.current = requestAnimationFrame(updateTimeAnimated)
    } else {
      audioRef.current?.pause()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  const updateTimeAnimated = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      animationRef.current = requestAnimationFrame(updateTimeAnimated)
    }
  }

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return

    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration

    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Format time (mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const progress = (currentTime / duration) * 100 || 0

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center mb-3">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-muted-lavender/50 flex items-center justify-center text-deep-charcoal hover:bg-muted-lavender transition-colors duration-300"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
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
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
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
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
        <div className="ml-3 flex-grow">
          <p className="text-sm font-medium text-deep-charcoal">{title}</p>
          <div className="flex justify-between text-xs text-deep-charcoal/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Waveform visualization */}
      <div
        className="relative h-16 w-full cursor-pointer"
        onClick={handleSeek}
        role="progressbar"
        aria-label="Audio progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="absolute inset-0 flex items-center justify-between">
          {waveformData.map((height, index) => (
            <motion.div
              key={index}
              className="w-1.5 mx-0.5 rounded-full bg-deep-charcoal/20"
              style={{
                height: `${height * 100}%`,
                backgroundColor:
                  (index / waveformData.length) * 100 < progress
                    ? "rgba(195, 177, 225, 0.8)" // muted-lavender with opacity
                    : "rgba(46, 46, 46, 0.2)", // deep-charcoal with opacity
              }}
              initial={{ height: 0 }}
              animate={{ height: `${height * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.01 }}
            />
          ))}
        </div>
        <div
          className="absolute bottom-0 left-0 h-full bg-muted-lavender/30 pointer-events-none"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}
