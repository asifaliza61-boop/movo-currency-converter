/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        lime: {
          DEFAULT: '#CFF008',
          hover: '#d6ff1a',
          dark: '#aac800',
        },
        dark: {
          DEFAULT: '#131313',
          card: '#1A1A1A',
          elevated: '#222222',
          border: '#2A2A2A',
          hover: '#2F2F2F',
        },
        muted: '#8F8F8F',
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.35s ease forwards',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
