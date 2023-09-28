/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    // extend와 겹치는 설정이 있을 경우 기본 css 스타일을 우선시한다.
    
    extend: {
      
      // 내가 원하는 컬러를 기본 컬러로 지정해서 사용할 수 있다.
      color: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      
      // 내가 원하는 폰트를 기본 폰트로 지정할 수 있다.
      fontFamily: {
        sans: ["Grapik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      }
    }
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

