import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // red: {
        //   925: '#730000',
        // },
        amber: {
          350: "#fcb514",
        },
        'red': '#730000',
        'yellow': '#fcb514',
      },
      fontFamily: {
        kanit: ["var(--font-kanit)"],
      },
    },
  },
  plugins: [],
};
export default config;
