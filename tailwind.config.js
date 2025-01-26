/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          roboto: ["Roboto Serif", "sans-serif"],
          lato: ["Lato", "sans-serif"],
          montesarrat:["Montserrat","sans-serif"]
        },
      },
    },
    plugins: [],
  };
  