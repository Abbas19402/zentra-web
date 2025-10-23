/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      }
    ],
     domains: ['res.cloudinary.com'], // allow Cloudinary
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