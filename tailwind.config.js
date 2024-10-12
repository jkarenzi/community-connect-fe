/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend:{
      colors:{
        custom:{
          darkRed: '#8c181b',
          textBlue: '#002839'
        }
      },
      boxShadow: {
        'all-sides': '0 5px 15px rgba(0, 0, 0, 0.2)',
      },
    }    
  },
  plugins: [],
}

