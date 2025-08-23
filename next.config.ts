/** @type {import('next').NextConfig} */
const nextConfig = {
  // OpenNext handles the build process
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
