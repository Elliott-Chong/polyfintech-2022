/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        mono: ["DM mono"],
        spacemono: ["Space Mono"],
        karla: ["Karla"],
      },
    },
  },
  plugins: [],
};
