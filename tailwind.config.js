/** @type {import('tailwindcss').Config} */

const { easings } = require("postcss-easings");

module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./composables/**/*.{js,ts}",
    ],

    theme: {
        extend: {
            transitionTimingFunction: { ...easings },
        },
        container: {
            center: true,
        },
    },
    corePlugins: {
        aspectRatio: false,
        container: false,
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require("tailwind-scrollbar-hide"),
        require("@tailwindcss/line-clamp"),
        require("prettier-plugin-tailwindcss"),
    ],
};
