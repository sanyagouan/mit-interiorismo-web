/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        // Paleta MIT Interiorismo — basada en decisiones aprobadas
        teal: {
          DEFAULT: '#115A6B',
          light: '#4C8390',
          deep: '#0A3D4A',
          mist: '#D8E5E8',
        },
        ink: {
          DEFAULT: '#1A1817',   // casi negro cálido
          soft: '#2A2826',
          muted: '#5C5853',
          light: '#8A8580',
        },
        cream: {
          DEFAULT: '#FAF7F2',   // fondo principal
          warm: '#F0EBE0',
          deep: '#EDE4D4',
        },
        accent: {
          clay: '#D4A373',
          terracotta: '#C4553C',
          olive: '#8A9B68',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Escala tipográfica editorial (display > 7xl)
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      spacing: {
        'section': 'clamp(4rem, 10vh, 8rem)',
        'gutter': 'clamp(1.25rem, 4vw, 2.5rem)',
      },
      maxWidth: {
        'editorial': '78ch',
        'wide': '90rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      animation: {
        'reveal': 'reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};