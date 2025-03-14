import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA', // Light blue
          DEFAULT: '#3B82F6', // Primary Blue
          dark: '#2563EB' // Darker blue
        },
        secondary: {
          light: '#34D399', // Complements blue well
          DEFAULT: '#10B981', // Primary Green
          dark: '#059669' // Darker green
        },
        neutral: {
          lightest: '#F9FAFB',
          light: '#F3F4F6',
          DEFAULT: '#E5E7EB',
          dark: '#D1D5DB',
          darkest: '#9CA3AF'
        },
        blockchain: {
          base: '#0052FF' // Base’s brand blue
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem'
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 4px 6px -1px rgba(59, 130, 246, 0.5)' // Updated to match new primary blue
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        voting: {
          'primary': '#3B82F6', // Updated to Base blue
          'primary-focus': '#2563EB',
          'primary-content': '#ffffff',

          'secondary': '#10B981', // Unchanged green
          'secondary-focus': '#059669',
          'secondary-content': '#ffffff',

          'accent': '#0052FF', // Base’s core blue as accent
          'accent-focus': '#003ECB',
          'accent-content': '#ffffff',

          'neutral': '#3D4451', // Unchanged
          'neutral-focus': '#2A2E37',
          'neutral-content': '#ffffff',

          'base-100': '#ffffff',
          'base-200': '#F9FAFB',
          'base-300': '#F3F4F6',
          'base-content': '#1F2937',

          'info': '#3ABFF8',
          'success': '#36D399',
          'warning': '#FBBD23',
          'error': '#F87272',

          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '0.5rem',

          '--animation-btn': '0.3s',
          '--animation-input': '0.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '0.5rem',
          '--border-btn': '1px'
        },
        dark: {
          'primary': '#60A5FA', // Lighter Base blue for dark mode
          'primary-focus': '#3B82F6',
          'primary-content': '#ffffff',

          'secondary': '#34D399', // Unchanged green
          'secondary-focus': '#10B981',
          'secondary-content': '#ffffff',

          'accent': '#1E90FF', // Lighter Base blue for dark mode
          'accent-focus': '#0052FF',
          'accent-content': '#ffffff',

          'neutral': '#1F2937', // Unchanged
          'neutral-focus': '#111827',
          'neutral-content': '#ffffff',

          'base-100': '#1F2937',
          'base-200': '#111827',
          'base-300': '#0F172A',
          'base-content': '#F9FAFB',

          'info': '#3ABFF8',
          'success': '#36D399',
          'warning': '#FBBD23',
          'error': '#F87272',

          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '0.5rem',

          '--animation-btn': '0.3s',
          '--animation-input': '0.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '0.5rem',
          '--border-btn': '1px'
        }
      }
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: ''
  }
} satisfies Config;