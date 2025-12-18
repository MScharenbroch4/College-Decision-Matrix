import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#0f4229",
                    light: "#1a5a3a",
                    lighter: "#22c55e",
                    dark: "#0a2d1a",
                },
                accent: {
                    green: "#22c55e",
                    lightgreen: "#4ade80",
                },
            },
        },
    },
    plugins: [],
};
export default config;
