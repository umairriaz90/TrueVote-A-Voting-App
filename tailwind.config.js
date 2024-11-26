/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'patriot-blue': '#002868',
        'patriot-blue-dark': '#001a4d',
        'patriot-red': '#bf0a30',
        'patriot-red-dark': '#8c0016',
        'patriot-white': '#ffffff'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dual-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
}