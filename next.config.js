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
  },
  trailingSlash: false,
  
  // Redirecciones para evitar errores 404 y contenido duplicado
  async redirects() {
    return [
      // Redirecciones de URLs antiguas a nuevas estructuras
      {
        source: '/automatizacion-y-domotica',
        destination: '/servicios/automatizacion-y-domotica',
        permanent: true,
      },
      {
        source: '/drones-de-seguridad-para-empresas-e-industrias',
        destination: '/servicios/drones-seguridad',
        permanent: true,
      },
      {
        source: '/guardias-de-seguridad-privada-para-empresas',
        destination: '/servicios/guardias-de-seguridad',
        permanent: true,
      },
      {
        source: '/noticias-de-seguridad-privada',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/servicios-de-seguridad-privada',
        destination: '/servicios',
        permanent: true,
      },
      {
        source: '/tecnologias',
        destination: '/tecnologia-seguridad',
        permanent: true,
      },
      {
        source: '/contacto-empresa-de-seguridad',
        destination: '/cotizar',
        permanent: true,
      },
      
      // Asegurar que las URLs con slash final también funcionen
      {
        source: '/automatizacion-y-domotica/:path*',
        destination: '/servicios/automatizacion-y-domotica/:path*',
        permanent: true,
      },
      {
        source: '/drones-de-seguridad-para-empresas-e-industrias/:path*',
        destination: '/servicios/drones-seguridad/:path*',
        permanent: true,
      },
      {
        source: '/guardias-de-seguridad-privada-para-empresas/:path*',
        destination: '/servicios/guardias-de-seguridad/:path*',
        permanent: true,
      },
      {
        source: '/noticias-de-seguridad-privada/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/servicios-de-seguridad-privada/:path*',
        destination: '/servicios/:path*',
        permanent: true,
      },
      {
        source: '/tecnologias/:path*',
        destination: '/tecnologia-seguridad/:path*',
        permanent: true,
      },
      {
        source: '/contacto-empresa-de-seguridad/:path*',
        destination: '/cotizar/:path*',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig; 