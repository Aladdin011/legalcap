import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // New color palette
        "brand-black": "#0A0A0A",
        "brand-dark": "#121212",
        "brand-gray": "#1E1E1E",
        "brand-light-gray": "#2A2A2A",
        "brand-silver": "#A0A0A0",
        "brand-white": "#F5F5F5",
        "brand-accent": "#3D7DFF", // A subtle blue accent
        "brand-highlight": "#FFFFFF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "16px",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "4xl": "2.5rem", // H1
        "3xl": "2rem", // H2
        "2xl": "1.5rem", // H3
        xl: "1.25rem", // H4
        base: "1rem", // Body
      },
      lineHeight: {
        body: "1.6",
      },
      boxShadow: {
        "card-hover": "0 8px 16px rgba(0,0,0,0.2)",
        "subtle-glow": "0 0 10px rgba(255, 255, 255, 0.1)",
        "accent-glow": "0 0 15px rgba(61, 125, 255, 0.3)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-gentle": "pulse-gentle 3s infinite",
        glitch: "glitch 1s linear infinite",
        "pulse-slow": "pulse 3s infinite",
        "theme-toggle": "theme-toggle 0.5s ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-5px, 5px)" },
          "40%": { transform: "translate(5px, -5px)" },
          "60%": { transform: "translate(-5px, -5px)" },
          "80%": { transform: "translate(5px, 5px)" },
        },
        "theme-toggle": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(to right, #0A0A0A, #1E1E1E)",
        "gradient-accent": "linear-gradient(135deg, #121212, #3D7DFF)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
}

export default config
