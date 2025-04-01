import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--gard-primary))',
        'primary-foreground': 'hsl(var(--gard-primary-foreground))',
        secondary: 'hsl(var(--gard-secondary))',
        'secondary-foreground': 'hsl(var(--gard-secondary-foreground))',
        accent: 'hsl(var(--gard-accent))',
        'accent-foreground': 'hsl(var(--gard-accent-foreground))',
        background: 'hsl(var(--gard-background))',
        foreground: 'hsl(var(--gard-foreground))',
        muted: 'hsl(var(--gard-muted))',
        'muted-foreground': 'hsl(var(--gard-muted-foreground))',
        popover: 'hsl(var(--gard-popover))',
        'popover-foreground': 'hsl(var(--gard-popover-foreground))',
        card: 'hsl(var(--gard-card))',
        'card-foreground': 'hsl(var(--gard-card-foreground))',
        border: 'hsl(var(--gard-border))',
        input: 'hsl(var(--gard-input))',
        ring: 'hsl(var(--gard-ring))',
        brand: {
          primary: '#1A2A90',
          dark: '#0F172A',
          light: '#E8ECF8',
          cta: '#1A2A90',
          accent: '#3B82F6',
        },
      },
      fontFamily: {
        title: ['var(--font-poppins)'],
        body: ['var(--font-inter)'],
      },
      fontSize: {
        'heading-1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-3': ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-4': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-5': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5' }],
        'body-base': ['1rem', { lineHeight: '1.5' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;