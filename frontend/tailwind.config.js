/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'linkedin': {
          blue: '#0a66c2',
          lightBlue: '#70b5f9',
          darkBlue: '#004182',
          light: '#f3f2ef',
          dark: '#1d2226',
          text: '#7f7f7f',
          black: '#000000',
          white: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};