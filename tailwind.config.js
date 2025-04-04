/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layouts/**/*.html"],
  theme: {
    fontSize: {
      base: ['0.875rem', "1.5rem"]
    },
    extend: {
      colors: {
        nt84blue: '#3d4CE0',
        nt84lightblue: '#BFD3ED',
        nt84orange: '#EB6649',
        nt84darkorange: '#C5543B',
      },
    },
  },
  plugins: [],
  darkMode: ['class', 'html[class~="dark"]']
}

