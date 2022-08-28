/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
  env: {
    API_HOST: process.env.API_HOST,
    API_BASE_URL: process.env.BASE_URL,
  },

  images: {
    domains: [process.env.API_HOST]
  },

  i18n: {
    locales: ['id'],
    defaultLocale: 'id',
    localeDetection: true,
  },
}

module.exports = nextConfig