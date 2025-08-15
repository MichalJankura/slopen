/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e50914',
        dark: '#141414',
        accent: '#b9090b'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 4px 24px -6px rgba(0,0,0,0.4)'
      }
    },
  },
  plugins: [],
};
