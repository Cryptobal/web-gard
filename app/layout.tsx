import React from 'react';
import type { Metadata } from 'next';
import { inter, poppins } from './fonts';
import './globals.css';
import { Providers } from './providers';
import { Header, Footer } from '@/components/layout';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import GoogleTagManager from './components/GoogleTagManager';
import CookieConsent from './components/cookie/CookieConsent';
import { GoogleAnalytics } from './components/cookie/ConsentAwareScript';
import { OrganizationSchema } from '@/lib/schema';

// Obtener GTM ID desde variables de entorno
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-4XJ2YKYYDH';

export const metadata: Metadata = {
  metadataBase: new URL('https://gard.cl'),
  title: {
    default: 'Gard Security Chile | Seguridad Empresarial de Clase Mundial',
    template: '%s | Gard Security',
  },
  description:
    'Gard Security ofrece soluciones de seguridad integral para empresas exigentes. Protegemos tu información y activos con tecnología de vanguardia.',
  keywords: [
    'seguridad empresarial',
    'ciberseguridad',
    'seguridad perimetral',
    'protección de datos',
    'auditoría de seguridad',
    'consultoría de seguridad',
  ],
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
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://gard.cl',
    title: 'Gard Security Chile | Seguridad Empresarial de Clase Mundial',
    description:
      'Soluciones de seguridad privada para empresas exigentes. Protegemos tu información y activos con tecnología de vanguardia.',
    siteName: 'Gard Security',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gard Security Chile | Seguridad Empresarial de Clase Mundial',
    description:
      'Soluciones de seguridad integral para empresas exigentes. Protegemos tu información y activos con tecnología de vanguardia.',
  },
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
        {/* JSON-LD Schema para SEO */}
        <OrganizationSchema />
        
        {/* Sistema de gestión de consentimiento de cookies */}
        <CookieConsent>
          {/* Google Tag Manager (solo se carga con consentimiento de analytics) */}
          {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
          
          {/* Google Analytics 4 (solo se carga con consentimiento de analytics) */}
          <GoogleAnalytics measurementId={GA_ID} />
          
          <Providers>
            <Header />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </Providers>
          
          {/* Estos scripts siempre se cargan porque están exentos del consentimiento */}
          <SpeedInsights />
          <Analytics />
        </CookieConsent>
      </body>
    </html>
  );
} 