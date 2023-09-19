const { version } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: ['i.ezegatica.com']
  },
  publicRuntimeConfig: {
    version
  }
};

module.exports = nextConfig;
