'use client';

import { useEffect } from 'react';
import { forceMetadataImport } from '@/app/force-metadata';

export default function ForceMetadataClient() {
  useEffect(() => {
    // Ejecutar la función forceMetadataImport en el cliente
    try {
      console.log('Forzando importación de metadatos para desarrollo (componente cliente)');
      forceMetadataImport();
      
      // Aplicación adicional de metadatos que pueden faltar
      setTimeout(() => {
        const path = window.location.pathname;
        console.log('[ForceMetadataClient] Aplicando metadatos adicionales para', path);
        
        // Función para crear o actualizar una etiqueta meta
        const setMetaTag = (property: string, content: string) => {
          let meta = document.querySelector(`meta[property="${property}"]`);
          if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
          }
          meta.setAttribute('content', content);
        };
        
        // Configuración específica para páginas
        if (path === '/cotizador-inteligente') {
          // Forzar actualización de keywords para cotizador-inteligente
          // Usar tiempo actual para evitar caching
          const timestamp = new Date().getTime();
          
          // Actualizar directamente las keywords completas incluyendo la nueva
          let keywordsMeta = document.querySelector('meta[name="keywords"]');
          if (!keywordsMeta) {
            keywordsMeta = document.createElement('meta');
            keywordsMeta.setAttribute('name', 'keywords');
            document.head.appendChild(keywordsMeta);
          }
          
          // Definir keywords con el valor exacto actualizado
          keywordsMeta.setAttribute('content', 'cotizador guardias, calculadora seguridad, presupuesto guardias, cotización online seguridad, cotizcion prueba');
          
          console.log(`[${timestamp}] Keywords forzadas para cotizador-inteligente:`, keywordsMeta.getAttribute('content'));
          
          // También actualizamos otros metadatos para estar seguros
          setMetaTag('og:url', 'https://gard.cl/cotizador-inteligente');
          setMetaTag('og:site_name', 'Gard Security');
          setMetaTag('og:locale', 'es_CL');
          setMetaTag('og:type', 'website');
        } else {
          // Metadatos genéricos para otras páginas
          setMetaTag('og:url', `https://gard.cl${path}`);
          setMetaTag('og:site_name', 'Gard Security');
          setMetaTag('og:locale', 'es_CL');
          setMetaTag('og:type', 'website');
        }
      }, 1500); // Dar tiempo para que otros scripts se ejecuten primero
      
      // Añadimos una segunda actualización después de un tiempo más largo
      setTimeout(() => {
        if (window.location.pathname === '/cotizador-inteligente') {
          console.log('[ForceMetadataClient] Segunda actualización de keywords');
          
          let keywordsMeta = document.querySelector('meta[name="keywords"]');
          if (keywordsMeta) {
            keywordsMeta.setAttribute('content', 'cotizador guardias, calculadora seguridad, presupuesto guardias, cotización online seguridad, cotizcion prueba');
          }
        }
      }, 3000);
    } catch (err) {
      console.error('Error al forzar importación de metadatos:', err);
    }
  }, []);

  // Este componente no renderiza nada visible
  return null;
} 