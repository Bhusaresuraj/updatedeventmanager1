/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add any external domains if needed
    unoptimized: true, // Add this for static exports
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  output: 'export', // Add this for static exports
  assetPrefix: '', // Add this to handle asset paths correctly
  basePath: '',
  trailingSlash: true, // Add this to ensure proper path resolution
}

module.exports = nextConfig 