import { Colors } from "chart.js";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Your primary color
        "primary-foreground": "#f0f4fc", // Your primary foreground color
        secondary: "#f9f9f9", // Your secondary color
      },
    },
  },
  plugins: [],
};
