/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e293b', // Slate 800
        secondary: '#334155', // Slate 700
        accent: '#3b82f6', // Blue 500
        background: '#f1f5f9', // Slate 100
        surface: '#ffffff',
      },
    },
  },
  plugins: [],
}
