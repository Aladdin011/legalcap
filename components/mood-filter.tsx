"use client"
import { motion } from "framer-motion"
import type { Mood } from "@/types/content"
import { cn } from "@/lib/utils"

interface MoodFilterProps {
  selectedMood: Mood
  onMoodChange: (mood: Mood) => void
}

interface MoodOption {
  value: Mood
  emoji: string
  label: string
}

const moodOptions: MoodOption[] = [
  { value: null, emoji: "✨", label: "All" },
  { value: "happy", emoji: "😊", label: "Uplifting" },
  { value: "neutral", emoji: "😌", label: "Balanced" },
  { value: "sad", emoji: "🫂", label: "Supportive" },
]

export function MoodFilter({ selectedMood, onMoodChange }: MoodFilterProps) {
  return (
    <div className="flex flex-col items-center mb-6">
      <h3 className="font-heading text-lg mb-4">How are you feeling today?</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {moodOptions.map((option) => (
          <motion.button
            key={String(option.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodChange(option.value)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
              selectedMood === option.value
                ? "bg-muted-lavender/40 shadow-md ring-2 ring-deep-charcoal/40 ring-offset-2 ring-offset-warm-cream"
                : "bg-white/70 hover:bg-white shadow-sm",
            )}
          >
            <span className="text-xl" role="img" aria-hidden="true">
              {option.emoji}
            </span>
            <span className="text-sm font-medium">{option.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
