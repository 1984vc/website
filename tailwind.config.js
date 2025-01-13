/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["layouts/**/*.html", "assets/**/*.css"],
  theme: {
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
}

