import React from 'react';
import type { Metadata } from 'next';
import { inter, poppins } from './fonts';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import GoogleTagManager from './components/GoogleTagManager';
import CookieConsent from './components/cookie/CookieConsent';
import { GoogleAnalytics } from './components/cookie/ConsentAwareScript';
import dynamic from 'next/dynamic';

// Importación forzada de metadatos en desarrollo - ahora debe hacerse en componentes cliente
// Eliminamos la importación directa que estaba causando errores
// if (process.env.NODE_ENV === 'development') {
//   import('./force-metadata').then(module => {
//     console.log('Forzando importación de metadatos para desarrollo');
//     module.forceMetadataImport();
//   }).catch(err => {
//     console.error('Error al forzar importación de metadatos:', err);
//   });
// }

// Carga dinámica de componentes que deben ser de cliente
const SEODevPanelWrapper = dynamic(
  () => import('@/components/seo/SEODevPanelWrapper'),
  { ssr: false }
);

// Cargar el componente UTMTracker con carga dinámica
const UTMTracker = dynamic(
  () => import('./components/UTMTracker'),
  { ssr: false }
);

// Definimos un componente nulo para usarlo cuando no estamos en desarrollo
const NullComponent = () => null;

// Carga dinámica del componente que fuerza metadatos (solo desarrollo)
// Modificada la importación para usar el componente desde components/seo
const ForceMetadataClient = process.env.NODE_ENV === 'development'
  ? dynamic(() => import('@/components/seo/ForceMetadataClient'), { ssr: false })
  : NullComponent;

// Obtener GTM ID desde variables de entorno
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-4XJ2YKYYDH';

// Detección de entorno
const isDevelopment = process.env.NODE_ENV === 'development';

export const metadata: Metadata = {
  metadataBase: new URL('https://gard.cl'),
  title: {
    template: '%s',
    default: 'Gard Security Chile', // Este valor solo se usa si la página hija no define título
  },
  // Eliminamos description por defecto para no sobrescribir los valores específicos
  // Eliminamos keywords por defecto para no sobrescribir los valores específicos
  authors: [{ name: 'Gard Security' }],
  creator: 'Gard Security',
  icons: {
    icon: [
      { url: '/icons/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
    ],
    apple: { url: '/icons/icon-192x192.png', sizes: '192x192' },
    other: [
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  // Eliminamos openGraph por defecto para no sobrescribir los valores específicos
  // Eliminamos twitter por defecto para no sobrescribir los valores específicos
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable}`}>
        {/* Sistema de gestión de consentimiento de cookies */}
        <CookieConsent>
          {/* Google Tag Manager (solo se carga con consentimiento de analytics) */}
          {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
          
          {/* Google Analytics 4 (solo se carga con consentimiento de analytics) */}
          <GoogleAnalytics measurementId={GA_ID} />
          
          {/* Componente para capturar parámetros UTM */}
          <UTMTracker />
          
          <Providers>
            {/* Componente para forzar metadatos (solo en desarrollo) */}
            {isDevelopment && <ForceMetadataClient />}
            
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            
            {/* Panel de depuración SEO (solo en desarrollo) */}
            {isDevelopment && <SEODevPanelWrapper />}
          </Providers>
          
          {/* Estos scripts siempre se cargan porque están exentos del consentimiento */}
          <SpeedInsights />
          <Analytics />
        </CookieConsent>
      </body>
    </html>
  );
} 