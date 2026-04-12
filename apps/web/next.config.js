const path = require('path')

// Load monorepo root `.env*` into `process.env` so Supabase vars can live in one file at the repo root
// (Next.js otherwise only auto-loads from `apps/web/`).
try {
  const { loadEnvConfig } = require('@next/env')
  const repoRoot = path.join(__dirname, '..', '..')
  loadEnvConfig(repoRoot, process.env.NODE_ENV !== 'production')
} catch {
  /* ignore */
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Transpile Three.js packages for better compatibility
  transpilePackages: ['three', '@asthesis/shared'],
  
  // Image configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  
  // Webpack: add shader rules only if you install raw-loader / glslify-loader
  // webpack: (config) => { ... },
};

module.exports = nextConfig;
