/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5A4',
        secondary: '#4F46E5',
        accent: '#FBBF24'
      }
    }
  },
  plugins: []
}
