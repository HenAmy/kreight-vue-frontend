/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',

  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: '#01C38D',
        accent: '#B2EDDC',
        secondary: '#132D46',
        text: '#191E29',
        gray: '#696E79',
        placeholder: '#A0A0A0',
        background: '#F8F7FA',
        disabled: '#E2E2E2',
        modal: '#FBFBFB',
        notepad: '#F6E675',
        error: '#FF0000',
      },
      fontFamily: {
        mainFont: ['"Inter"', 'sans-serif'],
      },
      spacing: {
        180: '32rem',
      },
    },
  },
  plugins: [],
};
