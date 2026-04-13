/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'webmart-bg': '#20292A',
        'webmart-accent': '#DD009F',
        'webmart-accent-dark': '#B80085',
        'webmart-text-primary': '#FFFFFF',
        'webmart-text-secondary': '#E8E8E8',
        'webmart-text-muted': '#94A3B8',
        'webmart-glass': 'rgba(255, 255, 255, 0.05)',
        'webmart-glass-border': 'rgba(255, 255, 255, 0.15)',
        'webmart-glow': 'rgba(221, 0, 159, 0.5)',
      },
      fontFamily: {
        'gilroy': ['Gilroy', 'Manrope', 'sans-serif'],
        'sans': ['Gilroy', 'Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'webmart-gradient': 'linear-gradient(135deg, #DD009F 0%, #B80085 100%)',
        'webmart-gradient-radial': 'radial-gradient(circle at 50% 50%, #DD009F 0%, #B80085 100%)',
      },
      boxShadow: {
        'webmart-glow': '0 0 30px rgba(221, 0, 159, 0.5)',
        'webmart-glow-hover': '0 0 40px rgba(221, 0, 159, 0.6)',
        'webmart-card': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'webmart-card-hover': '0 12px 40px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'slide-in-up': 'slide-in-up 0.6s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(221, 0, 159, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(221, 0, 159, 0.6)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'rotate-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}


