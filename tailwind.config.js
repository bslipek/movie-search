module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    cursor: {
      pointer: "pointer",
      "zoom-in": "zoom-in",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
