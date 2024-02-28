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
    },
  },
  plugins: [],
};
export default config;
