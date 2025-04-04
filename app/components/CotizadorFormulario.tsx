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

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Calendar, 
  Info, 
  Send,
  ChevronRight,
  Building,
  DollarSign,
  MessageSquare,
  Briefcase,
  MapPin,
  CheckCircle,
  Repeat,
  FileText,
  ChevronDown,
  Mail,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Declaración global para Google Maps API
declare global {
  interface Window {
    google: any;
  }
}

interface RoleData {
  puestos: number;
  horasDia: number;
  diasSemana: number;
  sueldoLiquido: number;
}

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  empresa: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  rubro: string;
  comentarios: string;
}

// Lista de rubros disponibles para el select
const RUBROS = [
  'Comercio Retail',
  'Industrial',
  'Farmacéutico',
  'Logística',
  'Educación',
  'Corporativo',
  'Construcción',
  'Salud',
  'Centros Comerciales',
  'Hotelería',
  'Minería',
  'Tecnología',
  'Financiero',
  'Inmobiliario',
  'Energía',
  'Transporte',
  'Otro'
];

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

// Función para calcular el costo según la configuración
const calcularCosto = (role: RoleData): {
  costo: number,
  guardiasRequeridos: number,
  tipoTurno: ReturnType<typeof determinarTipoTurno>
} => {
  const tipoTurno = determinarTipoTurno(role.diasSemana, role.horasDia);
  
  // Si tiene precio fijo, usar ese valor
  if (tipoTurno.precioFijo) {
    return {
      costo: tipoTurno.precioFijo * role.puestos,
      guardiasRequeridos: role.puestos * tipoTurno.multiplicadorGuardias,
      tipoTurno
    };
  }
  
  // Si es turno 4x4, considerar 2 guardias por puesto
  const guardiasTotales = role.puestos * tipoTurno.multiplicadorGuardias;
  
  // Cálculo estándar
  const costo = role.sueldoLiquido * (1 + FACTOR_COSTOS);
  const precioFinalPorGuardia = costo * (1 + UTILIDAD);
  
  return {
    costo: precioFinalPorGuardia * guardiasTotales,
    guardiasRequeridos: guardiasTotales,
    tipoTurno
  };
};

const formatearPrecio = (valor: number) => {
  return valor.toLocaleString('es-CL');
};

/**
 * Componente principal CotizadorFormulario
 * Permite simular costos de guardias de seguridad y solicitar una cotización personalizada
 */
const CotizadorFormulario: React.FC = () => {
  // Estados principales
  const [roleData, setRoleData] = useState<RoleData>({
    puestos: 1,
    horasDia: 8,
    diasSemana: 5,
    sueldoLiquido: 600000
  });
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    direccion: '',
    comuna: '',
    ciudad: '',
    rubro: RUBROS[0],
    comentarios: ''
  });
  
  // Estados adicionales
  const [costoResult, setCostoResult] = useState<{
    costo: number,
    guardiasRequeridos: number,
    tipoTurno: ReturnType<typeof determinarTipoTurno>
  }>({
    costo: 0,
    guardiasRequeridos: 0,
    tipoTurno: determinarTipoTurno(5, 8)
  });
  
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isRubroOpen, setIsRubroOpen] = useState(false);

  // Estados para Google Maps
  const [mapLoaded, setMapLoaded] = useState(false);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);

  // Cargar Google Maps API
  useEffect(() => {
    // Cargar Google Maps API
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBHIoHJDp6StLJlUAQV_gK7woFsEYgbzHY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  // Inicializar autocompletado cuando la API esté cargada
  useEffect(() => {
    if (mapLoaded && autocompleteInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'cl' }
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        if (!place.geometry) return;

        // Extraer dirección, comuna y ciudad de los componentes
        let direccion = '';
        let comuna = '';
        let ciudad = '';

        for (const component of place.address_components) {
          const componentType = component.types[0];

          if (componentType === 'route') {
            direccion = (direccion ? direccion + ' ' : '') + component.long_name;
          } else if (componentType === 'street_number') {
            direccion = (direccion ? direccion + ' ' : '') + component.long_name;
          } else if (componentType === 'locality') {
            ciudad = component.long_name;
          } else if (componentType === 'administrative_area_level_3' || componentType === 'sublocality_level_1') {
            comuna = component.long_name;
          }
        }

        setFormData(prev => ({
          ...prev,
          direccion: direccion || place.formatted_address || '',
          comuna,
          ciudad
        }));
      });
    }
  }, [mapLoaded]);

  // Recalcular el costo cuando cambian los parámetros
  useEffect(() => {
    const result = calcularCosto(roleData);
    setCostoResult(result);
    
    // Si detecta un turno con sueldo recomendado, actualizarlo
    if (result.tipoTurno.sueldoRecomendado) {
      setRoleData(prev => ({
        ...prev,
        sueldoLiquido: result.tipoTurno.sueldoRecomendado!
      }));
    }
  }, [roleData.puestos, roleData.horasDia, roleData.diasSemana]);

  // Actualizar valores de los sliders
  const updateRoleData = (field: keyof RoleData, value: number) => {
    setRoleData(prev => ({ ...prev, [field]: value }));
  };

  // Manejar cambios en el formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error si el campo tiene valor
    if (value && formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Seleccionar un rubro del dropdown
  const handleRubroSelect = (rubro: string) => {
    setFormData(prev => ({ ...prev, rubro }));
    setIsRubroOpen(false);
    
    // Limpiar error si se selecciona un rubro
    if (formErrors.rubro) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.rubro;
        return newErrors;
      });
    }
  };

  // Validar formulario
  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    const requiredFields: Array<keyof FormData> = ['nombre', 'apellido', 'email', 'telefono', 'empresa', 'direccion', 'rubro'];
    
    // Verificar campos requeridos
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = `El campo ${field} es requerido`;
      }
    });
    
    // Validar email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }
    
    // Validar teléfono (debe tener exactamente 9 dígitos y ser obligatorio)
    const phoneDigits = formData.telefono.replace(/\D/g, '');
    if (!formData.telefono || phoneDigits.length !== 9) {
      errors.telefono = 'El teléfono celular debe tener 9 dígitos';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Enviar datos al webhook
  const enviarFormulario = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Preparar datos para enviar
      const dataToSend = {
        ...formData,
        configuracion: {
          puestos: roleData.puestos,
          horasDia: roleData.horasDia,
          diasSemana: roleData.diasSemana,
          sueldoLiquido: roleData.sueldoLiquido,
          tipoTurno: costoResult.tipoTurno.tipo,
          costoEstimado: costoResult.costo,
          guardiasRequeridos: costoResult.guardiasRequeridos
        },
        detalleCotizador: {
          detalleRolOperativo: {
            tipoTurno: costoResult.tipoTurno.tipo,
            horario: `${roleData.horasDia} horas por día`,
            diasPorSemana: roleData.diasSemana,
            sueldoLiquido: roleData.sueldoLiquido
          },
          valorCotizacion: costoResult.costo
        }
      };
      
      console.log('Enviando datos al webhook:', dataToSend);
      
      // Enviar al webhook
      const response = await fetch('https://hook.us1.make.com/c99tyreyliv9ss27qfpn5rpwoonj7s5j', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        // Resetear formulario después de envío exitoso
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          empresa: '',
          direccion: '',
          comuna: '',
          ciudad: '',
          rubro: RUBROS[0],
          comentarios: ''
        });
      } else {
        console.error('Error al enviar formulario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="gard-section w-full py-16 md:py-24 bg-gray-900 text-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-2 font-title text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Cotiza tu servicio de seguridad en segundos
          </h2>
          <p className="text-body-base md:text-body-lg text-gray-300 max-w-2xl mx-auto">
            Simula tus necesidades y recibe una estimación en tiempo real.
          </p>
        </motion.div>

        {/* Calculadora */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="gard-card bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
        >
          {/* Tipo de turno */}
          <div className="flex flex-col mb-8">
            <div className="flex items-center justify-center">
              <span className="px-4 py-2 bg-blue-900/60 text-orange-500 rounded-full text-base font-medium flex items-center">
                <Repeat className="h-5 w-5 mr-2" />
                {costoResult.tipoTurno.tipo}
                <span className="ml-2 text-sm text-gray-300 hidden md:inline">
                  {costoResult.tipoTurno.descripcion}
                </span>
              </span>
            </div>
            <p className="text-sm text-center text-gray-300 mt-2 md:hidden">
              {costoResult.tipoTurno.descripcion}
            </p>
          </div>

          {/* Sliders para configuración */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
            {/* Slider para Puestos */}
            <div className="space-y-5">
              <div className="flex items-center">
                <label htmlFor="puestos" className="text-base font-medium flex items-center text-white">
                  <Users className="h-5 w-5 mr-2 text-orange-500" />
                  N° de puestos
                </label>
                <button
                  className="ml-2 p-1 rounded-full hover:bg-gray-700"
                  aria-label="Información sobre puestos"
                  onMouseEnter={() => setTooltipVisible("puestos")}
                  onMouseLeave={() => setTooltipVisible(null)}
                  onTouchStart={() => setTooltipVisible("puestos")}
                  onTouchEnd={() => setTooltipVisible(null)}
                >
                  <Info className="h-4 w-4 text-orange-500" />
                </button>
                
                {tooltipVisible === "puestos" && (
                  <div className="absolute z-20 bg-gray-700 text-white p-4 rounded-xl shadow-xl max-w-xs mt-2 text-sm transform translate-y-8 -translate-x-4 border border-gray-600">
                    "Puestos de seguridad" se refiere a cuántos guardias necesitas <strong>en simultáneo</strong>, en ese lugar, durante el horario definido.
                    <br /><br />
                    Ejemplo: Si necesitas 2 guardias en la entrada principal al mismo tiempo, eso son 2 puestos.
                  </div>
                )}
              </div>
              
              <div className="relative mt-8 mb-4">
                <input
                  id="puestos"
                  type="range"
                  min="1"
                  max="10"
                  value={roleData.puestos}
                  onChange={(e) => updateRoleData('puestos', parseInt(e.target.value))}
                  className="w-full h-2 bg-white dark:bg-white rounded-full appearance-none cursor-pointer"
                  style={{
                    '--value': `${(roleData.puestos - 1) / 9 * 100}%`,
                    background: `linear-gradient(to right, #f97316 0%, #f97316 var(--value), #e5e7eb var(--value), #e5e7eb 100%)`
                  } as React.CSSProperties}
                />
                <div className="relative flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>10</span>
                </div>
                <div 
                  className="absolute top-0 transform -translate-y-full"
                  style={{
                    left: `calc(${(roleData.puestos - 1) / 9 * 100}% - 15px)`,
                    transition: 'left 0.1s ease-out'
                  }}
                >
                  <div className="bg-orange-500 text-white rounded-full px-4 py-2 text-base font-semibold shadow-lg">
                    {roleData.puestos}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider para Horas por día */}
            <div className="space-y-5">
              <label htmlFor="horas" className="text-base font-medium flex items-center text-white">
                <Clock className="h-5 w-5 mr-2 text-orange-500" />
                Horas por día
              </label>
              
              <div className="relative mt-8 mb-4">
                <input
                  id="horas"
                  type="range"
                  min="1"
                  max="24"
                  value={roleData.horasDia}
                  onChange={(e) => updateRoleData('horasDia', parseInt(e.target.value))}
                  className="w-full h-2 bg-white dark:bg-white rounded-full appearance-none cursor-pointer"
                  style={{
                    '--value': `${(roleData.horasDia - 1) / 23 * 100}%`,
                    background: `linear-gradient(to right, #f97316 0%, #f97316 var(--value), #e5e7eb var(--value), #e5e7eb 100%)`
                  } as React.CSSProperties}
                />
                <div className="relative flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>24</span>
                </div>
                <div 
                  className="absolute top-0 transform -translate-y-full"
                  style={{
                    left: `calc(${(roleData.horasDia - 1) / 23 * 100}% - 15px)`,
                    transition: 'left 0.1s ease-out'
                  }}
                >
                  <div className="bg-orange-500 text-white rounded-full px-4 py-2 text-base font-semibold shadow-lg">
                    {roleData.horasDia}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider para Días por semana */}
            <div className="space-y-5">
              <label htmlFor="dias" className="text-base font-medium flex items-center text-white">
                <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                Días por semana
              </label>
              
              <div className="relative mt-8 mb-4">
                <input
                  id="dias"
                  type="range"
                  min="1"
                  max="7"
                  value={roleData.diasSemana}
                  onChange={(e) => updateRoleData('diasSemana', parseInt(e.target.value))}
                  className="w-full h-2 bg-white dark:bg-white rounded-full appearance-none cursor-pointer"
                  style={{
                    '--value': `${(roleData.diasSemana - 1) / 6 * 100}%`,
                    background: `linear-gradient(to right, #f97316 0%, #f97316 var(--value), #e5e7eb var(--value), #e5e7eb 100%)`
                  } as React.CSSProperties}
                />
                <div className="relative flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>7</span>
                </div>
                <div 
                  className="absolute top-0 transform -translate-y-full"
                  style={{
                    left: `calc(${(roleData.diasSemana - 1) / 6 * 100}% - 15px)`,
                    transition: 'left 0.1s ease-out'
                  }}
                >
                  <div className="bg-orange-500 text-white rounded-full px-4 py-2 text-base font-semibold shadow-lg">
                    {roleData.diasSemana}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slider para Sueldo líquido */}
            <div className="space-y-5">
              <label htmlFor="sueldo" className="text-base font-medium flex items-center text-white">
                <DollarSign className="h-5 w-5 mr-2 text-orange-500" />
                Sueldo líquido (CLP)
              </label>
              
              <div className="relative mt-8 mb-4">
                <input
                  id="sueldo"
                  type="range"
                  min="500000"
                  max="1200000"
                  step="10000"
                  value={roleData.sueldoLiquido}
                  onChange={(e) => updateRoleData('sueldoLiquido', parseInt(e.target.value))}
                  disabled={costoResult.tipoTurno && costoResult.tipoTurno.precioFijo !== null}
                  className={cn(
                    "w-full h-2 bg-white dark:bg-white rounded-full appearance-none cursor-pointer",
                    costoResult.tipoTurno && costoResult.tipoTurno.precioFijo !== null && "opacity-50 cursor-not-allowed"
                  )}
                  style={{
                    '--value': `${(roleData.sueldoLiquido - 500000) / 700000 * 100}%`,
                    background: `linear-gradient(to right, #f97316 0%, #f97316 var(--value), #e5e7eb var(--value), #e5e7eb 100%)`
                  } as React.CSSProperties}
                />
                <div className="relative flex justify-between text-xs text-gray-400 mt-1">
                  <span>$500K</span>
                  <span>$1.2M</span>
                </div>
                <div 
                  className="absolute top-0 transform -translate-y-full"
                  style={{
                    left: `calc(${(roleData.sueldoLiquido - 500000) / 700000 * 100}% - 40px)`,
                    transition: 'left 0.1s ease-out'
                  }}
                >
                  <div className="bg-orange-500 text-white rounded-full px-4 py-2 text-base font-semibold shadow-lg whitespace-nowrap">
                    ${formatearPrecio(roleData.sueldoLiquido)}
                  </div>
                </div>
                {costoResult.tipoTurno && costoResult.tipoTurno.precioFijo !== null && (
                  <p className="text-xs text-orange-500 italic mt-2">
                    El sueldo está predeterminado para {costoResult.tipoTurno.tipo}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Separador */}
          <div className="w-full h-px bg-gray-700 my-8"></div>

          {/* Resumen y precio */}
          <div className="mt-6">
            <div className="flex flex-col space-y-2">
              {/* Resumen visual */}
              <p className="text-gray-300 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-orange-500" /> 
                Estimación mensual
              </p>
              <p className="text-gray-300 flex items-center">
                <Users className="h-5 w-5 mr-2 text-orange-500" /> 
                Guardias requeridos: {costoResult.guardiasRequeridos}
              </p>
              <p className="text-gray-300 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-orange-500" /> 
                Puestos: {roleData.puestos}
              </p>
              <p className="text-gray-300 flex items-center">
                <Repeat className="h-5 w-5 mr-2 text-orange-500" /> 
                Turno: {costoResult.tipoTurno.tipo}
              </p>
            </div>
            
            {/* Costo estimado */}
            <div className="mt-8 text-center">
              <p className="text-xl text-gray-300 mb-2">Costo mensual estimado:</p>
              <motion.p 
                className="text-4xl md:text-5xl font-bold text-orange-500"
                key={costoResult.costo}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                ${formatearPrecio(costoResult.costo)} CLP
              </motion.p>
            </div>
            
            {/* Botón CTA */}
            <div className="flex flex-col items-center mt-10">
              <motion.button
                onClick={() => setShowForm(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-4 rounded-xl shadow-xl flex items-center justify-center w-full md:w-auto font-semibold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Solicitar Cotización Personalizada
              </motion.button>
              <p className="text-sm text-gray-400 mt-3">
                Recibe tu cotización en menos de 15 minutos en tu correo.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Modal de formulario */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-3xl p-8 shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {submitSuccess ? (
                  // Mensaje de éxito
                  <div className="text-center py-10">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-900/30 text-green-400 mb-6"
                    >
                      <CheckCircle className="h-10 w-10" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      ¡Solicitud enviada con éxito!
                    </h3>
                    <p className="text-gray-300 mb-8">
                      Hemos recibido tu información y te contactaremos a la brevedad para enviarte una cotización personalizada.
                    </p>
                    <motion.button
                      onClick={() => {
                        setShowForm(false);
                        setSubmitSuccess(false);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-medium"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Cerrar
                    </motion.button>
                  </div>
                ) : (
                  // Formulario de contacto
                  <>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      Solicitar Cotización Personalizada
                    </h3>
                    
                    <form onSubmit={(e) => { e.preventDefault(); enviarFormulario(); }} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Nombre */}
                      <div>
                        <label htmlFor="nombre" className="text-base font-medium text-white block mb-2 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-orange-500" />
                          Nombre *
                        </label>
                        <input
                          id="nombre"
                          name="nombre"
                          type="text"
                          required
                          placeholder="Ingrese su nombre"
                          value={formData.nombre}
                          onChange={handleFormChange}
                          className={cn(
                            "w-full rounded-xl border bg-gray-700 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 text-white placeholder:text-gray-400",
                            formErrors.nombre ? "border-red-500" : "border-gray-600"
                          )}
                        />
                        {formErrors.nombre && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.nombre}</p>
                        )}
                      </div>
                      
                      {/* Apellido */}
                      <div>
                        <label htmlFor="apellido" className="text-base font-medium text-white block mb-2 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-orange-500" />
                          Apellido *
                        </label>
                        <input
                          id="apellido"
                          name="apellido"
                          type="text"
                          required
                          placeholder="Ingrese su apellido"
                          value={formData.apellido}
                          onChange={handleFormChange}
                          className={cn(
                            "w-full rounded-xl border bg-gray-700 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 text-white placeholder:text-gray-400",
                            formErrors.apellido ? "border-red-500" : "border-gray-600"
                          )}
                        />
                        {formErrors.apellido && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.apellido}</p>
                        )}
                      </div>
                      
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="text-base font-medium text-white block mb-2 flex items-center">
                          <Mail className="h-5 w-5 mr-2 text-orange-500" />
                          Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="correo@ejemplo.com"
                          value={formData.email}
                          onChange={handleFormChange}
                          className={cn(
                            "w-full rounded-xl border bg-gray-700 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 text-white placeholder:text-gray-400",
                            formErrors.email ? "border-red-500" : "border-gray-600"
                          )}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                        )}
                      </div>
                      
                      {/* Teléfono */}
                      <div>
                        <label htmlFor="telefono" className="text-base font-medium text-white block mb-2 flex items-center">
                          <Phone className="h-5 w-5 mr-2 text-orange-500" />
                          Celular *
                        </label>
                        <input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          required
                          placeholder="9 dígitos"
                          value={formData.telefono}
                          onChange={handleFormChange}
                          className={cn(
                            "w-full rounded-xl border bg-gray-700 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 text-white placeholder:text-gray-400",
                            formErrors.telefono ? "border-red-500" : "border-gray-600"
                          )}
                        />
                        {formErrors.telefono && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.telefono}</p>
                        )}
                      </div>
                      
                      {/* Empresa */}
                      <div>
                        <label htmlFor="empresa" className="text-base font-medium text-white block mb-2 flex items-center">
                          <Building className="h-5 w-5 mr-2 text-orange-500" />
                          Empresa *
                        </label>
                        <input
                          id="empresa"
                          name="empresa"
                          type="text"
                          required
                          placeholder="Nombre de la empresa"
                          value={formData.empresa}
                          onChange={handleFormChange}
                          className={cn(
                            "w-full rounded-xl border bg-gray-700 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 text-white placeholder:text-gray-400",
                            formErrors.empresa ? "border-red-500" : "border-gray-600"
                          )}
                        />
                        {formErrors.empresa && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.empresa}</p>
                        )}
                      </div>
                      
                      {/* Dirección con Google Maps */}
                      <div className="md:col-span-2">
                        <label htmlFor="direccion" className="text-base font-medium text-white block mb-2 flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                          Dirección de empresa *
                        </label>
                        <input
                          id="direccion"
                          name="direccion"
                          type="text"
                          ref={autocompleteInputRef}
                          required
                          placeholder="Buscar dirección..."
                          value={formData.direccion}
                          onChange={handleFormChange}
                          className={cn(
                            "w-full rounded-xl border bg-gray-700 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 text-white placeholder:text-gray-400",
                            formErrors.direccion ? "border-red-500" : "border-gray-600"
                          )}
                        />
                        {formErrors.direccion && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.direccion}</p>
                        )}
                      </div>
                      
                      {/* Comuna (autocompletado por Google Maps) */}
                      <div>
                        <label htmlFor="comuna" className="text-base font-medium text-white block mb-2 flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                          Comuna
                        </label>
                        <input
                          id="comuna"
                          name="comuna"
                          type="text"
                          readOnly
                          placeholder="Se completa automáticamente"
                          value={formData.comuna}
                          className="w-full rounded-xl border border-gray-600 bg-gray-700/70 px-4 py-3 text-base text-white placeholder:text-gray-400 cursor-not-allowed"
                        />
                      </div>
                      
                      {/* Ciudad (autocompletado por Google Maps) */}
                      <div>
                        <label htmlFor="ciudad" className="text-base font-medium text-white block mb-2 flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                          Ciudad
                        </label>
                        <input
                          id="ciudad"
                          name="ciudad"
                          type="text"
                          readOnly
                          placeholder="Se completa automáticamente"
                          value={formData.ciudad}
                          className="w-full rounded-xl border border-gray-600 bg-gray-700/70 px-4 py-3 text-base text-white placeholder:text-gray-400 cursor-not-allowed"
                        />
                      </div>
                      
                      {/* Rubro */}
                      <div>
                        <label htmlFor="rubro" className="text-base font-medium text-white block mb-2 flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-orange-500" />
                          Rubro *
                        </label>
                        <div className="relative">
                          <div
                            className={cn(
                              "w-full rounded-xl border bg-gray-700 px-4 py-3 text-base focus-visible:outline-none cursor-pointer flex items-center justify-between text-white",
                              isRubroOpen ? "ring-2 ring-orange-500" : "",
                              formErrors.rubro ? "border-red-500" : "border-gray-600"
                            )}
                            onClick={() => setIsRubroOpen(!isRubroOpen)}
                          >
                            <span className={formData.rubro ? "text-white" : "text-gray-400"}>
                              {formData.rubro || "Seleccione un rubro"}
                            </span>
                            <ChevronDown className={`h-5 w-5 transition-transform ${isRubroOpen ? 'rotate-180' : ''}`} />
                          </div>
                          
                          {isRubroOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-xl shadow-xl max-h-60 overflow-auto">
                              {RUBROS.map((rubro) => (
                                <div
                                  key={rubro}
                                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white"
                                  onClick={() => handleRubroSelect(rubro)}
                                >
                                  {rubro}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {formErrors.rubro && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.rubro}</p>
                        )}
                      </div>
                      
                      {/* Comentarios */}
                      <div className="md:col-span-2">
                        <label htmlFor="comentarios" className="text-base font-medium text-white block mb-2 flex items-center">
                          <MessageSquare className="h-5 w-5 mr-2 text-orange-500" />
                          Comentarios
                        </label>
                        <div className="relative">
                          <textarea
                            id="comentarios"
                            name="comentarios"
                            rows={4}
                            placeholder="Información adicional relevante para su cotización"
                            value={formData.comentarios}
                            onChange={handleFormChange}
                            className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 text-white placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      
                      {/* Botones de acción */}
                      <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
                        <motion.button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="py-3 px-5 rounded-xl bg-gray-600 hover:bg-gray-500 text-white transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Cancelar
                        </motion.button>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="py-3 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors flex items-center font-semibold"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Enviar Solicitud
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CotizadorFormulario; 