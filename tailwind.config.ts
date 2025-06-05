module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        hedvig: ['"Hedvig Letters Serif"', 'serif'],
      },
      colors: {
        primary: '#1F514C',
      },
    },
  },
  plugins: [],
};
