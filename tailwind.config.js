/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        450: "450px",
        460: "460px",
        508: "508px",
        656: "656px",
        880: "880px",
      },
      height: {
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        headingColor: "#272727",
        textColor: "#5A5A5A",
        cartNotif: "#EF233C",
        cartNumBg: "#e80013",
        cardOverlay: "rgba(256,256,256,0.4)",
        card: "rgba(256,256,256,0.8)",
        primary: "#E9ECEF",
        overlay: "rgba(216, 243, 220, 0.3)",
        cartBg: "#FFAB91"
      }
    },
  },
  plugins: [],
}
