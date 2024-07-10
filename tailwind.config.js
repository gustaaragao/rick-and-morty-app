/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "shake-r": "shake-r 0.82s cubic-bezier(.36,.07,.19,.97) both",
        "shake-l": "shake-l 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        "shake-r": {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
        "shake-l": {
          "10%, 90%": {
            transform: "translate3d(1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(-2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(-4px, 0, 0)",
          },
        },
      },
    },
    colors: {
      purple: {
        50: "#efeff6",
        100: "#cecee3",
        200: "#aeaed1",
        300: "#8d8dbf",
        400: "#6c6cac",
        500: "#535393",
        600: "#404072",
        700: "#2e2e51",
        800: "#1c1c31",
        900: "#090910",
      },
      green: {
        50: "#eff8ec",
        100: "#ceebc7",
        200: "#aedda1",
        300: "#8dd07c",
        400: "#6dc257",
        500: "#53a83d",
        600: "#41832f",
        700: "#2e5e22",
        800: "#1c3814",
        900: "#091307",
      },
      black: {
        50: "#f3f3f3",
        100: "#dcdcdc",
        200: "#c5c5c5",
        300: "#aeaeae",
        400: "#979797",
        500: "#808080",
        600: "#686868",
        700: "#515151",
        800: "#3a3a3a",
        900: "#232323",
        950: "#0c0c0c",
      },
      gray: colors.gray,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
      blue: colors.blue,
      amber: colors.amber,
      white: "#ffffff",
    },
  },
  plugins: [],
};
