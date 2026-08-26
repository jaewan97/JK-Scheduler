import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F2F2F7",
        surface: "#FFFFFF",
        ink: "#1C1C1E",
        "ink-soft": "#8A8A8E",
        hairline: "rgba(60,60,67,0.29)",
        coral: {
          DEFAULT: "#FF6B4A",
          soft: "#FFE3DA",
        },
        tag: {
          blue: "#0A84FF",
          green: "#30D158",
          purple: "#BF5AF2",
          yellow: "#FFB300",
          pink: "#FF375F",
          coral: "#FF6B4A",
        },
      },
      fontFamily: {
        sf: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        ios: "20px",
        sheet: "28px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        fab: "0 10px 24px rgba(255,107,74,0.38)",
        sheet: "0 -8px 40px rgba(0,0,0,0.18)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        pulseRing: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,107,74,0.45)" },
          "50%": { boxShadow: "0 0 0 6px rgba(255,107,74,0)" },
        },
        sheetUp: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        popIn: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 2.4s ease-in-out infinite",
        "sheet-up": "sheetUp 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "pop-in": "popIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
