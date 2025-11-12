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
        instagram: {
          blue: "#0095f6",
          border: "#262626",
          background: "#000000",
          card: "#000000",
          input: "#121212",
          text: "#ffffff",
          textSecondary: "#a8a8a8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
