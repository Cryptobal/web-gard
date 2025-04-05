'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importación dinámica del SEODevPanel con mejor manejo de errores
const SEODevPanel = dynamic(() => 
  import('./SEODevPanel')
    .catch(err => {
      console.warn('No se pudo cargar SEODevPanel:', err);
      // Retornamos un módulo que exporta un componente vacío
      return { default: () => null };
    }),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function SEODevPanelWrapper() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Solo renderizamos el panel cuando estamos en el cliente
  if (!mounted) return null;
  
  return <SEODevPanel />;
} 