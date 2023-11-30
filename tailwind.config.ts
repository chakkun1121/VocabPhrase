const colors = require("tailwindcss/colors");
const BahamaBlue = {
  "50": "#f4f8f9",
  "100": "#daf1fa",
  "200": "#afe2f5",
  "300": "#7bc3e5",
  "400": "#44a0cf",
  "500": "#327eba",
  "600": "#2a64a1",
  "700": "#234b7f",
  "800": "#19325a",
  "900": "#0f1e3b",
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./mdx-components.tsx"],
  darkMode: "class",
  theme: {
    colors: {
      BahamaBlue,
      primary: BahamaBlue,
      JungleGreen: {
        "50": "#edf5f2",
        "100": "#cef0eb",
        "200": "#94e9cf",
        "300": "#58d1a1",
        "400": "#1db46f",
        "500": "#149b46",
        "600": "#128733",
        "700": "#12682b",
        "800": "#0e4823",
        "900": "#0a2c1c",
      },
      SelectivYellow: {
        "50": "#faf9f0",
        "100": "#f8efa1",
        "200": "#eee05e",
        "300": "#d4be34",
        "400": "#a89619",
        "500": "#85790b",
        "600": "#6a6107",
        "700": "#524907",
        "800": "#383207",
        "900": "#271f06",
      },
      Pizazz: {
        "50": "#fbfaf3",
        "100": "#f9efb4",
        "200": "#f1dd75",
        "300": "#dbb946",
        "400": "#ba9024",
        "500": "#9a7112",
        "600": "#7d570b",
        "700": "#60420b",
        "800": "#412d0a",
        "900": "#2c1c08",
      },
      BlazeOrange: {
        "50": "#fcfbf7",
        "100": "#faf0d3",
        "200": "#f5d8a6",
        "300": "#e6af72",
        "400": "#d68246",
        "500": "#bf6028",
        "600": "#a2461a",
        "700": "#7d3515",
        "800": "#562411",
        "900": "#37160b",
      },
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      link: {
        DEFAULT: "#327eba",
        hover: "#234b7f",
        visited: "#234b7f",
      },
    },
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(0, 1fr))",
      },
      fontSize: {
        "heading-L": [
          "36px",
          {
            lineHeight: 1.4,
            letterSpacing: "0.04em",
            fontWeight: "Regular",
          },
        ],
        "heading-M": [
          "32px",
          {
            lineHeight: 1.5,
            letterSpacing: "0.04em",
            fontWeight: "Regular",
          },
        ],
        "heading-S": [
          "28px",
          {
            lineHeight: 1.5,
            letterSpacing: "0.04em",
            fontWeight: "Regular",
          },
        ],
        L: [
          // 通常の本文
          "16px",
          {
            lineHeight: 1.7,
            letterSpacing: "0.04em",
            fontWeight: "Regular",
          },
        ],
        M: [
          "14px",
          {
            lineHeight: 1.7,
            letterSpacing: "0.04em",
            fontWeight: "Regular",
          },
        ],
        button: [
          "16px",
          {
            lineHeight: 1.5,
            letterSpacing: "0.04em",
            fontWeight: "Bold",
          },
        ],
      },
    },
  },
};
