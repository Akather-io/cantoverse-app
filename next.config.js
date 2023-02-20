/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ipfs.dweb.link",
      },
      {
        protocol: "https",
        hostname: "*.ipfs.nftstorage.link",
      },
    ],
  },
};

module.exports = nextConfig;
