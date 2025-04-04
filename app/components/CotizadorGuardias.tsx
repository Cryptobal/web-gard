"use client";

/* 
🔧 Reglas de interpretación de turnos Gard Security

- 7 días, 12h → turno 4x4 → 2 guardias por puesto
- 5 días, 12h → turno 5x2 → 1 guardia → $1.452.000 por puesto
- ≤2 días, ≤4h → 2x5 part-time → $350.000 sueldo líquido → $662.000 venta

Variables:
- factorCostos = 0.74
- utilidad = 13%
- semanasPorMes = 4.33
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Calendar, 
  PlusCircle, 
  Trash2, 
  Info, 
  Send,
  ChevronRight,
  Building,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Role {
  id: string;
  puestos: number;
  horasDia: number;
  diasSemana: number;
  sueldoLiquido: number;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
}

// Constantes para los cálculos
const FACTOR_COSTOS = 0.74;
const UTILIDAD = 0.13;
const SEMANAS_POR_MES = 4.33;

// Constantes para los precios fijos
const PRECIO_TURNO_5X2 = 1452000; // Precio fijo para turno 5x2
const PRECIO_TURNO_2X5_PARCIAL = 662000; // Precio fijo para turno parcial
const SUELDO_TURNO_2X5_PARCIAL = 350000; // Sueldo líquido para turno parcial

// Función para determinar el tipo de turno según los parámetros
const determinarTipoTurno = (dias: number, horas: number): { 
  tipo: string, 
  multiplicadorGuardias: number,
  precioFijo: number | null,
  sueldoRecomendado: number | null,
  descripcion: string
} => {
  // Turno 4x4 (día o noche)
  if (dias === 7 && horas === 12) {
    return {
      tipo: 'Turno 4x4',
      multiplicadorGuardias: 2,  // Requiere 2 guardias por puesto
      precioFijo: null,
      sueldoRecomendado: 600000,
      descripcion: '4 días trabajados x 4 días libres, requiere 2 guardias por puesto'
    };
  }
  
  // Turno 5x2 completo
  if (dias === 5 && horas === 12) {
    return {
      tipo: 'Turno 5x2 completo',
      multiplicadorGuardias: 1,
      precioFijo: PRECIO_TURNO_5X2,
      sueldoRecomendado: null,
      descripcion: 'Turno de lunes a viernes, jornada completa'
    };
  }
  
  // Turno 2x5 parcial
  if (dias <= 2 && horas <= 4) {
    return {
      tipo: 'Turno 2x5 parcial',
      multiplicadorGuardias: 1,
      precioFijo: PRECIO_TURNO_2X5_PARCIAL,
      sueldoRecomendado: SUELDO_TURNO_2X5_PARCIAL,
      descripcion: 'Jornada parcial, pocos días a la semana'
    };
  }
  
  // Otra configuración personalizada
  return {
    tipo: 'Personalizado',
    multiplicadorGuardias: 1,
    precioFijo: null,
    sueldoRecomendado: null,
    descripcion: 'Configuración personalizada según necesidades específicas'
  };
};

// Esta lógica está oculta del cliente
const calcularCostoRole = (role: Role): number => {
  const tipoTurno = determinarTipoTurno(role.diasSemana, role.horasDia);
  
  // Si tiene precio fijo, usar ese valor
  if (tipoTurno.precioFijo) {
    return tipoTurno.precioFijo * role.puestos;
  }
  
  // Si es turno 4x4, considerar 2 guardias por puesto
  const guardiasTotales = role.puestos * tipoTurno.multiplicadorGuardias;
  
  // Cálculo estándar
  const costo = role.sueldoLiquido * (1 + FACTOR_COSTOS);
  const precioFinalPorGuardia = costo * (1 + UTILIDAD);
  
  return precioFinalPorGuardia * guardiasTotales;
};

const CotizadorGuardias: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      puestos: 1,
      horasDia: 8,
      diasSemana: 5,
      sueldoLiquido: 600000
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    empresa: ''
  });
  const [costoTotal, setCostoTotal] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [tiposTurno, setTiposTurno] = useState<{[key: string]: any}>({});

  // Calcular el costo total cuando cambian los roles
  useEffect(() => {
    const total = roles.reduce((sum, role) => {
      return sum + calcularCostoRole(role);
    }, 0);
    
    // Actualizar los tipos de turno para cada rol
    const nuevosTiposTurno: {[key: string]: any} = {};
    roles.forEach(role => {
      nuevosTiposTurno[role.id] = determinarTipoTurno(role.diasSemana, role.horasDia);
      
      // Actualizar automáticamente el sueldo recomendado si está disponible y es turno parcial
      if (nuevosTiposTurno[role.id].sueldoRecomendado && nuevosTiposTurno[role.id].tipo === 'Turno 2x5 parcial') {
        updateRole(role.id, 'sueldoLiquido', nuevosTiposTurno[role.id].sueldoRecomendado);
      }
    });
    setTiposTurno(nuevosTiposTurno);
    
    setCostoTotal(total);
  }, [roles]);

  // Agregar un nuevo rol
  const addRole = () => {
    setRoles([
      ...roles,
      {
        id: Date.now().toString(),
        puestos: 1,
        horasDia: 8,
        diasSemana: 5,
        sueldoLiquido: 600000
      }
    ]);
  };

  // Actualizar valores de un rol
  const updateRole = (id: string, field: keyof Role, value: number) => {
    setRoles(roles.map(role => 
      role.id === id ? { ...role, [field]: value } : role
    ));
  };

  // Eliminar un rol
  const removeRole = (id: string) => {
    if (roles.length > 1) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  // Manejar cambios en el formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preparar los datos para enviar
    const cotizacionData = {
      ...formData,
      roles: roles.map(role => ({
        puestos: role.puestos,
        horasDia: role.horasDia,
        diasSemana: role.diasSemana,
        sueldoLiquido: role.sueldoLiquido,
        tipoTurno: determinarTipoTurno(role.diasSemana, role.horasDia).tipo,
        costoEstimado: calcularCostoRole(role)
      })),
      costoTotal
    };
    
    // Imprimir por consola (como solicitado)
    console.log('Datos de cotización:', cotizacionData);
    
    // Función para integración futura con webhook
    enviarACotizacion(cotizacionData);
    
    // Resetear formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      empresa: ''
    });
    setShowForm(false);
  };

  // Función para futura integración con Make/webhook
  const enviarACotizacion = (data: any) => {
    // Esta función queda preparada para implementar la integración con Make
    console.log('Preparado para enviar a webhook:', data);
    // Aquí iría el código para enviar a Make/webhook
  };

  const formatearPrecio = (valor: number) => {
    return valor.toLocaleString('es-CL');
  };

  return (
    <section className="gard-section w-full py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="gard-container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-2 font-title text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Calculadora de Costos
          </h2>
          <p className="text-body-base md:text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Personalice los parámetros según sus necesidades para obtener un estimado del costo mensual de su servicio de guardias.
          </p>
        </motion.div>

        <div className="grid gap-10">
          <AnimatePresence>
            {roles.map((role, index) => {
              const tipoTurno = tiposTurno[role.id] || determinarTipoTurno(role.diasSemana, role.horasDia);
              
              return (
                <motion.div
                  key={role.id}
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
                      {tipoTurno && (
                        <div className="mt-2 flex items-center">
                          <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent rounded-full text-sm font-medium">
                            {tipoTurno.tipo}
                          </span>
                          <span className="ml-2 text-sm text-muted-foreground">{tipoTurno.descripcion}</span>
                        </div>
                      )}
                    </div>
                    {roles.length > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeRole(role.id)}
                        className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        aria-label="Eliminar rol"
                      >
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </motion.button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
                    {/* Slider para Puestos */}
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <label htmlFor={`puestos-${role.id}`} className="text-base font-medium flex items-center text-foreground">
                          <Users className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                          N° de puestos
                        </label>
                        <button
                          className="ml-2 p-1 rounded-full hover:bg-muted"
                          aria-label="Información sobre puestos"
                          onMouseEnter={() => setTooltipVisible(`puestos-${role.id}`)}
                          onMouseLeave={() => setTooltipVisible(null)}
                          onTouchStart={() => setTooltipVisible(`puestos-${role.id}`)}
                          onTouchEnd={() => setTooltipVisible(null)}
                        >
                          <Info className="h-4 w-4 text-primary dark:text-accent" />
                        </button>
                        
                        {tooltipVisible === `puestos-${role.id}` && (
                          <div className="absolute z-20 bg-popover text-popover-foreground p-4 rounded-xl shadow-xl max-w-xs mt-2 text-sm transform translate-y-8 -translate-x-4">
                            "Puestos de seguridad" se refiere a cuántos guardias necesitas <strong>en simultáneo</strong>, en ese lugar, durante el horario definido.
                            <br /><br />
                            Ejemplo: Si necesitas 2 guardias en la entrada principal al mismo tiempo, eso son 2 puestos.
                            {tipoTurno && tipoTurno.multiplicadorGuardias > 1 && (
                              <><br /><br />
                              <strong>Nota:</strong> El turno {tipoTurno.tipo} requiere {tipoTurno.multiplicadorGuardias} guardias por cada puesto para cubrir la jornada completa.
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">1</span>
                        <span className="text-xl font-semibold text-primary dark:text-accent">{role.puestos}</span>
                        <span className="text-sm text-muted-foreground">10</span>
                      </div>
                      
                      <input
                        id={`puestos-${role.id}`}
                        type="range"
                        min="1"
                        max="10"
                        value={role.puestos}
                        onChange={(e) => updateRole(role.id, 'puestos', parseInt(e.target.value))}
                        className="w-full h-2 rounded-full accent-primary bg-muted appearance-none cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground md:hidden">
                        Guardias simultáneos en un mismo puesto.
                      </p>
                    </div>

                    {/* Slider para Horas por día */}
                    <div className="space-y-4">
                      <label htmlFor={`horas-${role.id}`} className="text-base font-medium flex items-center text-foreground">
                        <Clock className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                        Horas por día
                      </label>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">1</span>
                        <span className="text-xl font-semibold text-primary dark:text-accent">{role.horasDia}</span>
                        <span className="text-sm text-muted-foreground">24</span>
                      </div>
                      
                      <input
                        id={`horas-${role.id}`}
                        type="range"
                        min="1"
                        max="24"
                        value={role.horasDia}
                        onChange={(e) => updateRole(role.id, 'horasDia', parseInt(e.target.value))}
                        className="w-full h-2 rounded-full accent-primary bg-muted appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Slider para Días por semana */}
                    <div className="space-y-4">
                      <label htmlFor={`dias-${role.id}`} className="text-base font-medium flex items-center text-foreground">
                        <Calendar className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                        Días por semana
                      </label>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">1</span>
                        <span className="text-xl font-semibold text-primary dark:text-accent">{role.diasSemana}</span>
                        <span className="text-sm text-muted-foreground">7</span>
                      </div>
                      
                      <input
                        id={`dias-${role.id}`}
                        type="range"
                        min="1"
                        max="7"
                        value={role.diasSemana}
                        onChange={(e) => updateRole(role.id, 'diasSemana', parseInt(e.target.value))}
                        className="w-full h-2 rounded-full accent-primary bg-muted appearance-none cursor-pointer"
                      />
                    </div>
                    
                    {/* Slider para Sueldo líquido (deshabilitado si el tipo de turno tiene precio fijo) */}
                    <div className="space-y-4">
                      <label htmlFor={`sueldo-${role.id}`} className="text-base font-medium flex items-center text-foreground">
                        <DollarSign className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                        Sueldo líquido (CLP)
                      </label>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">$500K</span>
                        <span className="text-xl font-semibold text-primary dark:text-accent">${formatearPrecio(role.sueldoLiquido)}</span>
                        <span className="text-sm text-muted-foreground">$1.2M</span>
                      </div>
                      
                      <input
                        id={`sueldo-${role.id}`}
                        type="range"
                        min="500000"
                        max="1200000"
                        step="10000"
                        value={role.sueldoLiquido}
                        onChange={(e) => updateRole(role.id, 'sueldoLiquido', parseInt(e.target.value))}
                        disabled={tipoTurno && tipoTurno.precioFijo !== null}
                        className={cn(
                          "w-full h-2 rounded-full accent-primary bg-muted appearance-none cursor-pointer",
                          tipoTurno && tipoTurno.precioFijo !== null && "opacity-50 cursor-not-allowed"
                        )}
                      />
                      {tipoTurno && tipoTurno.precioFijo !== null && (
                        <p className="text-xs text-primary/70 dark:text-accent/70 italic">
                          El sueldo está predeterminado para {tipoTurno.tipo}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-base text-muted-foreground">
                        Costo estimado para {role.puestos} {role.puestos > 1 ? 'puestos' : 'puesto'}
                        {tipoTurno && tipoTurno.multiplicadorGuardias > 1 ? ` (${role.puestos * tipoTurno.multiplicadorGuardias} guardias)` : ''}:
                      </span>
                      <span className="text-xl font-bold text-foreground">
                        ${formatearPrecio(calcularCostoRole(role))} CLP
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <motion.button
            onClick={addRole}
            className="gard-btn flex items-center justify-center py-4 px-5 rounded-2xl bg-muted hover:bg-muted/80 text-foreground transition-colors w-full md:w-auto mx-auto"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <PlusCircle className="h-5 w-5 mr-3 text-primary dark:text-accent" />
            Agregar otro rol operativo
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="gard-card bg-primary/5 dark:bg-primary/10 rounded-3xl p-10 shadow-lg mt-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Resumen de Costos
            </h3>
            
            <div className="flex flex-col items-center gap-6">
              <motion.div 
                className="flex flex-col items-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <p className="text-lg text-muted-foreground mb-2">Costo mensual estimado:</p>
                <p className="text-4xl md:text-5xl font-bold text-primary dark:text-accent">
                  ${formatearPrecio(costoTotal)} CLP
                </p>
              </motion.div>
              
              <motion.button
                onClick={() => setShowForm(true)}
                className="gard-btn rounded-2xl py-4 px-8 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors flex items-center mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar Cotización
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Formulario de contacto */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card dark:bg-gray-800 rounded-3xl p-8 shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Complete sus datos
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nombre" className="text-base font-medium text-foreground block mb-2">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="text-base font-medium text-foreground block mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telefono" className="text-base font-medium text-foreground block mb-2">
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="empresa" className="text-base font-medium text-foreground block mb-2">
                      Empresa (opcional)
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        id="empresa"
                        name="empresa"
                        type="text"
                        value={formData.empresa}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <motion.button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="py-3 px-5 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Cancelar
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="py-3 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors flex items-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Enviar
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CotizadorGuardias; 