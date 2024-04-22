import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.6rem',
      },
      colors: {
        'primary': 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
      },
      boxShadow: {
        "center-sm": "0 0 5px 0.5px rgba(0, 0, 0, 0.25 )",
        "center-md": "0 0 10px 1px rgba(0, 0, 0, 0.25 )",
        "center-lg": "0 0 20px rgba(0, 0, 0, 0.25 )",
        "center-xl": "0 0 25px rgba(0, 0, 0, 0.25)",
        "center-2xl": "0 0 30px rgba(0, 0, 0, 0.25)",
        "center-3xl": "0 0 35px rgba(0, 0, 0, 0.25)",
      },
      letterSpacing: {
        tightest: '-.4em',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
};
export default config;
