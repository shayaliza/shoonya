/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#B4E380",
        customPink: "#FFDFD6",
      },
    },
  },
  plugins: [],
};
