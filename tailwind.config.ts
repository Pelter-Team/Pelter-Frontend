import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pinktext: "#C5705D",
        browntext: "#873800",
        lightpinktext: "#D6AEA3",
        secondary: "#E9C9C1",
        mainBG: "#FFFAF5",
        primary: {
          DEFAULT: "#C5705D",
        },
        accent: {
          DEFAULT: "#873800",
        },
      },
      fontFamily: {
        lobster: ["Lobster", "cursive"],
      },
    },
  },
  plugins: [],
}

export default config
