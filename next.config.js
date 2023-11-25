/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
    },
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/whisper" },
    };
  },
};

module.exports = nextConfig;
