/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/*.woff"],
  theme: {
    extend: {
      fontFamily: {
        robotoHeavy: ["robotoHeavy", "sans-serif"],
        robotoRegular: ["robotoRegular", "sans-serif"],
        playfair: ["playfair", "serif"],
      },
    },
  },
  plugins: [],
};
