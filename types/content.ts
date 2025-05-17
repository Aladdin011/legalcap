export type Mood = "happy" | "neutral" | "sad" | null

export type Category = "mindfulness" | "self-care" | "meditation" | "healing" | "community"

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: Category
  mood: Mood
  image?: string
  readTime: number
  date: string
  featured?: boolean
  height?: "small" | "medium" | "large" // For masonry layout
}
