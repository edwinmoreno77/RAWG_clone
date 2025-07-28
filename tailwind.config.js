/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: [
          '"Poppins"',
          '"Montserrat"',
          '"Raleway"',
          '"Roboto"',
          "sans-serif",
        ],
      },
      animation: {
        "background-shine": "background-shine 2s linear infinite",
      },
      keyframes: {
        "background-shine": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [tailwindScrollbar],
  variants: {
    scrollbar: ["rounded"], // Opcional: para bordes redondeados en la barra
  },
};
