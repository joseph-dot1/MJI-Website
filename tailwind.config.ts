import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Raw palette — 5 values, hard cap.
        ink: "#000000",
        paper: "#FFFFFF",
        ash: "#1A1A1A",
        smoke: "#8A8A8A",
        fog: "#F0F0F0",
        // Semantic — flipped per-section via [data-theme="dark"].
        bg: "var(--bg)",
        fg: "var(--fg)",
        body: "var(--fg-body)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        ghost: "var(--ghost)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        text: ["var(--font-text)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3.25rem, 2rem + 6.2vw, 7.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "display-cta": [
          "clamp(2.75rem, 1.75rem + 4.6vw, 5.75rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "display-scene": [
          "clamp(1.375rem, 1rem + 1.4vw, 2.125rem)",
          { lineHeight: "1.25", letterSpacing: "-0.005em", fontWeight: "500" },
        ],
        "display-lg": [
          "clamp(2.25rem, 1.5rem + 3.1vw, 5rem)",
          { lineHeight: "1.04", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        "display-md": [
          "clamp(1.625rem, 1.25rem + 1.4vw, 2.75rem)",
          { lineHeight: "1.12", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        "display-stat": [
          "clamp(3.5rem, 2.5rem + 4.5vw, 7rem)",
          { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "ghost-numeral": [
          "clamp(6rem, 4rem + 7vw, 13rem)",
          { lineHeight: "1", fontWeight: "400" },
        ],
        "body-lg": [
          "clamp(1.125rem, 1rem + 0.45vw, 1.375rem)",
          { lineHeight: "1.55" },
        ],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em", fontWeight: "600" }],
        label: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "500" }],
      },
      maxWidth: {
        site: "1320px",
        measure: "65ch",
      },
      transitionTimingFunction: {
        out3: "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
