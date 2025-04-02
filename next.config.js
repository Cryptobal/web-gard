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

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "gard-tm",
    project: "gard-web",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
