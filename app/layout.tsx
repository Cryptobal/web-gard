import React from 'react';
import type { Metadata } from 'next';
import { inter, poppins } from './fonts';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://gard.cl',
    title: 'Gard Security | Seguridad Empresarial de Clase Mundial',
    description:
      'Soluciones de seguridad integral para empresas exigentes. Protegemos tu información y activos con tecnología de vanguardia.',
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
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
} 