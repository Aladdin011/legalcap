export type SubmissionType = "art" | "photo" | "video" | "other"

export interface FanSubmission {
  id: string
  title: string
  type: SubmissionType
  imageUrl: string
  thumbnailUrl?: string
  videoUrl?: string
  creator: {
    name: string
    avatar?: string
    country?: string
  }
  description: string
  dateSubmitted: string
  likes: number
  featured?: boolean
  tags?: string[]
}
