module.exports = {
  content: ["./src/**/*.{js,ts,vue}"],
  theme: {
    screens: {
      sm: "600px",
      // => @media (min-width: 640px) { ... }

      md: "1024px",
      // => @media (min-width: 768px) { ... }

      lg: "1440px",
      // => @media (min-width: 1024px) { ... }

      xl: "1920px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        primary: "#37a2b8",
        secondary: "#56a9b9",
      },
      fontFamily: {
        title: ["Gloria Hallelujah", "cursive"],
      },
      minWidth: {
        750: "750px",
        "100vw": "100vw",
        "90vw": "90vw",
        "80vw": "80vw",
        "70vw": "70vw",
        "60vw": "60vw",
        "50vw": "50vw",
        "40vw": "40vw",
        "30vw": "30vw",
        "20vw": "20vw",
        "10vw": "10vw",
      },
    },
  },
  plugins: [],
};
