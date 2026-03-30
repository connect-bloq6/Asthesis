import type { Config } from 'tailwindcss'

// CJS preset from workspace package
// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharedPreset = require('@asthesis/shared/tailwind-preset')

const config: Config = {
  presets: [sharedPreset],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
