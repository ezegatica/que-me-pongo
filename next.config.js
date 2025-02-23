const { randomBytes } = require('crypto');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'i.ezegatica.com' }]
  },
  serverRuntimeConfig: {
    runtimeSecret: randomBytes(32).toString('hex')
  }
};

const isProduction = process.env.NODE_ENV === 'production';

// module.exports = withPWA(nextConfig);
module.exports = isProduction ? withPWA(nextConfig) : nextConfig; // Solo exporta PWA al estar en producción.
