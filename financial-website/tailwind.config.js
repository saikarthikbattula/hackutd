/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Add slate colors for dark mode
        slate: {
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        
        // Add indigo colors for primary actions
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        
        // Add purple for accent colors
        purple: {
          500: '#a855f7',
        },
        
        // Add gray for text and borders
        gray: {
          300: '#d1d5db',
          400: '#9ca3af',
        },
        
        // Add green for success states
        green: {
          400: '#4ade80',
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
};