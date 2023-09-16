/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
      images: {
        domains: ['i.ezegatica.com']
      }
}

module.exports = nextConfig
