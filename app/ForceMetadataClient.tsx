'use client';

import { useEffect } from 'react';
import { forceMetadataImport } from './force-metadata';

export default function ForceMetadataClient() {
  useEffect(() => {
    // Ejecutar la función forceMetadataImport en el cliente
    try {
      console.log('Forzando importación de metadatos para desarrollo (componente cliente)');
      forceMetadataImport();
    } catch (err) {
      console.error('Error al forzar importación de metadatos:', err);
    }
  }, []);

  // Este componente no renderiza nada visible
  return null;
} 