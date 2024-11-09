import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#C5705D",
        secondary: "#E9C9C1",
      },
      fontFamily: {
        lobster: ['Lobster', 'cursive'],
        primary: "#C5705D",
        secondary: "#E9C9C1",
        mainBG: "#FFFAF5",
      },
    },
  },
  plugins: [],
}
export default config
