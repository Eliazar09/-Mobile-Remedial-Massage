/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: '#0a0a0a',
        charcoal: '#161616',
        champagne: '#c9a961',
        'light-gold': '#e6c687',
        ivory: '#f5f1e8',
        cream: '#e8e2d3',
      },
      fontFamily: {
        'display': ['"Italiana"', 'serif'],
        'heading': ['"Cormorant Garamond"', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'tracked': '0.2em',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
