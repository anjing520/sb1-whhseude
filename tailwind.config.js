/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#eef4fb',
          100: '#d7e5f5',
          200: '#adc9e9',
          300: '#7ea7d9',
          400: '#4f80c4',
          500: '#2f61a8',
          600: '#214a86',
          700: '#1a3a6b',
          800: '#142c52',
          900: '#0d1e39',
          950: '#081227',
        },
        amber: {
          50: '#fff8eb',
          100: '#fef0c7',
          200: '#fde08a',
          300: '#fbca4d',
          400: '#f9b224',
          500: '#f3910b',
          600: '#d76e06',
          700: '#b24d09',
          800: '#913c0e',
          900: '#77320f',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};
