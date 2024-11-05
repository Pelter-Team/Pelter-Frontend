import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        primary: {
          DEFAULT: "#C5705D",
          // hover: "#AED8FB",
          // active: "#96CFFA",
        },
        accent: {
          DEFAULT: "#873800",
        },
        // D0B8A8
      },
    },
  },
  plugins: [],
}
export default config
