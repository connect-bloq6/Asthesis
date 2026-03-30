import type { Config } from 'tailwindcss'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharedPreset = require('@asthesis/shared/tailwind-preset')

const config: Config = {
  presets: [sharedPreset],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {} },
  plugins: [],
}

export default config
