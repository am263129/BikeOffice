module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.jsx',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          
          green: "#57de77",
          darkgreen:"#003b3a"
        }
      },
      spacing:{
        "custom-full":"1600px;"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
