/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files
    "!./src/Components/Navbar/**/*" // Exclude Tailwind in Navbar folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
