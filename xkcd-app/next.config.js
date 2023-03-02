/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imgs.xkcd.com"],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    // domains: [
    //   {
    //     domain: "xkcd.com",
    //     defaultLocale: "en",
    //   },
    //   {
    //     domain: "xkcd.com",
    //     defaultLocale: "es",
    //   },
    // ],
  },
};

module.exports = nextConfig;
