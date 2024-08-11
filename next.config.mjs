/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['dummyimage.com'],
    },
    redirects() {
        return [
            {
                source: '/configuration',
                destination: '/',
                permanent: false,
            },
        ];
    }
};

export default nextConfig;
