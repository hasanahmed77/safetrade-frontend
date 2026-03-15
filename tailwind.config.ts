import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#050505',
        carbon: '#0b0b0b',
        graphite: '#111111',
        neon: '#7cffa9',
        ember: '#ff6b6b'
      },
      fontFamily: {
        display: ['var(--font-sora)', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 30px rgba(124, 255, 169, 0.2)'
      }
    }
  },
  plugins: []
};

export default config;
