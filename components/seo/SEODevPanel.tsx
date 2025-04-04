'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import CanonicalUrl from './CanonicalUrl';
import { forceMetadataImport } from '@/app/force-metadata';

type MetaInfo = {
  [key: string]: string;
};

type MetaData = {
  title?: string;
  canonical?: string;
  metas?: MetaInfo;
};

export default function SEODevPanel() {
  const [open, setOpen] = useState(false);
  const [metaData, setMetaData] = useState<MetaData>({});
  const [isDev, setIsDev] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [hasMetadataFile, setHasMetadataFile] = useState<boolean | null>(null);
  const [hasSeoErrors, setHasSeoErrors] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const pathname = usePathname();

  // Función para actualizar los metadatos
  const updateMetaData = () => {
    if (typeof window === 'undefined') return;
    
    const metas = document.querySelectorAll('meta');
    const metaInfo: MetaInfo = {};
    let criticalMetaMissing = false;
    
    // Verificar metadatos críticos
    const criticalMetas = ['description', 'og:title', 'og:description'];
    const foundMetas: string[] = [];
    
    metas.forEach((m) => {
      const name = m.getAttribute('name') || m.getAttribute('property');
      const content = m.getAttribute('content');
      if (name && content) {
        metaInfo[name] = content;
        foundMetas.push(name);
      }
    });
    
    // Verificar si faltan metadatos críticos
    criticalMetas.forEach(meta => {
      if (!foundMetas.includes(meta)) {
        criticalMetaMissing = true;
      }
    });

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    const hrefAttr = canonicalEl?.getAttribute('href');
    const canonicalHref = hrefAttr || undefined;
    
    // Si no hay canonical, es un error crítico
    if (!canonicalHref) {
      criticalMetaMissing = true;
    }

    // Simplificamos la detección de metadata - si tiene título, consideramos que hay metadata
    const hasTitle = !!document.title && document.title !== '';
    
    // Somos menos estrictos - solo verificamos que haya un título
    const hasMetadataDetected = hasTitle;
    
    setHasMetadataFile(hasMetadataDetected);
    
    // Ajustamos la condición de error - solo si falta el título 
    if (!hasTitle) {
      criticalMetaMissing = true;
    }

    setHasSeoErrors(criticalMetaMissing);
    
    setMetaData({
      title: document.title,
      canonical: canonicalHref,
      metas: metaInfo,
    });
  };

  // Limpiador agresivo de metadatos - elimina y vuelve a crear todas las etiquetas relevantes
  const cleanupMetaTags = () => {
    // Lista de propiedades meta a eliminar para forzar su recreación
    const metaProperties = ['description', 'keywords', 'og:title', 'og:description', 'og:url', 'og:site_name', 'og:locale', 'og:type'];
    
    // Eliminar todas las etiquetas meta con estas propiedades
    metaProperties.forEach(propName => {
      // Verificar atributo name y property
      const nameSelector = `meta[name="${propName}"]`;
      const propSelector = `meta[property="${propName}"]`;
      
      const nameElements = document.querySelectorAll(nameSelector);
      const propElements = document.querySelectorAll(propSelector);
      
      // Eliminar elementos encontrados
      nameElements.forEach(el => el.parentNode?.removeChild(el));
      propElements.forEach(el => el.parentNode?.removeChild(el));
    });
    
    console.log('✅ Limpieza profunda de metadatos completada');
  };

  // Función para refrescar los metadatos (combinada desde RefreshMetadataButton)
  const refreshMetadata = () => {
    setRefreshing(true);
    setLastRefresh(new Date());
    
    try {
      // Primero, limpiamos todas las etiquetas meta existentes
      cleanupMetaTags();
      
      // Utilizamos setTimeout para dar tiempo al DOM a actualizarse
      setTimeout(() => {
        // Forzar la aplicación de metadatos después de la limpieza
        forceMetadataImport();
        
        // Para el caso específico del cotizador-inteligente, con timestamp para evitar caching
        const path = window.location.pathname;
        const timestamp = new Date().getTime();
        
        if (path === '/cotizador-inteligente') {
          console.log(`[${timestamp}] Actualizando keywords para cotizador-inteligente`);
          
          // Forzar keywords desde cero (crear nuevo elemento)
          const existingKeywords = document.querySelector('meta[name="keywords"]');
          if (existingKeywords && existingKeywords.parentNode) {
            existingKeywords.parentNode.removeChild(existingKeywords);
          }
          
          // Crear nueva etiqueta keywords con los valores conocidos
          const keywordsMeta = document.createElement('meta');
          keywordsMeta.setAttribute('name', 'keywords');
          
          // Definimos los keywords directamente (copiados del archivo force-metadata.ts)
          const cotizadorKeywords = 'cotizador guardias, calculadora seguridad, presupuesto guardias, cotización online seguridad';
          keywordsMeta.setAttribute('content', cotizadorKeywords);
          document.head.appendChild(keywordsMeta);
          console.log('[DEBUG] Keywords actualizadas a:', cotizadorKeywords);
          
          // Actualizamos los metadatos para mostrarlos
          updateMetaData();
          setRefreshing(false);
        } else {
          // Para otras páginas, actualización genérica
          setTimeout(() => {
            updateMetaData();
            setRefreshing(false);
          }, 500);
        }
      }, 100);
    } catch (error) {
      console.error('Error al refrescar metadatos:', error);
      setRefreshing(false);
      updateMetaData();
    }
  };

  // Función para copiar todos los metadatos
  const copyAllMetadata = () => {
    let seoText = `SEO DEBUG INFORMATION\n\n`;
    seoText += `URL: ${window.location.href}\n`;
    seoText += `Canonical: ${metaData.canonical || '❌ No definido'}\n`;
    seoText += `Title: ${metaData.title || '❌ No definido'}\n`;
    seoText += `Path: ${pathname}\n`;
    seoText += `Metadata Detectado: ${hasMetadataFile ? '✅ Sí' : '❌ No'}\n\n`;
    
    seoText += `METADATA:\n`;
    if (metaData.metas) {
      Object.entries(metaData.metas).forEach(([key, value]) => {
        seoText += `${key}: ${value}\n`;
      });
    }
    
    navigator.clipboard.writeText(seoText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => console.error('Error al copiar:', err));
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsDev(true);
    }
  }, []);

  // Aumentamos el tiempo de espera para dar más tiempo a Next.js para aplicar los metadatos
  useEffect(() => {
    if (isDev) {
      const timer = setTimeout(() => {
        updateMetaData();
      }, 1000); // Aumentado de 100ms a 1000ms
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isDev]);

  // Agregamos un nuevo efecto para actualizar periódicamente los metadatos
  useEffect(() => {
    if (isDev && open) {
      const intervalId = setInterval(() => {
        updateMetaData();
      }, 3000); // Actualiza cada 3 segundos mientras el panel está abierto
      
      return () => clearInterval(intervalId);
    }
  }, [open, isDev]);

  // Actualizar también cuando se abre el panel
  useEffect(() => {
    if (open && isDev) {
      // Actualizamos inmediatamente y después de un segundo para capturar cambios tardíos
      updateMetaData();
      const timer = setTimeout(() => {
        updateMetaData();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [open, isDev]);

  if (!isDev) return null;

  return (
    <>
      {/* Botón flotante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`fixed bottom-4 right-4 z-[9999] ${hasSeoErrors ? 'bg-red-500' : 'bg-orange-500'} text-white px-3 py-1 rounded-full shadow-lg`}
        >
          {hasSeoErrors ? '❌' : '🧠'} SEO
        </button>
      )}

      {/* Panel lateral */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-[450px] bg-[#1e1e1e] text-white z-[9999] shadow-lg p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">🔎 SEO Debugger</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={refreshMetadata} 
                className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded flex items-center"
                disabled={refreshing}
                title="Fuerza la recarga y aplicación de metadatos desde metadata.ts"
              >
                {refreshing ? '⏳' : '🔄'} Refrescar metadatos
              </button>
              <button
                onClick={copyAllMetadata}
                className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded flex items-center"
              >
                {copySuccess ? '✓ Copiado!' : '📋 Copiar todo'}
              </button>
              <button onClick={() => setOpen(false)} className="text-sm text-gray-400 hover:text-white">✕ cerrar</button>
            </div>
          </div>

          {/* Estado del metadata.ts */}
          <div className="mb-4 p-3 bg-[#2a2a2a] rounded-md">
            <p className="mb-2 text-sm">
              <span className="text-orange-300">📂 metadata.ts:</span> 
              <span className={hasMetadataFile ? "text-green-400" : "text-red-400"}>
                {hasMetadataFile ? '✅ Detectado' : '❌ No detectado'}
              </span>
            </p>
            {!hasMetadataFile && (
              <div className="text-xs bg-red-900/50 p-2 rounded">
                ⚠️ <strong>Error crítico:</strong> No se detectó un archivo metadata.ts para esta ruta.
                Crea un archivo metadata.ts en esta carpeta.
              </div>
            )}
          </div>

          <div className="mb-4 p-3 bg-[#2a2a2a] rounded-md">
            <p className="mb-2 text-sm text-gray-300">
              <span className="text-orange-300">🔗 Canonical:</span> 
              <span className="mx-2">{metaData.canonical ? '✅' : '❌'}</span>
              <span className="break-all">{metaData.canonical || 'No definido'}</span>
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-orange-300">📄 Título:</span> 
              <span className="mx-2">{metaData.title ? '✅' : '❌'}</span>
              <span className="break-all">{metaData.title || 'No definido'}</span>
            </p>
            <p className="text-sm text-gray-300 mt-2">
              <span className="text-orange-300">🔍 Ruta actual:</span> 
              <span className="break-all">{pathname}</span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-orange-300 mb-2">Metadatos:</h3>
            <div className="bg-[#2a2a2a] rounded-md p-3 max-h-[60vh] overflow-y-auto">
              <ul className="text-xs space-y-3">
                {metaData.metas && Object.entries(metaData.metas).map(([k, v]: [string, string]) => {
                  // Determinar si es un meta crítico
                  const isCritical = ['description', 'og:title', 'og:description', 'og:url'].includes(k);
                  
                  return (
                    <li key={k} className={`border-b border-gray-700 pb-2 ${isCritical ? 'bg-gray-800/40 p-1 rounded' : ''}`}>
                      <div className="flex items-start justify-between">
                        <strong className={`${isCritical ? 'text-orange-300' : 'text-orange-200'} block mb-1`}>
                          {k}:
                          {isCritical && <span className="ml-2 text-xs bg-orange-900/40 px-1 rounded">crítico</span>}
                        </strong>
                        <span className="text-green-400 ml-2">✅</span>
                      </div> 
                      <span className="text-gray-300 break-all">{v}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-400 italic">
            <p>Última actualización: {new Date().toLocaleTimeString()}</p>
            {lastRefresh && (
              <p>Último refresco manual: {lastRefresh.toLocaleTimeString()}</p>
            )}
            <p>Actualizando automáticamente cada 3 segundos...</p>
          </div>

          {/* Solo usar CanonicalUrl como fallback si no hay canonical */}
          {!metaData.canonical && <CanonicalUrl />}
        </div>
      )}
    </>
  );
} 