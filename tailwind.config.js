/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        loginBg: "url('./assets/loginBg.png')"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
});
