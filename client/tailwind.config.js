/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: 'var(--cyber-bg)',
          card: 'var(--cyber-card)',
          border: 'var(--cyber-border)',
          text: 'var(--cyber-text)',
          muted: 'var(--cyber-muted)',
          primary: 'var(--cyber-primary)',
          primaryGlow: 'var(--cyber-primary-glow)',
          secondary: 'var(--cyber-secondary)',
          accent: 'var(--cyber-accent)',
          danger: 'var(--cyber-danger)',
          success: 'var(--cyber-success)',
          warning: 'var(--cyber-warning)'
        }
      },
      boxShadow: {
        'neon': '0 0 15px var(--cyber-primary-glow), 0 0 30px var(--cyber-primary-glow)',
        'neon-sm': '0 0 8px var(--cyber-primary-glow)',
        'neon-secondary': '0 0 15px var(--cyber-secondary-glow)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        cyber: ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        }
      }
    },
  },
  plugins: [],
}
