import { BiographyTimeline } from "@/components/biography/biography-timeline"
import { BiographyHero } from "@/components/biography/biography-hero"

export const metadata = {
  title: "Keanu Reeves | Biography",
  description:
    "Explore the life and career of Keanu Reeves, from his early beginnings to his status as a Hollywood icon.",
}

export default function BiographyPage() {
  return (
    <div className="min-h-screen bg-white">
      <BiographyHero />
      <BiographyTimeline />
    </div>
  )
}
