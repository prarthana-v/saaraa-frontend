/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px", // Extra small screen (e.g., small phones)
        xsm: "576px",
        "3xl": "1600px", // Very large screens
      },
      colors: {
        pprimary: "#df988f",
      },
    },
  },
  plugins: [],
};
