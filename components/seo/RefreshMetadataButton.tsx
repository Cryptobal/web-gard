'use client';

import { useState } from 'react';
import { forceMetadataImport } from '@/app/force-metadata';

/**
 * Botón flotante para refrescar manualmente los metadatos de la página actual
 * Solo visible en modo desarrollo
 */
export default function RefreshMetadataButton() {
  const [refreshing, setRefreshing] = useState(false);
  
  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') return null;
  
  const refreshMetadata = () => {
    setRefreshing(true);
    
    try {
      // Forzar la aplicación de metadatos
      forceMetadataImport();
      
      // Para el caso específico del cotizador-inteligente
      const path = window.location.pathname;
      if (path === '/cotizador-inteligente') {
        // Actualizar keywords manualmente
        let keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta) {
          keywordsMeta.setAttribute('content', 'cotizador guardias, calculadora seguridad, presupuesto guardias, cotización online seguridad, cotizcion prueba');
        }
      }
      
      // Notificar al usuario
      console.log('✅ Metadatos actualizados manualmente');
      
      // Resetear estado después de un tiempo
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Error al refrescar metadatos:', error);
      setRefreshing(false);
    }
  };
  
  return (
    <button
      onClick={refreshMetadata}
      className="fixed bottom-16 right-4 z-[9998] bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg"
      title="Refrescar metadatos"
      disabled={refreshing}
    >
      {refreshing ? '⏳' : '🔄'} Refrescar metadatos
    </button>
  );
} 