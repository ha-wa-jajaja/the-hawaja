/**
 * Customizing fontFamily
 */
const fonts = {
    en: ["'Proxima Nova'"],
    tc: ["Noto Sans TC"],
};
const fontFamily = {
    en: [
        ...fonts.en,
        // ...defaultTheme.fontFamily.sans,
    ],
    tc: [...fonts.tc, ...fonts.en],
};

export default fontFamily;
