import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1600px",
      "4xl": "1700px",
      "5xl": "1800px",
      "6xl": "1920px",
      "7xl": "2100px",
      // "8xl": "2200px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "primary-1": "#DCDCDC",
        "card-primary": "#F8F8F8",
        "primary-btn": "#FFB800",
        "btn-hover": "#E6A600",
        "text-dark": "#000000",
        "div-bg": "#FFF8E5",
        "text-light": "#FFFFFF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      fontFamily: {
        primary: "Montserrat",
      },

      fontSize: {
        "mainHeading-lg": [
          "3.125rem",
          {
            lineHeight: "1.618",
            // letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "mainHeading-md": [
          "1.9375rem",
          {
            lineHeight: "1.618",
            // letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "main-title-lg": [
          "1.5rem",
          {
            lineHeight: "1.618",
            // letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "main-title-md": [
          "1.25",
          {
            lineHeight: "1.75em",
            // letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "normal-paragraph-lg": [
          "1.125rem",
          {
            lineHeight: "1.618",
            // letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        "normal-paragraph-md": [
          "0.9375rem",
          {
            lineHeight: "1.618",
            // letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        "nav-heading-lg": [
          "1.125rem",
          {
            lineHeight: "1.7",
            // letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "nav-heading-md": [
          "0.875rem",
          {
            lineHeight: "40px",
            // letterSpacing: "-0.02em",
            fontWeight: "500",
          },
        ],
        "card-title-lg": [
          "1.5rem",
          {
            lineHeight: "1.4em",
            // letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "sub-title-lg": [
          "1.25rem",
          {
            lineHeight: "1.5em",
            // letterSpacing: "-0.02em",
            fontWeight: "500",
          },
        ],
        "card-title-md": [
          "1.375rem",
          {
            lineHeight: "1.4em",
            // letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "card-title-sm": [
          "1.125rem",
          {
            lineHeight: "1.4em",
            // letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "card-sub-title": [
          "0.875rem",
          {
            lineHeight: "1.4em",
            // letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "elementor-text-lg": [
          "1.1875rem",
          {
            lineHeight: "24px",
            // letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        "elementor-text-sm": [
          "1.125rem",
          {
            lineHeight: "24px",
            // letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        "accordion-heading-lg": [
          "1.75rem",
          {
            lineHeight: "24px",
            // letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "expert-title": [
          "1rem",
          {
            lineHeight: "24px",
            // letterSpacing: "-0.02em",
            fontWeight: "500",
          },
        ],
        "expert-description": [
          "1rem",
          {
            lineHeight: "24px",
            // letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        "btn-text": [
          "1.0625rem",
          {
            lineHeight: "24px",
            // letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
