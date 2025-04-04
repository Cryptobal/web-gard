'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CanonicalUrl() {
  const pathname = usePathname();
  const [canonicalCreated, setCanonicalCreated] = useState(false);

  useEffect(() => {
    // Esperamos a que el DOM esté completamente cargado
    const checkAndCreateCanonical = () => {
      // Verificar si ya existe una etiqueta canonical (definida por metadata.ts)
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      
      // Solo actuar si no hay canonical definida por metadata.ts
      if (!existingCanonical && !canonicalCreated) {
        console.log('[CanonicalUrl] No se encontró canonical, creando fallback para:', pathname);
        
        // Crear canonical como fallback basada en pathname
        const fallbackCanonical = `https://gard.cl${pathname || '/'}`;
        
        // Crear y añadir etiqueta
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', fallbackCanonical);
        document.head.appendChild(link);
        
        setCanonicalCreated(true);
        
        return link;
      }
      
      return null;
    };
    
    // Esperamos 1.5 segundos para dar tiempo a que Next.js complete la hidratación
    const timer = setTimeout(() => {
      const createdLink = checkAndCreateCanonical();
      
      return () => {
        // Limpiar al desmontar el componente
        if (createdLink && document.contains(createdLink)) {
          document.head.removeChild(createdLink);
          setCanonicalCreated(false);
        }
      };
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [pathname, canonicalCreated]);

  // Este componente no renderiza nada visible
  return null;
} 