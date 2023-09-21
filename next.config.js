const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: ['i.ezegatica.com']
  },
};

module.exports = withPWA(nextConfig);
