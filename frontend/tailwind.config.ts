import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': 'var(--color-primary)',
        'color-primary-hover': 'var(--color-primary-hover)',
        'color-primary-dark': 'var(--color-primary-dark)',
        // 'color-primary-light': '',
        'color-secondary': 'var(--color-secondary)',
        // 'color-secondary-dark': '',
        // 'color-secondary-light': '',
        'color-tertiary': 'var(--color-tertiary)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
