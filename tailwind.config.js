/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#6a6cf6",
        textblack: "#404040",
        background: "#fafaff",
        backgroundDark: "#121212",
        boxDark: "#202020",
        inputDark: "#292929",
      },
      fontSize: {
        small: "0.5rem",
      },
    },
  },
  plugins: [],
};
