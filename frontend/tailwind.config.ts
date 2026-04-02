import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'space': '#0d0d1a',
        'space-light': '#151528',
        'magic': '#7B61FF',
        'magic-glow': '#9B85FF',
        'growth': '#00F5A8',
        'rug': '#FF4D6A',
        'warning': '#FFB347',
      },
      fontFamily: {
        'display': ['Nunito', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'faint': 'faint 2s forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(123, 97, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(123, 97, 255, 0.6)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        faint: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.9)' },
          '100%': { opacity: '0.3', transform: 'scale(0.7)', filter: 'grayscale(100%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
