/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1720px",
        ssm: "450px",
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "title-color": "var(--title-color)",
        "light-title-color": "var(--light-title-color)",
        "lighter-text-color": "var(--lighter-text-color)",
        "border-color": "var(--border-color)",
        "third-color": "var(--third-color)",
        transparent: "var( --transparent)",
        "active-song": "var(--active-song)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};
