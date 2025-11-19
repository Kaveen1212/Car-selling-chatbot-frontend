/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors - from darkest to lightest
        bg: {
          100: "#1A1715", // Main background (darkest)
          200: "#221E1B", // Card/elevated background
          300: "#2B2621", // Sidebar background
          400: "#3D362F", // Muted elements
        },
        // Text colors - from most prominent to most subtle
        text: {
          "000": "#FFFFFF", // White text on colored backgrounds
          100: "#F3F0ED", // Primary text
          200: "#CEC7BF", // Secondary text
          300: "#A8A099", // Tertiary text
          400: "#78716C", // Muted/placeholder text
        },
        // Border colors
        border: {
          100: "#52483E", // Focus/active borders
          200: "#3D362F", // Default borders
          300: "#2B2621", // Subtle borders
        },
        // Accent colors (Claude's orange/amber)
        accent: {
          "main-100": "#CC785C", // Primary accent (Claude orange)
          "main-200": "#D88E73", // Hover state
          "main-300": "#B8654A", // Active/pressed state
        },
      },
    },
  },
  plugins: [],
}
