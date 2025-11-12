import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amatic: ["var(--font-amatic)"],
        amaticbold: ["var(--font-amaticbold)"],
        baloo: ["var(--font-baloo)"],
        inter: ["var(--font-inter)"],
        "source-code-pro": ["var(--font-source-code-pro)"],
      },
      colors: {
        button: {
          base: "#322514",
          hover: "#47351E",
          active: "#5C462A",
          text: "#EFEFEF",
          disabled: "#2C2215",
          disabledText: "#5E5E5E",
        },
        input: {
          base: "#322514",
          hover: "#3A2B17",
          text: "#EFEFEF",
          disabled: "#2C2215",
          disabledText: "#5E5E5E",
        },
        label: {
          base: "#4A4339",
          bright: "#FFFFFF",
          disabled: "#5E5E5E",
        },
        beraBrown: {
          DEFAULT: "#231A0F",
          dark: "#1A140C",
          border: "#352A1C",
        },
        teak: "#CFA08B",
        honeyYellow: "#E7B941",
        warmText: "#4A4339",
      },
      screens: {
        tall: { raw: "(min-height: 900px)" },
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-slow': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-fast': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee-slow 45s linear infinite',
        'marquee-fast': 'marquee-fast 20s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
