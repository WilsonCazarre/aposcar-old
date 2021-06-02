module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: "#141414",
        gray: {
          700: "#303030",
          800: "#232323",
          900: "#141414",
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
