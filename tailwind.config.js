/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-transparent": "rgba(0, 0, 0, 0.0)",
        "black-transparent-visible": "rgba(0, 0, 0, 0.8)"
      }
    },
  },
  plugins: [],
}