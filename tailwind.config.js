/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Required Custom Palette
        brand: {
          deep: '#1F5D42',     // Main deep green
          primary: '#246B4A',  // Button / primary green
          fresh: '#4F9D69',    // Fresh / safe green
          orange: '#E68A35',   // Warm food orange accent
          yellow: '#E7A72E',   // Warning yellow
          red: '#D9534F',      // Danger / report red
          bg: '#FFF9EF',       // Main background cream
          card: '#FFFFFF',     // Cards white
          text: '#19352A',     // Main text
          muted: '#64776B',    // Secondary text
          border: '#E8DCB8',   // Warm border
        },
        forest: {
          50: '#F4F9F5',
          100: '#E4F0E8',
          200: '#C8E0D2',
          300: '#9EC8AF',
          400: '#6FA988',
          500: '#4F9D69',
          600: '#3D8557',
          700: '#2E6E48',
          800: '#246B4A',
          900: '#1F5D42',
          950: '#133D2B',
          deep: '#19352A'
        },
        safety: {
          good: '#4F9D69',
          attention: '#E7A72E',
          urgent: '#D9534F',
          neutral: '#64776B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(31, 93, 66, 0.04), 0 1px 2px rgba(31, 93, 66, 0.02)',
        'soft-md': '0 4px 12px -2px rgba(31, 93, 66, 0.06), 0 2px 6px -1px rgba(31, 93, 66, 0.03)',
        'soft-lg': '0 10px 20px -3px rgba(31, 93, 66, 0.08), 0 4px 8px -2px rgba(31, 93, 66, 0.04)',
        'soft-xl': '0 20px 30px -5px rgba(31, 93, 66, 0.1), 0 10px 12px -5px rgba(31, 93, 66, 0.05)',
        'food-glow': '0 0 20px -4px rgba(230, 138, 53, 0.25)',
      }
    },
  },
  plugins: [],
}
