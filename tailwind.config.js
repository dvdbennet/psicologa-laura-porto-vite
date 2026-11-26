/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Young Serif"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Onest"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        mist: '#FAF9F6',
        mint: { 100: '#CFEFE4', 300: '#7FE0C2', 500: '#2BB39A' },
        brand: { DEFAULT: '#0A7F62', dark: '#0A6E54' },
        ink: {
          50: '#f5f6f6',
          100: '#e8eaea',
          400: '#7E928B',
          600: '#4A6159',
          700: '#2C463D',
          800: '#1A362D',
          900: '#0F2A22',
        },
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(15, 45, 38, 0.08)',
        lifted: '0 24px 60px -20px rgba(6, 78, 59, 0.35)',
        glow: '0 0 0 1px rgba(16,185,129,0.15), 0 20px 40px -12px rgba(16,185,129,0.25)',
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-18px,0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        breathe: 'breathe 8s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 3s linear infinite',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};
