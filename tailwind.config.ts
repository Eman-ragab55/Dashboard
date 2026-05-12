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
        magic: {
          dark: "#1A1B26",     // لون الخلفية العميق
          gold: "#FFD700",     // لون الذهب
          violet: "#8A2BE2",   // لون الـ Mana
          teal: "#00CED1",     // لون إضافي
        },
      },
    },
  },
  plugins: [],
};
export default config;