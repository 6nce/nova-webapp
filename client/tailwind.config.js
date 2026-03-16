/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        novaSand: "#FFD7B5",
        novaNavy: "#1E2A38",
        novaSlate: "#8A94A6",
        novaCream: "#F3EFE8",
        novaAurora: "#5FD3A6",
        novaNavyShadow: "#121921"
      },
      fontFamily: {
        asap: ["Asap","system-ui", "sans-serif"],
      },
      letterSpacing: {
        superwide: "0.35em",
        ultrawide: "0.5em",
      }
    }
  },
  plugins: [],
}

