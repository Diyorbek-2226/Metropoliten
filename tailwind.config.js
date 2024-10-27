/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'small': '330px',   
        'minimum': '480px',  
      },
      colors: {
        'custom-gray': '#F5F5F5', // Yangi rang qo'shildi
      },
    },
  },
  plugins: [],
}