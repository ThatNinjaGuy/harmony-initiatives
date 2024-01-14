import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // Setting the primary, and secondary colors
      colors: {
        primary: "#038C7F",
        secondary: "#F2C641",
        // Different tertiary colors for light and dark theme
        tertiary: {
          dark: "#F27405",
          light: "#F2C641",
        },
      },
      // Setting font family for the complete application
      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
