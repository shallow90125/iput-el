import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-in-bottom":
          "slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "slide-in-bottom": {
          "0%": {
            transform: "translateY(1000px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            default: {
              foreground: "#88ff40",
              DEFAULT: "#2c4018",
            },
            primary: {
              foreground: "#2c4018",
              DEFAULT: "#88ff40",
            },
            danger: {
              foreground: "#2c4018",
              DEFAULT: "#88ff40",
            },
          },
        },
      },
    }),
  ],
};
export default config;
