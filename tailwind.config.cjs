/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Righteous", "cursive"], // Para los títulos gigantes
        sans: ["Nunito", "sans-serif"], // Para textos legibles
      },
    },
  },
  plugins: [],
};
