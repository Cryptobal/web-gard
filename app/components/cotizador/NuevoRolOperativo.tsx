"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Calendar,
  PlusCircle, 
  Trash2, 
  Info, 
  DollarSign,
  FileText,
  Repeat
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  RolOperativo, 
  TipoTurno,
  TipoHorario,
  calcularCostoRol,
  actualizarConfiguracionTurno,
  calcularTotalGuardias,
  formatearPrecio,
  CONFIGURACIONES_TURNOS,
  SUELDOS_RECOMENDADOS,
  RANGOS_SALARIALES,
  obtenerMultiplicadorGuardias
} from '@/lib/calculadora-costos';

interface NuevoRolOperativoProps {
  rol: RolOperativo;
  onChange: (rol: RolOperativo) => void;
  onRemove: () => void;
  showRemoveButton: boolean;
  index: number;
}

export default function NuevoRolOperativo({
  rol,
  onChange,
  onRemove,
  showRemoveButton,
  index
}: NuevoRolOperativoProps) {
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  
  // Efecto para ajustar horas por día según el horario
  useEffect(() => {
    // Primero ajustamos las horas según el horario
    let horasDia = rol.horasDia;
    if (rol.horario === '24 horas') {
      horasDia = 24;
    } else if (rol.horario === 'Día' || rol.horario === 'Noche') {
      horasDia = 12;
    }
    
    // Calculamos el multiplicador correcto
    const multiplicadorGuardias = obtenerMultiplicadorGuardias(rol.tipoTurno, rol.horario);
    
    // Solo actualizamos si hay cambios para evitar loops infinitos
    if (horasDia !== rol.horasDia || multiplicadorGuardias !== rol.multiplicadorGuardias) {
      onChange({
        ...rol,
        horasDia,
        multiplicadorGuardias
      });
    }
  }, [rol.horario, rol.tipoTurno]);
  
  // Actualizar el rol cuando cambia el tipo de turno
  const handleTipoTurnoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoTipo = e.target.value as TipoTurno;
    const rolActualizado = actualizarConfiguracionTurno(rol, nuevoTipo);
    onChange(rolActualizado);
  };
  
  // Actualizar campos individuales
  const handleFieldChange = <K extends keyof RolOperativo>(
    field: K, 
    value: RolOperativo[K]
  ) => {
    onChange({
      ...rol,
      [field]: value
    });
  };
  
  // Manejar cambio de horario
  const handleHorarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFieldChange('horario', e.target.value as TipoHorario);
  };
  
  // Manejar cambio de puestos (ahora con slider)
  const handlePuestosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(e.target.value);
    if (!isNaN(valor) && valor >= 1 && valor <= 10) {
      handleFieldChange('puestos', valor);
    }
  };
  
  // Manejar cambio de sueldo líquido (ahora con slider y validación de mínimo)
  const handleSueldoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(e.target.value);
    const minSueldo = RANGOS_SALARIALES[rol.tipoTurno].min;
    const maxSueldo = RANGOS_SALARIALES[rol.tipoTurno].max;
    
    if (!isNaN(valor) && valor >= minSueldo && valor <= maxSueldo) {
      handleFieldChange('sueldoLiquido', valor);
    }
  };
  
  // Ajustar días por semana (solo para Personalizado)
  const handleDiasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(e.target.value);
    if (!isNaN(valor) && valor > 0 && valor <= 7) {
      handleFieldChange('diasSemana', valor);
    }
  };
  
  // Ajustar horas por día (solo para Personalizado)
  const handleHorasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(e.target.value);
    if (!isNaN(valor) && valor > 0 && valor <= 24) {
      handleFieldChange('horasDia', valor);
    }
  };
  
  // Calcular el costo total de este rol
  const costoTotal = calcularCostoRol(rol);
  const totalGuardias = calcularTotalGuardias(rol);
  
  // Obtener los rangos salariales correctos para este tipo de turno
  const rangoSalarial = RANGOS_SALARIALES[rol.tipoTurno];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="gard-card bg-card dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground flex items-center">
            <Users className="h-6 w-6 mr-3 text-primary dark:text-accent" />
            Rol Operativo {index + 1}
          </h3>
          <div className="mt-2 flex items-center">
            <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent rounded-full text-sm font-medium">
              {rol.tipoTurno}
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              {CONFIGURACIONES_TURNOS[rol.tipoTurno].descripcion}
            </span>
          </div>
        </div>
        {showRemoveButton && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRemove}
            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            aria-label="Eliminar rol"
          >
            <Trash2 className="h-5 w-5 text-red-500" />
          </motion.button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Selector de tipo de turno simplificado */}
        <div className="space-y-4">
          <label htmlFor={`tipo-${rol.id}`} className="text-base font-medium flex items-center text-foreground">
            <Repeat className="h-5 w-5 mr-2 text-primary dark:text-accent" />
            Tipo de turno
          </label>
          <select
            id={`tipo-${rol.id}`}
            value={rol.tipoTurno}
            onChange={handleTipoTurnoChange}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="4x4">4x4</option>
            <option value="5x2">5x2</option>
            <option value="7x7">7x7</option>
            <option value="14x14">14x14</option>
            <option value="2x5">2x5 (jornada parcial)</option>
            <option value="Personalizado">Personalizado</option>
          </select>
        </div>
        
        {/* Selector de horario */}
        <div className="space-y-4">
          <label htmlFor={`horario-${rol.id}`} className="text-base font-medium flex items-center text-foreground">
            <Clock className="h-5 w-5 mr-2 text-primary dark:text-accent" />
            Horario
          </label>
          <select
            id={`horario-${rol.id}`}
            value={rol.horario}
            onChange={handleHorarioChange}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="Día">Día</option>
            <option value="Noche">Noche</option>
            <option value="24 horas">24 horas</option>
          </select>
        </div>
        
        {/* Número de puestos con slider */}
        <div className="space-y-4">
          <div className="flex items-center">
            <label htmlFor={`puestos-${rol.id}`} className="text-base font-medium flex items-center text-foreground">
              <Users className="h-5 w-5 mr-2 text-primary dark:text-accent" />
              N° de puestos
            </label>
            <button
              className="ml-2 p-1 rounded-full hover:bg-muted"
              aria-label="Información sobre puestos"
              onMouseEnter={() => setTooltipVisible(`puestos-${rol.id}`)}
              onMouseLeave={() => setTooltipVisible(null)}
              onTouchStart={() => setTooltipVisible(`puestos-${rol.id}`)}
              onTouchEnd={() => setTooltipVisible(null)}
            >
              <Info className="h-4 w-4 text-primary dark:text-accent" />
            </button>
            
            {tooltipVisible === `puestos-${rol.id}` && (
              <div className="absolute z-20 bg-popover text-popover-foreground p-4 rounded-xl shadow-xl max-w-xs mt-2 text-sm transform translate-y-8 -translate-x-4">
                "Puestos de seguridad" se refiere a cuántos guardias necesitas <strong>en simultáneo</strong>, en ese lugar, durante el horario definido.
                <br /><br />
                Ejemplo: Si necesitas 2 guardias en la entrada principal al mismo tiempo, eso son 2 puestos.
                {obtenerMultiplicadorGuardias(rol.tipoTurno, rol.horario) > 1 && (
                  <><br /><br />
                  <strong>Nota:</strong> El turno {rol.tipoTurno} con horario {rol.horario} requiere {obtenerMultiplicadorGuardias(rol.tipoTurno, rol.horario)} guardias por cada puesto para cubrir la jornada completa.
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">1</span>
            <span className="text-xl font-semibold text-primary dark:text-accent">{rol.puestos}</span>
            <span className="text-sm text-muted-foreground">10</span>
          </div>
          <input
            id={`puestos-${rol.id}`}
            type="range"
            min="1"
            max="10"
            value={rol.puestos}
            onChange={handlePuestosChange}
            className="w-full h-2 rounded-full accent-primary bg-muted appearance-none cursor-pointer"
          />
        </div>
        
        {/* Sueldo líquido con slider y rangos ajustados según tipo de turno */}
        <div className="space-y-4">
          <label htmlFor={`sueldo-${rol.id}`} className="text-base font-medium flex items-center text-foreground">
            <DollarSign className="h-5 w-5 mr-2 text-primary dark:text-accent" />
            Sueldo líquido (CLP)
          </label>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">${formatearPrecio(rangoSalarial.min)}</span>
            <span className="text-xl font-semibold text-primary dark:text-accent">${formatearPrecio(rol.sueldoLiquido)}</span>
            <span className="text-sm text-muted-foreground">${formatearPrecio(rangoSalarial.max)}</span>
          </div>
          <input
            id={`sueldo-${rol.id}`}
            type="range"
            min={rangoSalarial.min}
            max={rangoSalarial.max}
            step="10000"
            value={rol.sueldoLiquido}
            onChange={handleSueldoChange}
            className="w-full h-2 rounded-full accent-primary bg-muted appearance-none cursor-pointer"
          />
        </div>
        
        {/* Campos personalizados (solo para tipo "Personalizado") */}
        {rol.tipoTurno === 'Personalizado' && (
          <>
            <div className="space-y-4">
              <label htmlFor={`dias-${rol.id}`} className="text-base font-medium flex items-center text-foreground">
                <Calendar className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                Días por semana
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">1</span>
                <span className="text-xl font-semibold text-primary dark:text-accent">{rol.diasSemana}</span>
                <span className="text-sm text-muted-foreground">7</span>
              </div>
              <input
                id={`dias-${rol.id}`}
                type="range"
                min="1"
                max="7"
                value={rol.diasSemana}
                onChange={handleDiasChange}
                className="w-full h-2 rounded-full accent-primary bg-muted appearance-none cursor-pointer"
              />
            </div>
            
            <div className="space-y-4">
              <label htmlFor={`horas-${rol.id}`} className="text-base font-medium flex items-center text-foreground">
                <Clock className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                Horas por día
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">1</span>
                <span className="text-xl font-semibold text-primary dark:text-accent">{rol.horasDia}</span>
                <span className="text-sm text-muted-foreground">24</span>
              </div>
              <input
                id={`horas-${rol.id}`}
                type="range"
                min="1"
                max="24"
                value={rol.horasDia}
                onChange={handleHorasChange}
                className="w-full h-2 rounded-full accent-primary bg-muted appearance-none cursor-pointer"
              />
            </div>
          </>
        )}
      </div>
      
      {/* Resumen del rol */}
      <div className="mt-8 pt-4 border-t border-border">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <p className="text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary dark:text-accent" /> 
              {rol.diasSemana} días por semana
            </p>
            <p className="text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary dark:text-accent" /> 
              {rol.horasDia} horas por día
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <p className="text-muted-foreground flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary dark:text-accent" /> 
              {totalGuardias} guardias requeridos
            </p>
            <p className="text-muted-foreground flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary dark:text-accent" /> 
              {rol.precioFijo ? "Precio fijo" : "Precio personalizado"}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end items-center mt-4 pt-4 border-t border-border">
          <span className="text-xl font-bold text-foreground">
            ${formatearPrecio(costoTotal)} CLP
          </span>
        </div>
      </div>
    </motion.div>
  );
} 