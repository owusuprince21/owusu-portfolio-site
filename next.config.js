/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'localhost' },
      { protocol: 'https', hostname: '127.0.0.1' },
      { protocol: 'https', hostname: 'i.guim.co.uk' },
      { protocol: 'https', hostname: 'media.guim.co.uk' },
    ],
  },
  serverExternalPackages: ['@keystatic/core', '@keystatic/next'],
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'react-icons',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],
  },
}

module.exports = nextConfig
