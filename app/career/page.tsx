import { CareerTimeline } from "@/components/career-timeline"

export default function CareerPage() {
  return (
    <div className="pt-20 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Keanu Reeves' Career</h1>
          <p className="text-lg text-gray-600">
            From comedic beginnings to action superstardom, explore the evolution of one of Hollywood's most beloved
            actors.
          </p>
        </div>

        <CareerTimeline />
      </div>
    </div>
  )
}
