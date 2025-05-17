export interface TimelineStory {
  id: string
  title: string
  date: string
  summary: string
  content: string
  author: {
    name: string
    avatar?: string
  }
  audioUrl?: string
  tags?: string[]
}
