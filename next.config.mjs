/** @type {import('next').NextConfig} */
const nextConfig = {
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