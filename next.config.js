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
  
  // Headers de seguridad
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // CSP específica para desarrollo (con unsafe-eval para hot reload)
    const developmentCsp = "default-src 'self'; img-src 'self' https://imagedelivery.net data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com; font-src 'self'; frame-src 'self';";
    
    // CSP para producción (sin unsafe-eval)
    const productionCsp = "default-src 'self'; img-src 'self' https://imagedelivery.net data:; script-src 'self' 'unsafe-inline' https://vercel.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://vitals.vercel-insights.com https://www.google-analytics.com; font-src 'self'; frame-src 'self';";
    
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: isDevelopment ? developmentCsp : productionCsp,
          },
        ],
      },
    ];
  },
  
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