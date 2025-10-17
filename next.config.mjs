/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.55', // optional; remove if not used
        pathname: '/**', // allow all paths from this host
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/home/:path*',
      },
    ];
  },
};

export default nextConfig;
