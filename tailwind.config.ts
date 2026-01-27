// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Healthcare Palette
        platinum: '#E5E4E2',
        sapphire: '#0F52BA',
        emerald: '#50C878',
        onyx: '#353839',
        'gold-accent': '#D4AF37',
        'glass-light': 'rgba(255, 255, 255, 0.08)',
        'glass-dark': 'rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #E5E4E2 0%, #FFFFFF 50%, #F8F9FA 100%)',
        'gradient-sapphire': 'linear-gradient(135deg, #0F52BA 0%, #1E3A8A 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #50C878 0%, #1A875F 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      },
      backdropBlur: {
        'luxury': '20px',
      }
    },
  },
  plugins: [],
}
export default config
