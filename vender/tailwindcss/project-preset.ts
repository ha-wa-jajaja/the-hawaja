const defaultTheme = require("tailwindcss/defaultTheme");
const {
    screensTailwind: screens,
} = require("./screens.ts");
const colors = require("./colors.json");
const fontSizeResponsive = require("./fontSize_responsive.json");
const fontSizeDesktop = require("./fontSize_desktop.json");
const fontSize = {
    ...fontSizeDesktop,
    ...fontSizeResponsive,
};
const fontFamily = require("./fontFamily.ts");

module.exports = {
    theme: {
        extend: {
            fontFamily,
            colors,
            fontSize,
            animation: {
                "fade-in":
                    "fade-in .8s linear 0s 1 forwards",
                "fade-in-delay-0":
                    "fade-in .8s linear 0s 1 forwards",
                "fade-up": "fade-up .4s ease 0s 1 forwards",
                "fade-up-delay-0":
                    "fade-up .3s easeOutBack 0s 1 forwards",
                "fade-down":
                    "fade-down .4s easeOutBack .2s 1 forwards",
                "fade-down-delay-0":
                    "fade-down .3s easeOutBack 0s 1 forwards",
                "zoom-out":
                    "zoom-out .3s linear 0s 1 forwards",
                "fade-scale":
                    "fade-scale .6s ease-in-out .2s 1 forwards",
                "clip-reveal":
                    "clip-reveal .6s ease-in-out .2s 1 forwards",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                "fade-up": {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(30px)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                    },
                },
                "fade-down": {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(-30px)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                    },
                },
                "zoom-out": {
                    "0%": {
                        opacity: 0,
                        transform: "scale(1.2)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "scale(1)",
                    },
                },
                "fade-scale": {
                    "0%": {
                        opacity: 0,
                        transform: "scale(0.8)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "scale(1)",
                    },
                },
                "clip-reveal": {
                    "0%": {
                        "-webkit-clip-path":
                            "inset(0 100% 0 0)",
                        "clip-path": "inset(0 100% 0 0)",
                        opacity: 0,
                    },
                    "100%": {
                        "-webkit-clip-path": "inset(0)",
                        "clip-path": "inset(0)",
                        opacity: 1,
                    },
                },
            },
        },

        screens,
    },
};
