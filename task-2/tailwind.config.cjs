/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //prettier-ignore
      gridTemplateColumns: {
        'week': 'repeat(auto-fill,  24px)',
      },
      colors: {
        "black-rgba": "rgba(38, 40, 66, 0.12)",
      },
      boxShadow: {
        "shadow-table": "-33px 0px 20px -29px rgba(0, 0, 0, 0.2) inset",
      },
    },
  },
  plugins: [],
};
