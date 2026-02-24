/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Transpile Three.js packages for better compatibility
  transpilePackages: ['three'],
  
  // Image configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Webpack: add shader rules only if you install raw-loader / glslify-loader
  // webpack: (config) => { ... },
};

module.exports = nextConfig;
