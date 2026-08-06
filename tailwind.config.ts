import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surface hierarchy
        surface: {
          DEFAULT: '#0A0C10',
          elevated: '#161920',
          inset: '#1A1D23',
          container: '#1e2024',
          overlay: '#1C2028',
        },
        // Brand
        brand: {
          primary: '#6366F1',
          'primary-hover': '#4F46E5',
          'primary-dim': '#c0c1ff',
          accent: '#10B981',
          'accent-dim': 'rgba(16,185,129,0.15)',
          warning: '#F59E0B',
          danger: '#EF4444',
          tertiary: '#ffb783',
        },
        // Text
        text: {
          primary: '#e2e2e8',
          secondary: '#c7c4d7',
          tertiary: '#908fa0',
          disabled: '#464554',
        },
        // Border
        border: {
          DEFAULT: 'rgba(255,255,255,0.10)',
          subtle: 'rgba(255,255,255,0.06)',
          strong: 'rgba(255,255,255,0.16)',
          focus: '#6366F1',
          error: '#EF4444',
          variant: '#464554',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display':    ['64px',  { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-xl':['48px',  { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-xl-mobile': ['36px', { lineHeight: '1.1', fontWeight: '700' }],
        'headline-lg':['32px',  { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-sm':['24px',  { lineHeight: '1.3',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg':    ['18px',  { lineHeight: '1.6',  fontWeight: '400' }],
        'body-md':    ['16px',  { lineHeight: '1.6',  fontWeight: '400' }],
        'body-sm':    ['14px',  { lineHeight: '1.5',  fontWeight: '400' }],
        'code-label': ['12px',  { lineHeight: '1',    letterSpacing: '0.05em', fontWeight: '500' }],
        'status-label':['11px', { lineHeight: '1',    fontWeight: '400' }],
      },
      borderRadius: {
        sm:   '2px',
        DEFAULT: '4px',
        md:   '6px',
        lg:   '8px',
        xl:   '12px',
        '2xl':'16px',
        '3xl':'24px',
        full: '9999px',
      },
      spacing: {
        gutter: '24px',
        'margin-desktop': '48px',
        'margin-mobile': '20px',
        'max-content': '1120px',
      },
      maxWidth: {
        content: '1120px',
      },
      animation: {
        'fade-in':   'fadeIn 300ms ease-out',
        'slide-up':  'slideUp 300ms ease-out',
        'pulse-dot': 'pulseDot 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.15), transparent)',
        'cta-glow':  'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.08), transparent)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
};

export default config;
