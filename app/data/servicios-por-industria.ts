/**
 * Archivo que relaciona los servicios de Gard Security con las industrias específicas
 * Este archivo permite filtrar qué servicios están disponibles para cada industria
 */

type IndustriaServicios = {
  industria: string; // Slug de la industria
  servicios: string[]; // Array de slugs de servicios disponibles para esta industria
};

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