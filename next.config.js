/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/**',
      },
    ],
    // Para desarrollo, no es necesario desactivar la optimización de imágenes
    // unoptimized: true,
  },
  // Para desarrollo, usamos el modo servidor
  // output: 'export',
  // trailingSlash: true,
};

module.exports = nextConfig; 