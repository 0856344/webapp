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
      orange: {
        DEFAULT: '#E69140',
        50: '#FBEEE2',
        100: '#F9E4D0',
        200: '#F4CFAC',
        300: '#EFBB88',
        400: '#EBA664',
        500: '#E69140',
        600: '#D2751C',
        700: '#A15915',
        800: '#6F3E0F',
        900: '#3E2208'
      },
      blue: {
        DEFAULT: '#72A4B2',
        100: '#DCE8EC',
        200: '#C1D7DD',
        300: '#A7C6CF',
        400: '#8CB5C0',
        500: '#72A4B2',
        600: '#538999',
        700: '#406974',
        800: '#2C4850',
        900: '#18272C'
      },
      yellow: '#eae222',
      red: '#8F0E00',
      green: '#80a547',
      white: '#ffffff',
      gray: {
        100: '#f2f3ee',
        200: '#e0e0e0',
        300: '#d1d1d1',
        400: '#b3b3b3',
        500: '#a0a0a0',
        600: '#8f8f8f',
        700: '#7d7d7d',
        800: '#6c6c6c',
        900: '#2d2d2d'
      },
      transparent: 'transparent'
    },
    fontFamily: {
      sans: ['IBM Plex Sans Condensed', 'sans-serif'],
      'sans-secondary': ['Chakra Petch', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace']
    },
    extend: {
      gridTemplateColumns: {
        contact: '28% 72%'
      },
      gridTemplateRows: {
        plan: '3em repeat(auto-fill, minmax(5em, 1fr))'
      }
    }
  },
  plugins: []
}
