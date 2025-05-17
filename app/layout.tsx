import type React from "react"
import "./globals.css"
import { Montserrat, Inter } from "next/font/google"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

// Load fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

const matrix = localFont({
  src: "../public/fonts/matrix-code.ttf",
  variable: "--font-matrix",
})

const pacifico = localFont({
  src: "../public/fonts/Pacifico-Regular.ttf",
  variable: "--font-pacifico",
})

export const metadata = {
  title: "Keanu Reeves | Official Portfolio",
  description: "The official portfolio of Keanu Reeves, showcasing his films, interviews, philanthropy, and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body text-foreground antialiased",
          montserrat.variable,
          inter.variable,
          matrix.variable,
          pacifico.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
