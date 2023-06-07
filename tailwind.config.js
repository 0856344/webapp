/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./bloks/**/*.vue', './components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.js'],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        // adds utility classes for vertical text
        // https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
        '.horizontal-writing-tb': { writingMode: 'horizontal-tb' },
        '.vertical-writing-rl': { writingMode: 'vertical-rl' },
        '.vertical-writing-lr': { writingMode: 'vertical-lr' },
        // https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
        '.orientation-mixed': { textOrientation: 'mixed' },
        '.orientation-upright': { textOrientation: 'upright' },
        '.orientation-sideways-right': { textOrientation: 'sideways-right' },
        '.orientation-sideways': { textOrientation: 'sideways' },
        '.orientation-glyph': { textOrientation: 'use-glyph-orientation' }
      })
    })
  ],
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
        contact: '28% 72%',
        'member-grid': 'minmax(12em, 1fr) repeat(4, 1fr)'
      },
      gridTemplateRows: {
        plan: '3em repeat(auto-fill, minmax(5em, 1fr))',
        'plan-mobile': '3em repeat(auto-fill, minmax(4em, 1fr))'
      },
      height: {
        'screen-1/2': '50vh',
        'screen-1/3': '33.3vh',
        'screen-2/3': '66.6vh',
        'screen-1/4': '25vh',
        'screen-3/4': '75vh',
        'screen-1/7': '14.2vh',
        'screen-2/7': '28.4vh',
        'screen-3/7': '42.6vh',
        'screen-4/7': '56.8vh',
        'screen-5/7': '71vh',
        'screen-6/7': '85.2vh'
      }
    }
  }
}
