'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import CanonicalUrl from './CanonicalUrl';

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
  const pathname = usePathname(); // Obtener la ruta actual
  const [metadataFilePath, setMetadataFilePath] = useState<string>('');

  // Función para determinar la ruta probable del archivo de metadata
  const determineMetadataFilePath = (path: string) => {
    // Eliminar slash inicial y dividir por slashes
    const segments = path.replace(/^\//, '').split('/');
    
    // Casos especiales - páginas que pueden tener metadatos específicos
    if (segments.length === 0 || path === '/') {
      return 'app/page.tsx';
    }
    
    // Revisar si estamos en una ruta de grupo (con paréntesis)
    const firstSegment = segments[0];
    if (firstSegment.startsWith('(') && firstSegment.endsWith(')')) {
      // Es un grupo de rutas
      if (segments.length > 1) {
        return `app/${firstSegment}/${segments.slice(1).join('/')}/page.tsx`;
      } else {
        return `app/${firstSegment}/layout.tsx`;
      }
    }
    
    // Casos normales - estructura de archivo estándar
    if (segments.length === 1) {
      return `app/${segments[0]}/page.tsx`;
    }
    
    // Construir ruta para casos de slug o parámetros dinámicos
    const routePath = segments.join('/');
    const routePathWithBrackets = segments.map((segment, i) => {
      if (i < segments.length - 1) {
        return segment;
      }
      // Asumimos que el último segmento podría ser un parámetro
      return '[...slug]';
    }).join('/');
    
    return `app/${routePath}/page.tsx o app/${routePathWithBrackets}/page.tsx`;
  };

  // Función para actualizar los metadatos
  const updateMetaData = () => {
    if (typeof window === 'undefined') return;
    
    const metas = document.querySelectorAll('meta');
    const metaInfo: MetaInfo = {};
    metas.forEach((m) => {
      const name = m.getAttribute('name') || m.getAttribute('property');
      const content = m.getAttribute('content');
      if (name && content) metaInfo[name] = content;
    });

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    const hrefAttr = canonicalEl?.getAttribute('href');
    const canonicalHref = hrefAttr || undefined;

    setMetaData({
      title: document.title,
      canonical: canonicalHref,
      metas: metaInfo,
    });
    
    // Actualizar la ruta probable del archivo de metadata
    setMetadataFilePath(determineMetadataFilePath(pathname));
  };

  // Función para copiar todos los metadatos
  const copyAllMetadata = () => {
    // Crear un texto formateado con toda la información SEO
    let seoText = `SEO DEBUG INFORMATION\n\n`;
    seoText += `URL: ${window.location.href}\n`;
    seoText += `Canonical: ${metaData.canonical || 'No definido'}\n`;
    seoText += `Title: ${metaData.title || 'No definido'}\n`;
    seoText += `Path: ${pathname}\n`;
    seoText += `Probable Metadata File: ${metadataFilePath}\n\n`;
    
    seoText += `METADATA:\n`;
    if (metaData.metas) {
      Object.entries(metaData.metas).forEach(([key, value]) => {
        seoText += `${key}: ${value}\n`;
      });
    }
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(seoText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => console.error('Error al copiar:', err));
  };

  // Efecto para configurar el modo desarrollo
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsDev(true);
    }
  }, []);

  // Efecto para actualizar los metadatos cuando cambia la ruta
  useEffect(() => {
    if (isDev) {
      // Esperar a que el DOM se actualice después del cambio de ruta
      const timer = setTimeout(() => {
        updateMetaData();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isDev]);

  // Actualizar también cuando se abre el panel
  useEffect(() => {
    if (open && isDev) {
      updateMetaData();
    }
  }, [open, isDev]);

  if (!isDev) return null;

  return (
    <>
      {/* Botón flotante para abrir */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-[9999] bg-orange-500 text-white px-3 py-1 rounded-full shadow-lg"
        >
          🧠 SEO
        </button>
      )}

      {/* Panel lateral */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-[450px] bg-[#1e1e1e] text-white z-[9999] shadow-lg p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">🔎 SEO Debugger</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={updateMetaData} 
                className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                title="Actualizar metadatos"
              >
                🔄 Actualizar
              </button>
              <button
                onClick={copyAllMetadata}
                className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded flex items-center"
                title="Copiar todos los metadatos"
              >
                {copySuccess ? '✓ Copiado!' : '📋 Copiar todo'}
              </button>
              <button onClick={() => setOpen(false)} className="text-sm text-gray-400 hover:text-white">✕ cerrar</button>
            </div>
          </div>

          <div className="mb-4 p-3 bg-[#2a2a2a] rounded-md">
            <p className="mb-2 text-sm text-gray-300">
              <span className="text-orange-300">🔗 Canonical:</span> 
              <span className="break-all">{metaData.canonical || '❌ No definido'}</span>
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-orange-300">📄 Título:</span> 
              <span className="break-all">{metaData.title || '❌ No definido'}</span>
            </p>
            <p className="text-sm text-gray-300 mt-2">
              <span className="text-orange-300">🔍 Ruta actual:</span> 
              <span className="break-all">{pathname}</span>
            </p>
            <p className="text-sm text-gray-300 mt-2">
              <span className="text-orange-300">📁 Archivo de metadata probable:</span> 
              <span className="break-all">{metadataFilePath}</span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-orange-300 mb-2">Metadatos:</h3>
            <div className="bg-[#2a2a2a] rounded-md p-3 max-h-[60vh] overflow-y-auto">
              <ul className="text-xs space-y-3">
                {metaData.metas && Object.entries(metaData.metas).map(([k, v]: [string, string]) => (
                  <li key={k} className="border-b border-gray-700 pb-2">
                    <strong className="text-orange-200 block mb-1">{k}:</strong> 
                    <span className="text-gray-300 break-all">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Canonical logic se asegura desde aquí */}
          <CanonicalUrl />
        </div>
      )}
    </>
  );
} 