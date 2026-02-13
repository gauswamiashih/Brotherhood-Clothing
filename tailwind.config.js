/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            'luxury-gold': '#D4AF37',
            'luxury-black': '#0B0B0B',
         },
         fontFamily: {
            display: ['Playfair Display', 'serif'],
            sans: ['Inter', 'sans-serif'],
         },
      },
   },
   plugins: [],
}
