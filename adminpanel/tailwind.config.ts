import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");
const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", flowbite.content()],
  prefix: "",
  theme: {
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
        text: {
          50: "#070912",
          100: "#0e1325",
          200: "#1c254a",
          300: "#2a386f",
          400: "#384a94",
          500: "#465db9",
          600: "#6b7dc7",
          700: "#909ed5",
          800: "#b5bee3",
          900: "#dadff1",
          950: "#edeff8",
        },

        primary: {
          DEFAULT: "#febb0a",
          foreground: "hsl(var(--primary-foreground))",

          // "50": "#fff4ed",
          // "100": "#ffe6d5",
          // "200": "#feccaa",
          // "300": "#fdac74",
          // "400": "#fb8a3c",
          // "500": "#f97316",
          // "600": "#ea670c",
          // "700": "#c2570c",
          // "800": "#9a4a12",
          // "900": "#7c3d12",
          // "950": "##FDB908",

          '50': '#fffdea',
          '100': '#fffac5',
          '200': '#fff586',
          '300': '#ffe946',
          '400': '#ffd91c',
          '500': '#febb0a',
          '600': '#e18e00',
          '700': '#bb6402',
          '800': '#974d09',
          '900': '#7c3f0b',
          '950': '#482000',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",

          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#000000",
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
          50: "#120f07",
          100: "#251d0e",
          200: "#4a3b1c",
          300: "#6f582a",
          400: "#947538",
          500: "#b99346",
          600: "#c7a86b",
          700: "#d5be90",
          800: "#e3d4b5",
          900: "#f1e9da",
          950: "#f8f4ed",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
    },
  },
  plugins: [require("tailwindcss-animate"),flowbite.plugin(),],
} satisfies Config;

export default config;
