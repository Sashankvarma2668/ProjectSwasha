const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./layout/**/*.{js,ts,jsx,tsx}", "./helpers/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        nirmaan: {
          lighter: "#ECFEFF",
          light: "#A5F3FC",
          DEFAULT: "#38BDF8",
          dark: "#0891B2",
          darker: "#164E63",
        },
      },
      backgroundImage: {
        "sparkle-pattern": "url('/images/confetti.png')",
        "points-background": "url('/images/eps-vs-svg-6.jpg')",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"),require('@tailwindcss/aspect-ratio'),],
};
