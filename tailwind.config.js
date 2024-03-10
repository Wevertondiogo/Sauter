const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },
    extend: {
      height: {
        '99': '99vh',
        '50': '50vh'
      },
      width: {
        '75': '75vh',
        '25': '25vh',
      },
      maxHeight: {
        '85': '85vh',
      },
      gridTemplateColumns: {
        '3-auto': 'grid-template-columns: repeat(auto-fit, 33.3%)',
        '100px': 'repeat(auto-fit, minmax(50px, 100px))'
      }
    },
  },
  plugins: [],
}
