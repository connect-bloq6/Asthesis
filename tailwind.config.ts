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
        background: '#F5F5F7',
        foreground: '#1D1D1F',
        accent: {
          gold: '#C9A962',
          cream: '#F5EFE0',
        },
      },
      fontFamily: {
        sans: ['var(--font-unbounded)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
