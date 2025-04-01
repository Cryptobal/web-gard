import React from 'react';
import type { Metadata } from 'next';
import { inter, poppins } from './fonts';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://gard.cl'),
  title: {
    default: 'Gard Security | Seguridad Empresarial de Clase Mundial',
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
    title: 'Gard Security | Seguridad Empresarial de Clase Mundial',
    description:
      'Soluciones de seguridad privada para empresas exigentes. Protegemos tu información y activos con tecnología de vanguardia.',
    siteName: 'Gard Security',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gard Security | Seguridad Empresarial de Clase Mundial',
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
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
} 