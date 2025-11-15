/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E9F1FA',
          100: '#E9F1FA',
          200: '#D3E3F5',
          300: '#A7C7EB',
          400: '#7BABE1',
          500: '#00ABE4',
          600: '#00ABE4',
          700: '#0089B6',
          800: '#006788',
          900: '#00455A',
        },
        'light-blue': '#E9F1FA',
        'bright-blue': '#00ABE4',
      },
    },
  },
  plugins: [],
}
