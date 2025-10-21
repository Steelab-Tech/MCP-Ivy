/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  assetPrefix: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
};

module.exports = nextConfig;
