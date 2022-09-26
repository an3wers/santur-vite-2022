// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,vue}"],
  theme: {
    extend: {
      fontFamily: {
        // 'sans': ['Open Sans', 'sans-serif'],
        sans: ["Inter", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        primary: "#1976D2",
        "primary-hover": "#1565C0",
        secondary: "#e5e7eb",
        "secondary-text": "#6b7280",
        slate: {
          150: "#EBEFF5",
        },
        // 'slate-150': '#EBEFF5'
      },
    },
  },

  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],

  variants: {
    // scrollbar: ["rounded"],
  },

};
