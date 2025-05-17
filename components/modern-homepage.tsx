"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface FeaturedProject {
  id: string
  title: string
  category: string
  imageUrl: string
  year: string
  link: string
}

export function ModernHomepage() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    setIsLoaded(true)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Featured projects data
  const featuredProjects: FeaturedProject[] = [
    {
      id: "matrix",
      title: "The Matrix",
      category: "Sci-Fi",
      imageUrl: "https://images.unsplash.com/photo-1626163015484-81fc7e3b90d8?q=80&w=2070",
      year: "1999",
      link: "/filmography/matrix",
    },
    {
      id: "john-wick",
      title: "John Wick",
      category: "Action",
      imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025",
      year: "2014",
      link: "/filmography/john-wick",
    },
    {
      id: "constantine",
      title: "Constantine",
      category: "Supernatural",
      imageUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1935",
      year: "2005",
      link: "/filmography/constantine",
    },
    {
      id: "bill-ted",
      title: "Bill & Ted",
      category: "Comedy",
      imageUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070",
      year: "1989",
      link: "/filmography/bill-ted",
    },
  ]

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center bg-white/80 backdrop-blur-md">
        <Link href="/" className="font-heading text-xl font-medium">
          Keanu Reeves
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/filmography" className="text-sm hover:text-matrix-green transition-colors">
            Filmography
          </Link>
          <Link href="/about" className="text-sm hover:text-matrix-green transition-colors">
            About
          </Link>
          <Link href="/philanthropy" className="text-sm hover:text-matrix-green transition-colors">
            Philanthropy
          </Link>
          <Link href="/fan-zone" className="text-sm hover:text-matrix-green transition-colors">
            Fan Zone
          </Link>
        </nav>
        <Link
          href="/gvipc/apply"
          className="px-5 py-2 bg-black text-white rounded-full text-sm hover:bg-matrix-green hover:text-black transition-colors"
        >
          GVIPC Card
        </Link>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="inline-block mb-3 px-3 py-1 bg-gray-100 rounded-full">
              <span className="text-xs font-medium text-gray-600">Actor • Director • Philanthropist</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
              Keanu is crafting iconic roles through authentic performance
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              With a career spanning decades, Keanu Reeves has established himself as one of Hollywood's most versatile
              and beloved actors, bringing depth and humanity to every character.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/filmography"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-matrix-green hover:text-black transition-colors"
              >
                Explore Filmography
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-black rounded-lg hover:bg-gray-100 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/keanu-smiling.jpeg"
                  alt="Keanu Reeves smiling in a denim jacket"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
              ></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Featured Works</h2>
              <p className="text-gray-600 mt-2">Iconic roles that defined generations</p>
            </div>
            <Link href="/filmography" className="text-sm font-medium flex items-center hover:text-matrix-green">
              All Works
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={staggerChildren}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp} className="group">
                <Link href={project.link}>
                  <div className="relative h-[400px] rounded-xl overflow-hidden mb-4 bg-gray-200">
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-medium">View Project</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-heading font-medium text-lg group-hover:text-matrix-green transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600">{project.category}</p>
                    </div>
                    <span className="text-sm text-gray-400">{project.year}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=1969"
                alt="Keanu Reeves Casual"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              A versatile actor with a passion for authentic storytelling
            </h2>
            <p className="text-gray-600 mb-6">
              From action-packed blockbusters to thought-provoking dramas, Keanu Reeves has demonstrated remarkable
              range throughout his career. Beyond his on-screen presence, he's known for his philanthropy, humility, and
              dedication to his craft.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-4xl font-bold mb-2">30+</p>
                <p className="text-gray-600">Years in film</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">60+</p>
                <p className="text-gray-600">Film projects</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">5+</p>
                <p className="text-gray-600">Major franchises</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">∞</p>
                <p className="text-gray-600">Moments of kindness</p>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center text-black font-medium hover:text-matrix-green transition-colors"
            >
              Learn more about Keanu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-6 text-matrix-green"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-heading mb-8 leading-relaxed"
          >
            "The simple act of paying attention can take you a long way."
          </motion.p>
          <p className="text-matrix-green font-medium">Keanu Reeves</p>
        </div>
      </section>

      {/* Latest News/Projects */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Latest News</h2>
              <p className="text-gray-600 mt-2">Updates from Keanu's world</p>
            </div>
            <Link href="/news" className="text-sm font-medium flex items-center hover:text-matrix-green">
              All News
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl overflow-hidden"
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1626163015484-81fc7e3b90d8?q=80&w=2070"
                  alt="John Wick 4"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs text-gray-500">May 10, 2025</span>
                <h3 className="font-heading font-medium text-lg mt-2 mb-3">John Wick 5 Officially Announced</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Lionsgate confirms that John Wick will return for a fifth installment with Keanu Reeves reprising his
                  iconic role.
                </p>
                <Link href="/news/john-wick-5" className="text-sm font-medium hover:text-matrix-green">
                  Read More →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 rounded-xl overflow-hidden"
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025"
                  alt="Matrix 5"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs text-gray-500">April 28, 2025</span>
                <h3 className="font-heading font-medium text-lg mt-2 mb-3">Matrix Universe Expanding</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Warner Bros. announces plans to expand the Matrix universe with a new trilogy and Keanu set to return
                  as Neo.
                </p>
                <Link href="/news/matrix-universe" className="text-sm font-medium hover:text-matrix-green">
                  Read More →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 rounded-xl overflow-hidden"
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd59a93f9f81?q=80&w=2070"
                  alt="Charity Event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs text-gray-500">April 15, 2025</span>
                <h3 className="font-heading font-medium text-lg mt-2 mb-3">Keanu's Charity Raises $5M</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Keanu's foundation reaches milestone of $5 million raised for children's hospitals and cancer
                  research.
                </p>
                <Link href="/news/charity-milestone" className="text-sm font-medium hover:text-matrix-green">
                  Read More →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Join the GVIPC Community</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Become a member of the Great Valued Important Person Club and get exclusive access to Keanu content,
              events, and more.
            </p>
            <Link
              href="/gvipc/apply"
              className="px-8 py-4 bg-black text-white rounded-lg hover:bg-matrix-green hover:text-black transition-colors inline-flex items-center"
            >
              Get Your GVIPC Card
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="font-heading text-xl font-medium">
                Keanu Reeves
              </Link>
              <p className="text-gray-600 mt-4 text-sm">
                Official portfolio showcasing the work, philanthropy, and journey of Keanu Reeves.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/filmography" className="text-sm text-gray-600 hover:text-matrix-green transition-colors">
                    Filmography
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-matrix-green transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/philanthropy"
                    className="text-sm text-gray-600 hover:text-matrix-green transition-colors"
                  >
                    Philanthropy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Fan Zone</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/fan-zone" className="text-sm text-gray-600 hover:text-matrix-green transition-colors">
                    Fan Art
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gvipc/apply"
                    className="text-sm text-gray-600 hover:text-john-wick-gold transition-colors"
                  >
                    GVIPC Card
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-matrix-green transition-colors" aria-label="Instagram">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-matrix-green transition-colors" aria-label="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-matrix-green transition-colors" aria-label="YouTube">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2025 Keanu Reeves. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-matrix-green">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-matrix-green">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-matrix-green">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
