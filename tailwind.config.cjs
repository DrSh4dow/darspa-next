const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

// Rotate X utilities
const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});

const webkitFullScreen = plugin(function ({ addUtilities }) {
  addUtilities({
    ".webkit-fill-available": {
      height: "-webkit-fill-available",
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fade-in .5s linear forwards",
        "marquee-normal": "marquee 60s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "marquee-fast": "marquee 50s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        marquee: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    rotateY,
    webkitFullScreen,
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
