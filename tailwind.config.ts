import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090B10",
        surface: "#1a1e29",
        surfaceLight: "#222738",
        primary: "#dc2626",
        primaryLight: "#ef4444",
        primaryDark: "#991b1b",
        accent: "#f59e0b",
        textPrimary: "#ffffff",
        textSecondary: "#8b949e",
        glassBg: "rgba(26, 30, 41, 0.6)",
        glassBorder: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ['Inter', 'Battambang', 'system-ui', 'sans-serif'],
        khmer: ['Battambang', 'sans-serif'],
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out both',
        'fadeInDown': 'fadeInDown 0.5s ease-out both',
        'slideInLeft': 'slideInLeft 0.6s ease-out both',
        'slideInRight': 'slideInRight 0.6s ease-out both',
        'scaleIn': 'scaleIn 0.5s ease-out both',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'glow-pulse-gold': 'glowPulseGold 3s ease-in-out infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'gradient': 'gradientShift 6s ease infinite',
        'border-glow': 'borderGlow 2.5s ease-in-out infinite',
        'heartBeat': 'heartBeat 0.6s ease-in-out',
        'dot-pulse': 'dotPulse 1.5s ease-in-out infinite',
        'spin-slow': 'spinSlow 8s linear infinite',
        'tiltIn': 'tiltIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'textGlow': 'textGlow 3s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'kenBurns': 'kenBurns 8s ease-out forwards',
        'titleReveal': 'titleReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmerSweep': 'shimmerSweep 4s ease-in-out infinite',
        'iconBounce': 'iconBounce 2s ease-in-out infinite',
        'auraPulse': 'auraPulse 2.5s ease-in-out infinite',
        'wiggle': 'wiggle 0.8s ease-in-out',
        'colorShift': 'colorShift 8s ease infinite',
      },
      boxShadow: {
        'glow-red': '0 0 15px rgba(220, 38, 38, 0.3), 0 0 30px rgba(220, 38, 38, 0.1)',
        'glow-red-lg': '0 0 20px rgba(220, 38, 38, 0.4), 0 0 60px rgba(220, 38, 38, 0.15)',
        'glow-gold': '0 0 15px rgba(245, 158, 11, 0.3), 0 0 30px rgba(245, 158, 11, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(220, 38, 38, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
