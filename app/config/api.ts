/**
 * Configuración de endpoints de API según el entorno
 */

// Determinar URL base según el entorno
const getApiBaseUrl = (): string => {
  // En producción
  if (typeof window !== 'undefined' && window.location.hostname === 'gard.cl') {
    return 'https://api.gard.cl'; // URL del backend en producción
  }

  // En staging/preview
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'https://api.gard.cl'; // También usamos la API de producción para previews
  }

  // En desarrollo local
  return 'http://localhost:8090';
};

// URLs de API
export const API_URLS = {
  CONTACTO: `${getApiBaseUrl()}/api/formulario/contacto`,
  COTIZACION: `${getApiBaseUrl()}/api/formulario/cotizacion`,
  COTIZACION_INTELIGENTE: `${getApiBaseUrl()}/api/formulario/cotizacion-inteligente`,
};

export default API_URLS; 