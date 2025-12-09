import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: '*.producthunt.com',
      },
    ],
  },
};

export default nextConfig;
