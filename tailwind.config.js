/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pixelify-sans": ["pixelify-sans", "sans-serif"],
      },
      colors: {
        bingo: {
          lightBlue: "#00AAFF",
          //3968A0
          foggyBlue: "#3E405F",
          darkBlue: "#1C1C26",
          green: "#129612",
        },
      },
    },
  },
  plugins: [],
};
