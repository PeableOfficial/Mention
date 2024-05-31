/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@oxyhq/**/*.{html,js, jsx}",
  ],
  theme: {
    screens: {
      sm: "500px",
      md: "700px",
      lg: "1020px",
      xl: "1120px",
      xxl: "1300px",
    },

    extend: {
      colors: {
        transparent: "transparent",
        textC: "#444746",
        textC2: "#4285F4",
        bgc: "#F7F9FC",
        darkC2: "#EDF2FC",
        darkC: "#E1E5EA",

        primary: {
          100: "rgb(var(--tw-clr-primary-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-primary-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-primary-300) / <alpha-value>)",
        },

        secondary: {
          100: "rgb(var(--tw-clr-secondary-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-secondary-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-secondary-300) / <alpha-value>)",
        },

        tertiary: {
          100: "rgb(var(--tw-clr-tertiary-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-tertiary-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-tertiary-300) / <alpha-value>)",
        },

        neutral: {
          100: "rgb(var(--tw-clr-neutral-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-neutral-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-neutral-300) / <alpha-value>)",
          400: "rgb(var(--tw-clr-neutral-400) / <alpha-value>)",
          500: "rgb(var(--tw-clr-neutral-500) / <alpha-value>)",
          600: "rgb(var(--tw-clr-neutral-600) / <alpha-value>)",
        },

        background: "rgb(var(--tw-clr-background) / <alpha-value>)",

        dim: {
          100: "rgb(var(--tw-clr-dim-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-dim-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-dim-300) / <alpha-value>)",
        },

        blue: {
          100: "rgb(var(--tw-clr-blue-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-blue-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-blue-300) / <alpha-value>)",
        },

        yellow: {
          100: "rgb(var(--tw-clr-yellow-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-yellow-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-yellow-300) / <alpha-value>)",
        },

        rose: {
          100: "rgb(var(--tw-clr-rose-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-rose-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-rose-300) / <alpha-value>)",
        },

        purple: {
          100: "rgb(var(--tw-clr-purple-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-purple-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-purple-300) / <alpha-value>)",
        },

        orange: {
          100: "rgb(var(--tw-clr-orange-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-orange-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-orange-300) / <alpha-value>)",
        },

        green: {
          100: "rgb(var(--tw-clr-green-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-green-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-green-300) / <alpha-value>)",
        },

        red: {
          100: "rgb(var(--tw-clr-red-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-red-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-red-300) / <alpha-value>)",
        },

        lime: {
          100: "rgb(var(--tw-clr-lime-100) / <alpha-value>)",
          200: "rgb(var(--tw-clr-lime-200) / <alpha-value>)",
          300: "rgb(var(--tw-clr-lime-300) / <alpha-value>)",
        },
      },

      fontSize: {
        kilo: "var(--fs-kilo)",
        h1: "var(--fs-h1)",
        h2: "var(--fs-h2)",
        h3: "var(--fs-h3)",

        base: "var(--fs-base)",

        large: "var(--fs-large)",
        milli: "var(--fs-milli)",
        micro: "var(--fs-micro)",
        nano: "var(--fs-nano)",
        pico: "var(--fs-pico)",
      },

      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },

      zIndex: {
        dropdown: 1000,
        sticky: 1020,
        fixed: 1030,
        backdrop: 1040,
        modal: 1050,
        popover: 1060,
        tooltip: 1070,
      },

      spacing: {
        kilo: "var(--fs-kilo)",
        h1: "var(--fs-h1)",
        h2: "var(--fs-h2)",
        h3: "var(--fs-h3)",

        base: "var(--fs-base)",

        large: "var(--fs-large)",
        milli: "var(--fs-milli)",
        micro: "var(--fs-micro)",
        nano: "var(--fs-nano)",
        pico: "var(--fs-pico)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
