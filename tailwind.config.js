import twElementsPlugin from "tw-elements/plugin.cjs";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [twElementsPlugin],
  darkMode: "class",
};
