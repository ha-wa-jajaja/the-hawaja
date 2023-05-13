// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    app: {
        head: {
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1",
                },
            ],
            link: [
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: "/favicon.ico",
                },
                {
                    rel: "apple-touch-icon-precomposed",
                    sizes: "57x57",
                    href: "/favicon/apple-icon-57x57.png",
                },
                {
                    rel: "apple-touch-icon-precomposed",
                    sizes: "72x72",
                    href: "/favicon/apple-icon-72x72.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "114x114",
                    href: "/favicon/apple-icon-114x114.png",
                },
                {
                    rel: "apple-touch-icon-precomposed",
                    sizes: "144x144",
                    href: "/favicon/apple-icon-144x144.png",
                },
                {
                    rel: "apple-touch-icon-precomposed",
                    sizes: "180x180",
                    href: "/favicon/apple-icon-180x180.png",
                },
            ],
        },
        pageTransition: {
            name: "page",
            mode: "out-in",
        },
    },
    modules: [
        // doc: https://vueuse.org/guide/
        "@vueuse/nuxt",
        // doc: https://nuxt.com/modules/tailwindcss
        "@nuxtjs/tailwindcss",
        // doc: https://v8.i18n.nuxtjs.org/
        "@nuxtjs/i18n",
        // doc: https://pinia.vuejs.org/ssr/nuxt.html
        "@pinia/nuxt",
        // doc: https://v1.image.nuxtjs.org/get-started/
        "@nuxt/image-edge",
        // doc: https://www.npmjs.com/package/nuxt-swiper
        "nuxt-swiper",
        // doc: https://motion.vueuse.org/nuxt.html
        "@vueuse/motion/nuxt",
        // doc: https://www.npmjs.com/package/@nuxtjs/robots
        "@nuxtjs/robots",
        // doc: https://www.npmjs.com/package/nuxt-simple-sitemap
        "nuxt-simple-sitemap",
    ],
    // doc: https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig
    runtimeConfig: {
        apiUsername: process.env.VUE_APP_API_USERNAME || "",
        apiPassword: process.env.VUE_APP_API_PASSWORD || "",
        siteUrl:
            process.env.VUE_APP_BASE_URL ||
            "http://localhost:3000",
        public: {
            apiKey: process.env.VUE_APP_API_KEY || "",
            baseURL:
                process.env.VUE_APP_BASE_URL ||
                "http://localhost:3000",
            apiBase:
                process.env.VUE_APP_BASE_URL + "/api" || "",
            appBuildVersion: process.env.APP_BUILD_VERSION,
        },
    },
    routeRules: {
        "/api/**": {
            proxy: process.env.VUE_APP_API_BASE + "/**",
        },
    },
    // config: @nuxtjs/i18n
    // See https://v8.i18n.nuxtjs.org/getting-started/setup
    i18n: {
        defaultLocale: "zh-hk",
        strategy: "prefix_and_default",
        detectBrowserLanguage: false,
        langDir: "lang/",
        lazy: true,
        locales: [
            {
                code: "zh-hk",
                iso: "zh-HK",
                name: "繁",
                file: "tc.js",
            },
            {
                code: "en",
                iso: "en-US",
                name: "EN",
                file: "en.js",
            },
        ],
    },

    // doc: https://nuxt.com/docs/api/configuration/nuxt-config#postcss
    postcss: {
        plugins: {
            // doc: https://www.npmjs.com/package/postcss-mixins
            "postcss-mixins": {},
            // doc: https://www.npmjs.com/package/postcss-simple-vars
            "postcss-simple-vars": { silent: true },
            // doc: https://www.npmjs.com/package/postcss-each
            "postcss-each": {},
            "tailwindcss/nesting": {},
            tailwindcss: {},
            // doc: https://www.npmjs.com/package/autoprefixer
            autoprefixer: {},
            // doc: https://www.npmjs.com/package/postcss-easings
            "postcss-easings": {},
        },
    },
    build: {
        transpile: ["gsap"],
    },
});
