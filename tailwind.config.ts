/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        drawerBackdropFadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        drawerBackdropFadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        drawerSlideIn: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        drawerSlideOut: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "drawer-backdrop-in": "drawerBackdropFadeIn 0.3s ease-out",
        "drawer-backdrop-out": "drawerBackdropFadeOut 0.3s ease-out",
        "drawer-slide-in": "drawerSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "drawer-slide-out": "drawerSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [],
};
