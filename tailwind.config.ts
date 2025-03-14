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
          light: '#8B5CF6', // Light purple
          DEFAULT: '#7C3AED', // Primary purple
          dark: '#6D28D9' // Dark purple
        },
        secondary: {
          light: '#34D399', // Light green
          DEFAULT: '#10B981', // Primary green
          dark: '#059669' // Dark green
        },
        neutral: {
          lightest: '#F9FAFB',
          light: '#F3F4F6',
          DEFAULT: '#E5E7EB',
          dark: '#D1D5DB',
          darkest: '#9CA3AF'
        },
        blockchain: {
          polygon: '#8247E5' // Polygon brand color
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
        'button': '0 4px 6px -1px rgba(124, 58, 237, 0.5)'
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        voting: {
          'primary': '#7C3AED', // Purple
          'primary-focus': '#6D28D9',
          'primary-content': '#ffffff',

          'secondary': '#10B981', // Green
          'secondary-focus': '#059669',
          'secondary-content': '#ffffff',

          'accent': '#8247E5', // Polygon color
          'accent-focus': '#6E35D4',
          'accent-content': '#ffffff',

          'neutral': '#3D4451',
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
          'primary': '#8B5CF6', // Lighter purple for dark mode
          'primary-focus': '#7C3AED',
          'primary-content': '#ffffff',

          'secondary': '#34D399', // Lighter green for dark mode
          'secondary-focus': '#10B981',
          'secondary-content': '#ffffff',

          'accent': '#9061F9', // Lighter Polygon color
          'accent-focus': '#8247E5',
          'accent-content': '#ffffff',

          'neutral': '#1F2937',
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
