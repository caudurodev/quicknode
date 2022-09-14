/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["openseauserdata.com"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
