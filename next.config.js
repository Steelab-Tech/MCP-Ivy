/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  assetPrefix: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  webpack: (config) => {
    // Support for MCP SDK ESM modules
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    };
    return config;
  },
};

module.exports = nextConfig;
