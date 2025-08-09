import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#e9efff',
          500: '#7aa2ff',
          600: '#5c86f2',
          700: '#4a6dcc'
        }
      },
      borderRadius: {
        '2xl': '1.25rem'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.15)'
      }
    }
  },
  plugins: []
}
export default config
