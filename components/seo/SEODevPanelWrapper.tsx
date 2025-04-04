'use client';

import dynamic from 'next/dynamic';

// Importación dinámica del SEODevPanel para evitar problemas de SSR
const SEODevPanel = dynamic(() => import('./SEODevPanel'), {
  ssr: false,
});

export default function SEODevPanelWrapper() {
  return <SEODevPanel />;
} 