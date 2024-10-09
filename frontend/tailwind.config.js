/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '2rem',
          sm: '4rem',
          lg: '8rem',
          xl: '10rem',
        },
      },
    },
  },
  plugins: [],
}

