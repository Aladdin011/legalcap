import Image from "next/image"

export function BiographyHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/biography/keanu-hero.jpg"
          alt="Keanu Reeves"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">The Life of Keanu Reeves</h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          From humble beginnings to Hollywood icon, explore the remarkable journey of one of cinema's most beloved
          actors.
        </p>
      </div>
    </section>
  )
}
