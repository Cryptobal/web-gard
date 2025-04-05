'use client';

import { useEffect } from 'react';

/**
 * Componente para capturar parámetros UTM de la URL y guardarlos en sessionStorage
 * Se ejecuta una sola vez por sesión del usuario
 */
export default function UTMTracker() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

      utmParams.forEach(param => {
        const value = urlParams.get(param);
        if (value && !sessionStorage.getItem(param)) {
          sessionStorage.setItem(param, value);
          console.log(`UTM capturado: ${param}=${value}`);
        }
      });
    }
  }, []);

  // Este componente no renderiza nada
  return null;
} 