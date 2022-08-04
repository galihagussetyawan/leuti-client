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
}

module.exports = nextConfig