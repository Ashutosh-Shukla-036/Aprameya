// tailwind.config.js
export default {
  lightMode : 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(33,33,33,1) 0%, rgba(69,69,69,1) 100%)',
        'charcoal-metallic-dark': 'linear-gradient(90deg, rgba(33,33,33,1) 0%, rgba(55,55,55,1) 50%, rgba(69,69,69,1) 100%)',
      },
    },
  },
  plugins: [],
}