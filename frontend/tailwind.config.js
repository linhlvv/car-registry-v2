/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      keyframes: {
        smallbounce: {
          '0%': {
            transform: 'translateY(0px)'
          },
          '50%': {
              transform: 'translateY(-4px)'
          },
          '100%': {
              transform: 'translateY(0px)'
          }
        }
      }
    },
  },
  plugins: [],
}
