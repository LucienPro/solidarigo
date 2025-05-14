import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        shake: "shake 0.3s ease-in-out",
      },
    },
        keyframes: {
          "fade-in": {
            "0%": { opacity: "0", transform: "translateY(-10px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
        },
        animation: {
          "fade-in": "fade-in 0.2s ease-out",
        },
      
  },
  plugins: [],
};

export default config;
