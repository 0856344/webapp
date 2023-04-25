/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    screens: {
      xs: '360px',
      sm: '576px',
      md: '800px',
      lg: '992px',
      xl: '1366px'
    },
    colors: {
      orange: '#E69140',
      blue: '#72A4B2',
      yellow: '#eae222',
      red: '#8F0E00',
      green: '#80a547',
      'gray-light': '#f2f3ee'
    },
    fontFamily: {
      sans: ['IBM Plex Sans Condensed', 'sans-serif'],
      'sans-secondary': ['Chakra Petch', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace']
    },
    extend: {}
  },
  plugins: []
}
