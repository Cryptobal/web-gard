/**
 * Archivo centralizado con la información de servicios de Gard Security
 * Este archivo contiene la estructura y datos de cada servicio ofrecido
 * Para uso en páginas dinámicas de servicios y listados
 */

/**
 * Tipo que define la estructura de un servicio
 */
export type Servicio = {
  name: string
  slug: string
  icon: string
  description: string
  heroImageId: string
  gallery: string[]
  keywords: string[]
}

/**
 * Array de servicios ofrecidos por Gard Security
 */
export const servicios: Servicio[] = [
  // Servicio de Guardias de Seguridad
  {
    name: "Guardias de Seguridad",
    slug: "guardias-de-seguridad",
    icon: "ShieldCheck",
    description: "Guardias profesionales, entrenados y certificados para proteger personas, activos e instalaciones.",
    heroImageId: "e01db9f7-4cf6-4cac-cf83-c93215097200",
    gallery: [
      "5b95423f-4c59-4205-7b90-52e0667ca200",
      "fb852267-cb0c-4e3e-fa90-136c201e7000",
      "04e7aafd-831d-4b6f-666c-116605cc4400"
    ],
    keywords: [
      "guardias de seguridad",
      "guardias para empresas",
      "vigilancia 24/7",
      "guardias certificados",
      "servicio de seguridad presencial",
      "seguridad para edificios"
    ]
  },
  
  // Servicio de Seguridad Electrónica
  {
    name: "Seguridad Electrónica",
    slug: "seguridad-electronica",
    icon: "Shield",
    description: "Soluciones tecnológicas integradas para proteger instalaciones con sistemas CCTV, alarmas y control de acceso.",
    heroImageId: "237c574e-8997-4f6b-47fa-6c3ebe057200",
    gallery: [
      "7f152778-b285-4cbe-7aba-a77620455d00",
      "c2aebfd4-132d-4a44-21d0-469e834e5900"
    ],
    keywords: [
      "seguridad electrónica",
      "cámaras de seguridad",
      "CCTV",
      "sistemas de alarma",
      "control de acceso",
      "tecnología de seguridad"
    ]
  },
  
  // Servicio de Central de Monitoreo
  {
    name: "Central de Monitoreo",
    slug: "central-monitoreo",
    icon: "Eye",
    description: "Vigilancia 24/7 desde nuestra central de monitoreo para respuesta inmediata ante cualquier incidente.",
    heroImageId: "4a5d0b79-8f81-4387-54b5-dc9956268400",
    gallery: [
      "4be6a0d1-a23a-49fc-f2a5-aa24df947700",
      "165c106f-ae53-496f-d8f9-5d9f10aeb500"
    ],
    keywords: [
      "monitoreo 24/7",
      "central de monitoreo",
      "videovigilancia remota",
      "respuesta a alarmas",
      "seguridad a distancia",
      "monitoreo en tiempo real"
    ]
  },
  
  // Servicio de Drones de Seguridad
  {
    name: "Drones de Seguridad",
    slug: "drones-seguridad",
    icon: "Plane",
    description: "Vigilancia aérea con tecnología de drones para terrenos extensos, eventos y sitios de difícil acceso.",
    heroImageId: "be6ef2e1-98d5-4b3c-cd50-ca77cd6f0e00",
    gallery: [
      "79e59b55-d3cb-4cee-1f58-d5512b7d0000",
      "330ea24f-8216-48e2-ea7f-b33e24815b00"
    ],
    keywords: [
      "drones de seguridad",
      "vigilancia aérea",
      "seguridad con drones",
      "monitoreo con drones",
      "supervisión de grandes áreas",
      "inspección aérea"
    ]
  },
  
  // Servicio de Seguridad Perimetral
  {
    name: "Seguridad Perimetral",
    slug: "seguridad-perimetral",
    icon: "ShieldAlert",
    description: "Protección completa del perímetro de sus instalaciones con tecnología avanzada y vigilancia integrada.",
    heroImageId: "8534db25-0748-4339-68d9-9cc19023ec00",
    gallery: [
      "8534db25-0748-4339-68d9-9cc19023ec00"
    ],
    keywords: [
      "seguridad perimetral",
      "protección de perímetro",
      "cercos eléctricos",
      "barreras perimetrales",
      "alambrado de seguridad",
      "control de acceso perimetral"
    ]
  }
]; 