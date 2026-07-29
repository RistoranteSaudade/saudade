/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A3E3E', // Brand Dark Green
        secondary: '#0A1F1F', // Darker Green for depth
        darkGreen: '#0D2626', // Even darker green for variety
        accent: '#C9A961', // Brand Gold
        sand: '#C9A961', // same gold
        paper: '#F5F5F4', // Stone 100 (keep for light sections if needed)
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
