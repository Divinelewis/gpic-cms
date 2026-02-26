/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4B3B2F",
          "primary-dark": "#2C1F13",
          "primary-light": "#7A5E4C",
          secondary: "#E4B400",
          "secondary-dark": "#B48A00",
          "secondary-light": "#FFE066",
          accent: "#3B6A45",
          "accent-dark": "#22422B",
          "accent-light": "#71B78E",
          dark: "#1D1D1D",
          "dark-light": "#4B4B4B",
          light: "#F9F8F2",
          cream: "#FFF5E1",
          sky: "#EFEAE2",
        },
      },
      fontFamily: {
        sans: ["Lato", "system-ui", "sans-serif"],
        heading: ["Roboto", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-in forwards",
        "slide-up": "slideUp 1s ease-out forwards",
        "slide-right": "slideRight 0.8s ease-out forwards",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        "gradient-sunset": "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
      },
    },
  },
  plugins: [],
};
