/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B5E20",
          light: "#4CAF50",
          dark: "#0D3B12",
        },
        secondary: {
          DEFAULT: "#FF8F00",
          light: "#FFB300",
        },
        danger: "#C62828",
        success: "#2E7D32",
        warning: "#F9A825",
        info: "#1565C0",
        surface: "#FFFFFF",
        muted: "#5F6368",
        appbg: "#F5F7F5",
        border: "#E0E0E0",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 12px rgba(0,0,0,0.08)",
        lg: "0 8px 24px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};