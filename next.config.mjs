/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/thumbnails/**', // Allows any image inside the thumbnails folder
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      }
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