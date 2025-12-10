/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ecosystem/database'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@ecosystem/database')
    }
    return config
  },
  // Важно: копировать Prisma engine файлы
  experimental: {
    outputFileTracingRoot: require('path').join(__dirname, '../../'),
  },
}

module.exports = nextConfig
