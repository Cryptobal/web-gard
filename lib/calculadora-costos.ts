// ✅ Lógica centralizada de cálculo de cotizaciones de guardias
// Gard Security - Calculadora de costos

// 🔢 Tipos de datos para la calculadora
export type TipoTurno = '4x4' | '5x2' | '7x7' | '14x14' | '2x5' | 'Personalizado';
export type TipoHorario = 'Día' | 'Noche' | '24 horas';

export interface RolOperativo {
  id: string;
  tipoTurno: TipoTurno;
  horario: TipoHorario;
  puestos: number;
  sueldoLiquido: number;
  diasSemana: number;
  horasDia: number;
  multiplicadorGuardias: number;
  precioFijo: number | null;
}

// 📊 Constantes para cálculos
export const FACTOR_COSTOS = 0.74; // 74% adicional por cotizaciones, provisiones, etc.
export const UTILIDAD = 0.13; // 13% de utilidad
export const SEMANAS_POR_MES = 4.33; // Promedio de semanas por mes

// 💰 Precios fijos y sueldos recomendados
export const PRECIOS_FIJOS = {
  '5x2': 1452000, // Precio fijo para turno 5x2
  '2x5': 662000,  // Precio fijo para turno part-time
};

export const SUELDOS_RECOMENDADOS = {
  '4x4': 550000,
  '5x2': 650000,
  '2x5': 350000,
  '7x7': 550000,
  '14x14': 550000,
  'Personalizado': 600000,
};

// 💰 Rangos salariales por tipo de turno
export const RANGOS_SALARIALES = {
  '4x4': { min: 550000, max: 1000000 },
  '5x2': { min: 650000, max: 1000000 },
  '2x5': { min: 350000, max: 500000 },
  '7x7': { min: 550000, max: 1000000 },
  '14x14': { min: 550000, max: 1000000 },
  'Personalizado': { min: 350000, max: 1500000 },
};

// 🧮 Configuraciones predeterminadas por tipo de turno
export const CONFIGURACIONES_TURNOS: Record<TipoTurno, {
  diasSemana: number;
  horasDia: number;
  multiplicadorGuardias: number;
  precioFijo: number | null;
  descripcion: string;
}> = {
  '4x4': {
    diasSemana: 7,
    horasDia: 12,
    multiplicadorGuardias: 2,
    precioFijo: null,
    descripcion: '4 días trabajados x 4 días libres, requiere 2 guardias por puesto'
  },
  '5x2': {
    diasSemana: 5,
    horasDia: 12,
    multiplicadorGuardias: 1,
    precioFijo: PRECIOS_FIJOS['5x2'],
    descripcion: 'Turno de lunes a viernes, jornada completa'
  },
  '2x5': {
    diasSemana: 2,
    horasDia: 4,
    multiplicadorGuardias: 1,
    precioFijo: PRECIOS_FIJOS['2x5'],
    descripcion: 'Jornada parcial, pocos días a la semana'
  },
  '7x7': {
    diasSemana: 7,
    horasDia: 12,
    multiplicadorGuardias: 2,
    precioFijo: null,
    descripcion: '7 días trabajados x 7 días libres, requiere 2 guardias por puesto'
  },
  '14x14': {
    diasSemana: 7,
    horasDia: 12,
    multiplicadorGuardias: 2,
    precioFijo: null,
    descripcion: '14 días trabajados x 14 días libres, ideal para faenas mineras'
  },
  'Personalizado': {
    diasSemana: 5,
    horasDia: 8,
    multiplicadorGuardias: 1,
    precioFijo: null,
    descripcion: 'Configuración personalizada según necesidades específicas'
  }
};

/**
 * Genera un nuevo rol operativo con valores predeterminados según el tipo de turno
 */
export function crearNuevoRol(id: string, tipoTurno: TipoTurno = '4x4'): RolOperativo {
  const config = CONFIGURACIONES_TURNOS[tipoTurno];
  
  return {
    id,
    tipoTurno,
    horario: 'Día',
    puestos: 1,
    sueldoLiquido: SUELDOS_RECOMENDADOS[tipoTurno],
    diasSemana: config.diasSemana,
    horasDia: config.horasDia,
    multiplicadorGuardias: config.multiplicadorGuardias,
    precioFijo: config.precioFijo
  };
}

/**
 * Actualiza un rol cuando cambia el tipo de turno
 */
export function actualizarConfiguracionTurno(rol: RolOperativo, nuevoTipoTurno: TipoTurno): RolOperativo {
  const config = CONFIGURACIONES_TURNOS[nuevoTipoTurno];
  
  // Determinar el valor adecuado para horasDia basado en el horario actual
  let horasDia = config.horasDia;
  if (rol.horario === '24 horas') {
    horasDia = 24;
  } else if (rol.horario === 'Día' || rol.horario === 'Noche') {
    horasDia = 12;
  }
  
  // Determinar el multiplicador correcto según el horario
  let multiplicadorGuardias = config.multiplicadorGuardias;
  if (rol.horario === '24 horas') {
    multiplicadorGuardias = config.multiplicadorGuardias * 2;
  }
  
  // Asegurar que el sueldo líquido sea al menos el mínimo recomendado para el tipo de turno
  const sueldoMinimo = RANGOS_SALARIALES[nuevoTipoTurno].min;
  const sueldoLiquido = Math.max(sueldoMinimo, SUELDOS_RECOMENDADOS[nuevoTipoTurno]);
  
  return {
    ...rol,
    tipoTurno: nuevoTipoTurno,
    diasSemana: config.diasSemana,
    horasDia: horasDia,
    multiplicadorGuardias: multiplicadorGuardias,
    precioFijo: config.precioFijo,
    sueldoLiquido: sueldoLiquido
  };
}

/**
 * Obtiene el multiplicador correcto de guardias basado en el tipo de turno y horario
 */
export function obtenerMultiplicadorGuardias(tipoTurno: TipoTurno, horario: TipoHorario): number {
  const baseMultiplicador = CONFIGURACIONES_TURNOS[tipoTurno].multiplicadorGuardias;
  return horario === '24 horas' ? baseMultiplicador * 2 : baseMultiplicador;
}

/**
 * Calcula el costo mensual de un rol operativo
 */
export function calcularCostoRol(rol: RolOperativo): number {
  // Si tiene precio fijo, usar ese valor
  if (rol.precioFijo) {
    return rol.precioFijo * rol.puestos;
  }
  
  // Calcular guardias totales necesarios
  // Usar la función obtenerMultiplicadorGuardias para asegurar que se usa el multiplicador correcto
  const multiplicador = obtenerMultiplicadorGuardias(rol.tipoTurno, rol.horario);
  const guardiasTotales = rol.puestos * multiplicador;
  
  // Cálculo estándar: Sueldo base → Costo → Precio final
  const costo = rol.sueldoLiquido * (1 + FACTOR_COSTOS);
  const precioFinalPorGuardia = costo * (1 + UTILIDAD);
  
  return precioFinalPorGuardia * guardiasTotales;
}

/**
 * Calcula el número total de guardias necesarios para un rol
 */
export function calcularTotalGuardias(rol: RolOperativo): number {
  const multiplicador = obtenerMultiplicadorGuardias(rol.tipoTurno, rol.horario);
  return rol.puestos * multiplicador;
}

/**
 * Formatea el precio en formato CLP
 */
export function formatearPrecio(valor: number): string {
  return valor.toLocaleString('es-CL');
}