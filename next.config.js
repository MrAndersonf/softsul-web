/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  ypescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
