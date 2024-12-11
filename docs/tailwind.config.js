/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./cap-table-worksheet/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nt84blue: '#3d4CE0',
        nt84bluedarker: '#2031c5',
        nt84lightblue: '#BFD3ED',
        nt84lighterblue: '#ebf1f9',
        nt84orange: '#EB6649',
        nt84orangedarker: '#C5543B',
      },
    },
  },
  plugins: [],
}

