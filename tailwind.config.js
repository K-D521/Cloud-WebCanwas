module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#6e57e0",
        "custom-pink": "#f063a4",
      },
      backgroundImage: (theme) => ({
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      }),
    },
  },
  plugins: [],
};
