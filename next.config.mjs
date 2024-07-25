/** @type {import('next').NextConfig} */
const nextConfig = {
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
