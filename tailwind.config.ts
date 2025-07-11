import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Rounded Elegance"', 'sans-serif'],
        secondary: ['Calibri', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
