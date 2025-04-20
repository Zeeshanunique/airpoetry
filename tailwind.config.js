/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
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
        primary: {
          DEFAULT: "#1e6f5c", // Forest green - representing ecology
          50: "#e6f2ef",
          100: "#cde6de",
          200: "#9fcfbe",
          300: "#71b89d",
          400: "#43a17d",
          500: "#1e6f5c", // Base color
          600: "#195a4a",
          700: "#144639",
          800: "#0f3127",
          900: "#0a1d16",
          950: "#050e0b",
        },
        secondary: {
          DEFAULT: "#8e6f47", // Parchment brown - representing literature/books
          50: "#f7f3ee",
          100: "#efe7dd",
          200: "#dfd0bb",
          300: "#ceb899",
          400: "#be9f77",
          500: "#8e6f47", // Base color
          600: "#725939",
          700: "#57442c",
          800: "#3b2e1e",
          900: "#1e170f",
          950: "#0f0b08",
        },
        accent: {
          DEFAULT: "#7f53ac", // Literary violet
          50: "#f3eef7",
          100: "#e7ddee",
          200: "#cfbbde",
          300: "#b799ce",
          400: "#9f77be",
          500: "#7f53ac",
          600: "#5c3d7d",
          700: "#432e5d",
          800: "#2e1f3e",
          900: "#17101f",
          950: "#0b080f",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'Cambria', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
      },
      backgroundImage: {
        'paper-texture': "url('/src/assets/paper-texture.png')",
        'leaf-pattern': "url('/src/assets/leaf-pattern.svg')",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#333',
            p: {
              lineHeight: '1.75',
            },
            h1: {
              fontFamily: 'Playfair Display, serif',
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
            },
            h3: {
              fontFamily: 'Playfair Display, serif',
            },
            blockquote: {
              borderLeftColor: '#1e6f5c',
              fontStyle: 'italic',
            },
          },
        },
      },
      boxShadow: {
        'poetry': '0 10px 15px -3px rgba(30, 111, 92, 0.1), 0 4px 6px -2px rgba(30, 111, 92, 0.05)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%) skewX(-12deg)',
          },
        },
        float: {
          '0%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.7,
          },
        },
        pageFlip: {
          '0%': {
            transform: 'rotateY(0deg)',
            opacity: 0,
          },
          '100%': {
            transform: 'rotateY(0deg)',
            opacity: 1,
          },
          '40%': {
            transform: 'rotateY(10deg)',
          },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: 'shimmer 2.5s infinite',
        float: 'float 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        pageFlip: 'pageFlip 1.2s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
