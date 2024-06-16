/** @type {import('next').NextConfig} */
const nextConfig = {
    // eslint: {
    //     // Warning: This allows production builds to successfully complete even if
    //     // your project has ESLint errors.
    //     ignoreDuringBuilds: true,
    // },
    typescript: {
        // Set this to true to ignore TypeScript errors during the build
        ignoreBuildErrors: true,
    },
    distDir: 'dist',
};

export default nextConfig;
