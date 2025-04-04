'use client';

/**
 * Este archivo es una solución para forzar la correcta aplicación de metadatos en entorno de desarrollo.
 * 
 * El problema: Next.js en desarrollo a veces tiene problemas para aplicar correctamente los metadatos
 * definidos en los archivos metadata.ts, especialmente cuando hay jerarquías complejas de rutas.
 * 
 * Esta implementación ahora no solo importa los metadatos, sino que también intenta aplicarlos
 * directamente en el DOM para solucionar los problemas de detección.
 * 
 * No se usa en producción, solo es un hack para desarrollo.
 */

import { Metadata } from 'next';

// Importación de todos los archivos metadata.ts conocidos
import { metadata as rootMetadata } from './metadata';

// Datos de metadatos del cotizador definidos manualmente
// Esto es un duplicado del contenido en (landing-cotizador-inteligente)/cotizador-inteligente/metadata.ts
// pero nos permite evitar problemas de importación con grupos de rutas
const cotizadorInteligente: Metadata = {
  title: 'Cotizador Inteligente de Guardias de Seguridad | Gard Security',
  description: 'Calcula el costo de tu servicio de guardias de seguridad con nuestro cotizador inteligente. Configura turnos, horarios y recibe una cotización personalizada.',
  keywords: ['cotizador guardias', 'calculadora seguridad', 'presupuesto guardias', 'cotización online seguridad'],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://gard.cl/cotizador-inteligente'
  },
  openGraph: {
    title: 'Cotizador Inteligente de Guardias de Seguridad | Gard Security',
    description: 'Calcula el costo de tu servicio de guardias de seguridad con nuestro cotizador inteligente. Configura turnos, horarios y recibe una cotización personalizada.',
    url: 'https://gard.cl/cotizador-inteligente',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  }
};

// Hack para aplicar metadata según la ruta
export function forceMetadataImport() {
  const allMetadata: Record<string, Metadata> = {
    '/': rootMetadata,
    '/cotizador-inteligente': cotizadorInteligente
  };
  
  // En el cliente, intentamos aplicar los metadatos directamente
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    setTimeout(() => {
      const path = window.location.pathname;
      const metadata = allMetadata[path];
      
      if (metadata) {
        applyMetadata(path, metadata);
      }
    }, 1000); // Dar tiempo para que Next.js cargue
  }
  
  return allMetadata;
}

// Función para aplicar los metadatos directamente al DOM
function applyMetadata(path: string, metadata: Metadata) {
  console.log(`[force-metadata] Aplicando metadatos para ruta ${path}`);
  
  // Título
  if (metadata.title && typeof metadata.title === 'string') {
    document.title = metadata.title;
  }
  
  // Description
  if (metadata.description) {
    const desc = metadata.description.toString();
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', desc);
  }
  
  // Keywords
  if (metadata.keywords) {
    const keywords = Array.isArray(metadata.keywords) 
      ? metadata.keywords.join(', ') 
      : metadata.keywords.toString();
      
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', keywords);
  }
  
  // Función auxiliar para crear o actualizar metatags
  const setMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
  
  // OG Tags
  if (metadata.openGraph) {
    const og = metadata.openGraph as any;
    
    // OG Title
    if (og.title) {
      setMetaTag('og:title', og.title);
    }
    
    // OG Description
    if (og.description) {
      setMetaTag('og:description', og.description);
    }
    
    // OG URL
    if (og.url) {
      setMetaTag('og:url', og.url);
    }
    
    // OG Site Name
    if (og.siteName) {
      setMetaTag('og:site_name', og.siteName);
    }
    
    // OG Locale
    if (og.locale) {
      setMetaTag('og:locale', og.locale);
    }
    
    // OG Type
    if (og.type) {
      setMetaTag('og:type', og.type);
    }
  }
  
  // Canonical URL
  if (metadata.alternates && metadata.alternates.canonical) {
    const canonical = metadata.alternates.canonical.toString();
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }
} 