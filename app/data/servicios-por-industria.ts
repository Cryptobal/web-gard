/**
 * Archivo que relaciona los servicios de Gard Security con las industrias específicas
 * Este archivo permite filtrar qué servicios están disponibles para cada industria
 */

type IndustriaServicios = {
  industria: string; // Slug de la industria
  servicios: string[]; // Array de slugs de servicios disponibles para esta industria
};

/**
 * Tipo que define los datos específicos para una combinación de servicio e industria
 */
export type ServicioIndustriaData = {
  description?: string;
  desafios?: string[];
  soluciones?: string[];
  casoExito?: string;
  testimonio?: string;
}

/**
 * Array que mapea industrias con sus servicios disponibles
 * Si una industria no aparece aquí, se mostrarán todos los servicios por defecto
 */
export const serviciosPorIndustria: IndustriaServicios[] = [
  {
    industria: "mineria",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "drones-seguridad",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "retail",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "eventos-y-espectaculos",
    servicios: [
      "guardias-de-seguridad",
      "drones-seguridad"
    ]
  },
  {
    industria: "bodegas",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "salud",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "educacion",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "edificios-corporativos",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "construccion",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "drones-seguridad",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "transporte-y-logistica",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "parques-industriales",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo",
      "drones-seguridad",
      "seguridad-perimetral"
    ]
  },
  {
    industria: "instituciones-publicas",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  },
  {
    industria: "hoteleria-y-turismo",
    servicios: [
      "guardias-de-seguridad",
      "seguridad-electronica",
      "central-monitoreo"
    ]
  }
];

/**
 * Datos específicos para combinaciones de servicio e industria
 * Aquí se pueden añadir descripciones, desafíos, soluciones y otros datos específicos
 * La clave es "[servicio-slug]__[industria-slug]"
 */
const servicioIndustriaDataMap: Record<string, ServicioIndustriaData> = {
  // Guardias de seguridad para minería
  "guardias-de-seguridad__mineria": {
    description: "Nuestro servicio de guardias de seguridad para el sector minero está diseñado específicamente para proteger activos de alto valor y garantizar operaciones seguras en entornos de minería. Contamos con personal capacitado en los procedimientos y protocolos específicos de la industria minera.",
    desafios: [
      "Protección de instalaciones de extracción y procesamiento en ubicaciones remotas",
      "Control de acceso estricto a áreas restringidas y zonas de alto riesgo",
      "Prevención de robos de materiales y equipos de alto valor"
    ],
    soluciones: [
      "Personal con certificación especial para operaciones en entornos mineros",
      "Protocolos personalizados para control de acceso y verificación de identidad",
      "Sistemas de rotación adaptados a las necesidades operativas de minería 24/7"
    ],
    casoExito: "Implementamos un sistema integral de seguridad para una de las principales mineras del país, logrando reducir en un 85% los incidentes de seguridad y mejorando significativamente el cumplimiento normativo.",
    testimonio: "La presencia de guardias especializados en minería no solo ha mejorado nuestra seguridad, sino que ha contribuido positivamente a nuestra cultura de seguridad operacional. Su conocimiento del sector hace la diferencia."
  },
  
  // Guardias de seguridad para retail
  "guardias-de-seguridad__retail": {
    description: "Nuestros servicios de guardias de seguridad para retail están específicamente diseñados para prevenir pérdidas, disuadir actividades delictivas y garantizar un entorno seguro tanto para clientes como para personal. Implementamos técnicas discretas pero efectivas que no interfieren con la experiencia de compra.",
    desafios: [
      "Prevención de hurtos y mermas en tiendas con alto tráfico de clientes",
      "Manejo de situaciones conflictivas manteniendo la imagen de la marca",
      "Control simultáneo de múltiples accesos y áreas de riesgo"
    ],
    soluciones: [
      "Guardias capacitados en técnicas de observación y prevención discretas",
      "Protocolos especiales para manejo de situaciones conflictivas con clientes",
      "Coordinación con sistemas electrónicos para maximizar la cobertura"
    ],
    casoExito: "Redujimos las pérdidas por hurto en un 67% para una cadena nacional de retail, implementando un sistema integrado de guardias visibles y encubiertos con tecnología de apoyo.",
    testimonio: "La profesionalidad de los guardias de Gard ha transformado nuestra seguridad. Su enfoque discreto pero efectivo mantiene nuestra imagen de marca mientras protege nuestros activos."
  }
};

/**
 * Función para obtener datos específicos para una combinación de servicio e industria
 * @param servicioSlug Slug del servicio
 * @param industriaSlug Slug de la industria
 * @returns Datos específicos para esta combinación o un objeto vacío si no hay datos
 */
export function getServicioIndustriaData(servicioSlug: string, industriaSlug: string): ServicioIndustriaData {
  const key = `${servicioSlug}__${industriaSlug}`;
  return servicioIndustriaDataMap[key] || {};
} 