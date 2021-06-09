module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#f9faf9",
          100: "#f0f1f2",
          200: "#dcdfe1",
          300: "#b6bcbf",
          400: "#879496",
          500: "#697270",
          600: "#535753",
          700: "#40413f",
          800: "#242526",
          900: "#1a1a1c",
        },
        yellow: "#FFDF36",
      },
      spacing: {
        120: "34rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
