/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This scans all your components and pages
  ],
  theme: {
    extend: {
      colors: {
        brand: "#1d4ed8", // This ensures your 'text-brand' and 'bg-brand' classes work
      },
    }, 
  },
  plugins: [],
}