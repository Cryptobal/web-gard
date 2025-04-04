'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function CanonicalUrl() {
  const pathname = usePathname();
  const canonical = `https://gard.cl${pathname || '/'}`;

  useEffect(() => {
    // Buscar si ya existe una etiqueta canonical
    let link = document.querySelector('link[rel="canonical"]');
    
    // Si no existe, crearla
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    
    // Establecer o actualizar el href
    link.setAttribute('href', canonical);
    
    // Cleanup al desmontar el componente
    return () => {
      // Opcional: Remover la etiqueta al desmontar si se desea
      // document.head.removeChild(link);
    };
  }, [canonical]);

  // Este componente no renderiza nada visible
  return null;
} 