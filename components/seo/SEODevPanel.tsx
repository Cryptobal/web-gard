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

type SEOErrors = {
  title?: string;
  canonical?: string;
  description?: string;
  keywords?: string;
  og?: string;
  hasErrors: boolean;
};

interface EditableFields {
  title: string;
  description: string;
  keywords: string;
}

export default function SEODevPanel() {
  const [open, setOpen] = useState(false);
  const [metaData, setMetaData] = useState<MetaData>({});
  const [isDev, setIsDev] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [seoErrors, setSeoErrors] = useState<SEOErrors>({ hasErrors: false });
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editableFields, setEditableFields] = useState<EditableFields>({
    title: '',
    description: '',
    keywords: '',
  });
  const pathname = usePathname(); // Obtener la ruta actual

  // Función para validar SEO y detectar errores
  const validateSEO = (data: MetaData): SEOErrors => {
    const errors: SEOErrors = { hasErrors: false };
    
    // Validar título
    if (!data.title) {
      errors.title = 'El título no está definido';
      errors.hasErrors = true;
    } else if (data.title.length < 10) {
      errors.title = 'El título es demasiado corto (mínimo 10 caracteres)';
      errors.hasErrors = true;
    } else if (data.title.length > 70) {
      errors.title = 'El título es demasiado largo (máximo 70 caracteres)';
      errors.hasErrors = true;
    }
    
    // Validar canonical
    if (!data.canonical) {
      errors.canonical = 'La URL canónica no está definida';
      errors.hasErrors = true;
    } else if (!data.canonical.startsWith('https://')) {
      errors.canonical = 'La URL canónica no es HTTPS';
      errors.hasErrors = true;
    }
    
    // Validar meta descripción
    const description = data.metas?.['description'];
    if (!description) {
      errors.description = 'La meta descripción no está definida';
      errors.hasErrors = true;
    } else if (description.length < 50) {
      errors.description = 'La meta descripción es demasiado corta (mínimo 50 caracteres)';
      errors.hasErrors = true;
    } else if (description.length > 160) {
      errors.description = 'La meta descripción es demasiado larga (máximo 160 caracteres)';
      errors.hasErrors = true;
    }
    
    // Validar keywords
    const keywords = data.metas?.['keywords'];
    if (!keywords) {
      errors.keywords = 'Las keywords no están definidas';
      errors.hasErrors = true;
    }
    
    // Validar Open Graph
    const ogTitle = data.metas?.['og:title'];
    const ogDescription = data.metas?.['og:description'];
    const ogUrl = data.metas?.['og:url'];
    if (!ogTitle || !ogDescription || !ogUrl) {
      errors.og = 'Faltan etiquetas Open Graph básicas';
      errors.hasErrors = true;
    }
    
    return errors;
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

    const newMetaData = {
      title: document.title,
      canonical: canonicalHref,
      metas: metaInfo,
    };
    
    setMetaData(newMetaData);
    
    // Establecer campos editables
    setEditableFields({
      title: document.title || '',
      description: metaInfo['description'] || '',
      keywords: metaInfo['keywords'] || '',
    });
    
    // Validar SEO
    const errors = validateSEO(newMetaData);
    setSeoErrors(errors);
    setHasErrors(errors.hasErrors);
  };

  // Función para copiar todos los metadatos
  const copyAllMetadata = () => {
    // Crear un texto formateado con toda la información SEO
    let seoText = `SEO DEBUG INFORMATION\n\n`;
    seoText += `URL: ${window.location.href}\n`;
    seoText += `Canonical: ${metaData.canonical || 'No definido'}\n`;
    seoText += `Title: ${metaData.title || 'No definido'}\n`;
    seoText += `Path: ${pathname}\n\n`;
    
    seoText += `METADATA:\n`;
    if (metaData.metas) {
      Object.entries(metaData.metas).forEach(([key, value]) => {
        seoText += `${key}: ${value}\n`;
      });
    }
    
    if (seoErrors.hasErrors) {
      seoText += `\nERRORES SEO DETECTADOS:\n`;
      if (seoErrors.title) seoText += `- Título: ${seoErrors.title}\n`;
      if (seoErrors.canonical) seoText += `- Canonical: ${seoErrors.canonical}\n`;
      if (seoErrors.description) seoText += `- Descripción: ${seoErrors.description}\n`;
      if (seoErrors.keywords) seoText += `- Keywords: ${seoErrors.keywords}\n`;
      if (seoErrors.og) seoText += `- Open Graph: ${seoErrors.og}\n`;
    }
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(seoText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => console.error('Error al copiar:', err));
  };

  // Función para convertir la ruta actual a un path de archivo de metadatos
  const getMetadataFilePath = (): string => {
    if (!pathname || pathname === '/') {
      return '/app/metadata.ts';
    }
    
    // Eliminar parámetros de consulta si existen
    const cleanPath = pathname.split('?')[0];
    
    // Convertir la ruta a un path de archivo
    return `/app${cleanPath}/metadata.ts`;
  };

  // Función para autoarreglar los metadatos
  const autoFixSEO = () => {
    if (!window.confirm('Esta función realizará correcciones automáticas en los metadatos. ¿Desea continuar?')) {
      return;
    }
    
    const fixes = {
      title: editableFields.title,
      description: editableFields.description,
      keywords: editableFields.keywords,
      path: pathname,
      suggestions: {} as Record<string, string>
    };
    
    // Sugerencias
    if (seoErrors.title) {
      fixes.suggestions['title'] = 'Título optimizado para SEO';
    }
    
    if (seoErrors.description) {
      fixes.suggestions['description'] = 'Descripción que incluye palabras clave relevantes y tiene entre 50-160 caracteres';
    }
    
    if (seoErrors.keywords) {
      fixes.suggestions['keywords'] = 'Palabras clave relevantes separadas por comas';
    }
    
    console.log('AUTO-FIX SEO:', fixes);
    console.log('Ruta del archivo de metadatos para modificar:', getMetadataFilePath());
    
    // Mostrar sugerencias en el panel
    alert('Se han generado sugerencias para mejorar el SEO. Revise la consola del navegador para más detalles.');
  };

  // Función para guardar cambios
  const saveChanges = async () => {
    // Esta función en un entorno real enviaría los cambios al servidor
    // Por ahora, solo mostraremos un mensaje de éxito
    console.log('Guardando cambios en:', getMetadataFilePath());
    console.log('Nuevos valores:', editableFields);
    
    // Simulamos el guardado
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Manejar cambios en los campos editables
  const handleFieldChange = (field: keyof EditableFields, value: string) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: value
    }));
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
          {hasErrors ? '⚠️ SEO' : '🧠 SEO'}
        </button>
      )}

      {/* Panel lateral */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-[450px] bg-[#1e1e1e] text-white z-[9999] shadow-lg p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              {hasErrors ? '⚠️ SEO Debugger' : '🔎 SEO Debugger'}
            </h2>
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

          {/* Mostrar errores si existen */}
          {seoErrors.hasErrors && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-md">
              <h3 className="text-red-400 font-semibold mb-2 flex items-center">
                <span className="mr-2">⚠️</span> Problemas SEO detectados:
              </h3>
              <ul className="text-xs space-y-1 text-red-200">
                {seoErrors.title && <li>• {seoErrors.title}</li>}
                {seoErrors.canonical && <li>• {seoErrors.canonical}</li>}
                {seoErrors.description && <li>• {seoErrors.description}</li>}
                {seoErrors.keywords && <li>• {seoErrors.keywords}</li>}
                {seoErrors.og && <li>• {seoErrors.og}</li>}
              </ul>
              <button
                onClick={autoFixSEO}
                className="mt-3 text-xs bg-orange-600 hover:bg-orange-700 px-2 py-1 rounded w-full"
              >
                🔧 Auto-Fix SEO
              </button>
            </div>
          )}

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-orange-300">Información principal:</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs bg-blue-500/30 hover:bg-blue-500/50 px-2 py-1 rounded"
              >
                {isEditing ? '✓ Terminar edición' : '✏️ Editar campos'}
              </button>
            </div>
            
            {isEditing ? (
              <div className="space-y-3 p-3 bg-[#2a2a2a] rounded-md">
                <div>
                  <label className="text-xs text-orange-300 block mb-1">Título:</label>
                  <input
                    type="text"
                    value={editableFields.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full bg-[#3a3a3a] text-white px-2 py-1 rounded text-sm"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">Caracteres: {editableFields.title.length}</span>
                    {editableFields.title.length > 70 && (
                      <span className="text-xs text-red-400">Demasiado largo</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-orange-300 block mb-1">Descripción:</label>
                  <textarea
                    value={editableFields.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    className="w-full bg-[#3a3a3a] text-white px-2 py-1 rounded text-sm h-20 resize-none"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">Caracteres: {editableFields.description.length}</span>
                    {(editableFields.description.length < 50 || editableFields.description.length > 160) && (
                      <span className="text-xs text-red-400">
                        {editableFields.description.length < 50 ? 'Demasiado corto' : 'Demasiado largo'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-orange-300 block mb-1">Keywords:</label>
                  <input
                    type="text"
                    value={editableFields.keywords}
                    onChange={(e) => handleFieldChange('keywords', e.target.value)}
                    className="w-full bg-[#3a3a3a] text-white px-2 py-1 rounded text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">Separar por comas. Ejemplo: palabra1,palabra2,frase clave</p>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={saveChanges}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm flex items-center justify-center"
                  >
                    {saveSuccess ? '✓ Guardado!' : '💾 Guardar cambios'}
                  </button>
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    Se modificará: {getMetadataFilePath()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-[#2a2a2a] rounded-md">
                <div className="mb-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-orange-300">🔗 Canonical:</span>
                    {seoErrors.canonical && (
                      <span className="text-xs text-red-400">⚠️ {seoErrors.canonical}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-300 break-all block mt-1">
                    {metaData.canonical || '❌ No definido'}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-orange-300">📄 Título:</span>
                    {seoErrors.title && (
                      <span className="text-xs text-red-400">⚠️ {seoErrors.title}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-300 break-all block mt-1">
                    {metaData.title || '❌ No definido'}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-orange-300">📝 Descripción:</span>
                    {seoErrors.description && (
                      <span className="text-xs text-red-400">⚠️ {seoErrors.description}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-300 break-all block mt-1">
                    {metaData.metas?.['description'] || '❌ No definido'}
                  </span>
                </div>
                
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-orange-300">🏷️ Keywords:</span> 
                    {seoErrors.keywords && (
                      <span className="text-xs text-red-400">⚠️ {seoErrors.keywords}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-300 break-all block mt-1">
                    {metaData.metas?.['keywords'] || '❌ No definido'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 mt-3">
                  <span className="text-orange-300">🔍 Ruta actual:</span> 
                  <span className="break-all ml-1">{pathname}</span>
                </p>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-orange-300 mb-2">Todos los metadatos:</h3>
            <div className="bg-[#2a2a2a] rounded-md p-3 max-h-[40vh] overflow-y-auto">
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