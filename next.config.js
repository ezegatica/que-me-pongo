const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ezegatica.com']
  }
};
const isProduction = process.env.NODE_ENV === 'production';
// module.exports = withPWA(nextConfig);
module.exports = isProduction ? withPWA(nextConfig) : nextConfig; // Solo exporta PWA al estar en producción.
