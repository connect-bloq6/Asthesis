/** @type {import('tailwindcss').Config} */
module.exports = {
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
