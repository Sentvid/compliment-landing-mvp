/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          dark: '#12131C',
          blue: '#25C6F5',
          gold: '#C49B42',
        },
        // Secondary Colors
        secondary: {
          purple: '#6B46C1',
          bronze: '#8B6914',
          silver: '#C0C0C0',
        },
        // Tetrahedron Colors
        tetra: {
          blue: '#3B82F6',
          red: '#DC2626',
          green: '#10B981',
          yellow: '#F59E0B',
        },
        // Text Colors
        text: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #12131C 0%, #1E1E2E 50%, #12131C 100%)',
        'card-overlay': 'linear-gradient(135deg, rgba(37, 198, 245, 0.1) 0%, rgba(107, 70, 193, 0.1) 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(37, 198, 245, 0.5)',
        'glow-gold': '0 0 20px rgba(196, 155, 66, 0.5)',
      },
      animation: {
        'orbit-rotate': 'orbit-rotate 10s linear infinite',
        'tetra-spin': 'tetra-spin 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'hologram-shift': 'hologram-shift 6s ease-in-out infinite',
      },
      keyframes: {
        'orbit-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'tetra-spin': {
          '0%, 100%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '50%': { transform: 'rotateX(180deg) rotateY(180deg)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1', boxShadow: '0 0 20px rgba(196, 155, 66, 0.5)' }
        },
        'hologram-shift': {
          '0%, 100%': { transform: 'translateZ(0) rotateY(0deg)' },
          '50%': { transform: 'translateZ(10px) rotateY(5deg)' }
        }
      },
      clipPath: {
        'arcane': 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
      }
    },
  },
  plugins: [],
}
