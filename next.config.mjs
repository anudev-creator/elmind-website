/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**', // allow all paths
      },
    ],
  },
  // experimental: {
  //   allowedDevOrigins: ['http://192.168.1.36:3000'], // your device + port
  // },
};

export default nextConfig;
