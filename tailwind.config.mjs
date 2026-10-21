/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                paper: "#F7F6F4",
                ink: {
                    DEFAULT: "#1A1A1A",
                    muted: "#666666",
                },
                line: "#E2DFD7",
            },
            fontFamily: {
                serif: ["'Plus Jakarta Sans'", "sans-serif"],
                sans: ["'Plus Jakarta Sans'", "sans-serif"],
            },
        },
    },
    plugins: [],
};
