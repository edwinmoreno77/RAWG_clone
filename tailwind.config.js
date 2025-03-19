/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'cursive': ['"Poppins"', '"Montserrat"', '"Raleway"', '"Roboto"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
