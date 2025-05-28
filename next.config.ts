// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
    // images:{
    //     domains:['flagcdn.com']
    // }
};

export default nextConfig;
