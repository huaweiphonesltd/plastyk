/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'plastyk-black': '#000000',
        'plastyk-red': '#ad272d',
        'plastyk-white': '#ffffff',
        'plastyk-pink': '#ff7bac',
        'plastyk-dark-gray': '#1a1a1a',
        'plastyk-light-gray': '#f5f5f5',
        'plastyk-red-light': '#c73a40',
        'plastyk-pink-light': '#ff9bc4',
        'plastyk-pink-dark': '#e65a8a',
      },
      fontFamily: {
        'inter': ['"Inter"', 'sans-serif'],
      },
    },
  },
}
