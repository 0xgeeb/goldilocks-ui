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
        amatic: ['var(--font-amatic)'],
        amaticbold: ['var(--font-amaticbold)'],
        baloo: ['var(--font-baloo)']
      }
    },
  },
  plugins: [],
};
export default config;
