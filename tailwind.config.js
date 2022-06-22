/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFCC8F",
        primaryLight: "#FFDAAF",
        secondary: "#53179c",
        secondaryLight: "#A760FF",
      },
      fontFamily: {
        novaMono: ["Nova Mono", "sans-serif"],
      }
    },
  },
  plugins: [],
}
