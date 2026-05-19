export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E50914', // Netflix brand red
          dark: '#b80710',
          hover: '#ff1a26',
        },
        brandDark: {
          DEFAULT: '#080808', // pitch dark theme
          card: '#121212', // container dark
          hover: '#1b1b1b', // light hover dark
          nav: 'rgba(8, 8, 8, 0.75)', // glassy dark
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'glass-radial': 'radial-gradient(circle at top, rgba(229, 9, 20, 0.15) 0%, rgba(8, 8, 8, 0) 70%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glass-inset': 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 8px 32px 0 rgba(0, 0, 0, 0.57)',
        'neon-red': '0 0 15px rgba(229, 9, 20, 0.35)',
      },
    },
  },
  plugins: [],
};
