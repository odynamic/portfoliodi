import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Mengaktifkan fitur dark mode berbasis kelas HTML
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "#FAFAFA",
          dark: "#0A0F1D",
          muted: "#52525B",
          blue: "#0066FF",
          accent: "#E2E8F0",
        },
      },
    },
  },
  plugins: [],
};

export default config;