/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // make sure Tailwind scans all your files
  ],
  theme: {
    extend: {
      screens: {
        '4xl': '3000px', // Custom breakpoint
      },
    },
  },
  plugins: [],
};
