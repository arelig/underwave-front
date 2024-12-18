/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.mzstatic.com',
          },
          {protocol: 'https',
           hostname: '**.unsplash.com'}
        ],
      },
}

module.exports = nextConfig
