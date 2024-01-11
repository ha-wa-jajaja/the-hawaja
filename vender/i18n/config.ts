export default {
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    langDir: "locales",
    lazy: true,
    locales: [
        {
            code: "tw",
            iso: "zh-TW",
            name: "繁",
            file: "tc.json",
        },

        {
            code: "en",
            iso: "en-US",
            name: "EN",
            file: "en.json",
        },
    ],
};
