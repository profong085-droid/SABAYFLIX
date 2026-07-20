import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090B10",
        surface: "#1a1e29",
        primary: "#dc2626", // Sabayflix Red
        textPrimary: "#ffffff",
        textSecondary: "#8b949e",
      },
    },
  },
  plugins: [],
};
export default config;
