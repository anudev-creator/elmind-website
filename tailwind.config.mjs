/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Your existing colors
      colors: {
        brand: {
          DEFAULT: "#2AA5A3",
          light: "#34C7C4",
        },
      },
      
      // Updated animations
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards", // Updated timing for the component
        "slide-up": "slideUp 0.7s ease-out forwards", // Added slide-up
      },

      // Updated keyframes
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: { // Added slide-up keyframes
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;