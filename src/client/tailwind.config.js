/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    colors: {
      purple: {
        50: '#F8F0FE',
        100: '#EEDDFD',
        200: '#DCBBFC',
        300: '#CB99FA',
        400: '#BA77F9',
        500: '#A855F7',
        600: '#8815F4',
        700: '#6609BE',
        800: '#44067F',
        900: '#22033F'
      }
    }
  },
  plugins: []
}
