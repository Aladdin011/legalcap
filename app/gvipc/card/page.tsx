"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

export default function GVIPCCardPage() {
  const [isDownloading, setIsDownloading] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Generate random member ID
  const memberId = useRef(`KR-${Math.floor(Math.random() * 900000) + 100000}`)

  // Simulate download
  const handleDownload = () => {
    setIsDownloading(true)

    // Simulate API call
    setTimeout(() => {
      setIsDownloading(false)
      alert("Your GVIPC card has been downloaded!")
    }, 2000)
  }

  // Share on social media
  const handleShare = (platform: string) => {
    alert(`Sharing to ${platform}! (This would open a share dialog in production)`)
  }

  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Reveal animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-white">Congratulations!</h1>
            <p className="text-lg text-brand-silver max-w-3xl mx-auto">
              You've successfully completed the GVIPC challenge and earned your membership card.
            </p>
          </motion.div>

          {/* Card reveal animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 1.2, type: "spring" }}
            className="flex justify-center mb-12"
          >
            {/* GVIPC Card */}
            <div ref={cardRef} className="relative w-full max-w-lg aspect-[1.6/1] card-3d">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 rounded-xl overflow-hidden shadow-subtle-glow border border-yellow-300/50">
                <div className="absolute inset-0 p-8 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-brand-white text-2xl font-bold">GVIPC</h3>
                      <p className="text-brand-silver text-sm">Global VIP Partnership Club</p>
                    </div>
                    <div className="w-20 h-20 relative">
                      <div className="absolute inset-0 bg-brand-accent/20 rounded-full"></div>
                      <div className="absolute inset-1 bg-brand-dark rounded-full flex items-center justify-center">
                        <span className="text-amber-800 font-mono text-sm">KEANU</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-6">
                      <p className="text-brand-silver text-xs">MEMBER NAME</p>
                      <p className="text-brand-white text-xl font-medium">John Doe</p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-brand-silver text-xs">MEMBER ID</p>
                        <p className="text-brand-white text-sm">{memberId.current}</p>
                      </div>
                      <div>
                        <p className="text-brand-silver text-xs">MEMBER SINCE</p>
                        <p className="text-brand-white text-sm">{new Date().getFullYear()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-brand-silver text-xs">STATUS</p>
                        <p className="text-amber-800 text-sm">PREMIUM</p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="absolute bottom-8 right-8 w-16 h-16 bg-white p-1 rounded-md">
                    <div className="w-full h-full bg-[url('/qr-code.png')] bg-contain bg-no-repeat bg-center"></div>
                  </div>
                </div>

                {/* Holographic effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-20"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="text-center mb-8 max-w-lg mx-auto"
          >
            <p className="text-brand-silver text-lg">
              I kindly request that you activate your GVIPC Partnership card, which costs $1500, to enable access to scan the QR code.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  isDownloading
                    ? "bg-brand-light-gray text-brand-silver cursor-not-allowed"
                    : "bg-amber-600 text-brand-white hover:bg-amber-500 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                }`}
              >
                {isDownloading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Downloading...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Card
                  </>
                )}
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleShare("Twitter")}
                  className="p-3 rounded-md bg-brand-gray text-brand-white hover:bg-brand-light-gray transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>

                <button
                  onClick={() => handleShare("Instagram")}
                  className="p-3 rounded-md bg-brand-gray text-brand-white hover:bg-brand-light-gray transition-colors"
                  aria-label="Share on Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d=\"M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.87-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.
