'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import CanonicalUrl from '@/components/seo/CanonicalUrl';

// Cargar el SEODevPanel dinámicamente para que solo se renderice en desarrollo
const SEODevPanel = dynamic(() => import('@/components/seo/SEODevPanel'), {
  ssr: false,
});

export default function TecnologiaLandingClient() {
  // Determinar si estamos en desarrollo
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <>
      {/* Panel de desarrollo SEO (solo visible en desarrollo) */}
      {isDev && <SEODevPanel />}
      
      {/* URL canónica para evitar contenido duplicado */}
      <CanonicalUrl />
    </>
  );
} 