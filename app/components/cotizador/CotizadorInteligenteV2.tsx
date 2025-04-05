// 🧠 Cotizador Inteligente V2
// ✨ Componente minimalista, visual y estéticamente premium
// 🎯 Diseño en bloque unificado con UX fluido y profesional

"use client";

import { useState, useEffect, useRef, type RefCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Clock, 
  PlusCircle, 
  Trash2, 
  Copy,
  DollarSign,
  MoreVertical,
  Calendar,
  Send,
  ChevronRight,
  Minus,
  Plus,
  HelpCircle,
  Sun,
  Moon,
  Clock8,
  Building,
  Mail,
  Phone,
  MapPin,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  RolOperativo,
  TipoTurno,
  TipoHorario,
  crearNuevoRol,
  calcularCostoRol,
  calcularTotalGuardias,
  formatearPrecio,
  actualizarConfiguracionTurno,
  CONFIGURACIONES_TURNOS,
  RANGOS_SALARIALES
} from '@/lib/calculadora-costos';
import { Loader } from '@googlemaps/js-api-loader';
import API_URLS from '@/app/config/api';

// Opciones predefinidas para los controles de selección
const OPCIONES_TIPO_TURNO: TipoTurno[] = ['2x5', '5x2', '4x4', '7x7', '14x14'];
const OPCIONES_HORARIO: TipoHorario[] = ['Día', 'Noche', '24 horas'];

// Interfaz para el Tooltip
interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

// Componente Tooltip reutilizable
function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div 
        className="cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </div>
      
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-50 w-60 bg-popover text-popover-foreground rounded-lg p-3 shadow-xl text-sm left-1/2 transform -translate-x-1/2 mt-1 backdrop-blur-sm"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
}

// Interfaz para los datos de formulario
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

// Lista de rubros disponibles
const rubros = [
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

export default function CotizadorInteligenteV2() {
  // Estado para los roles operativos
  const [roles, setRoles] = useState<RolOperativo[]>([
    crearNuevoRol('1', '4x4')
  ]);
  
  // Estado para el rol seleccionado (para acciones)
  const [rolActivo, setRolActivo] = useState<string | null>(null);
  
  // Estado para el costo total
  const [costoTotal, setCostoTotal] = useState(0);
  
  // Estado para el modal de solicitud
  const [showForm, setShowForm] = useState(false);
  
  // Estado para el formulario
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    direccion: '',
    comuna: '',
    ciudad: '',
    rubro: rubros[0],
    comentarios: ''
  });
  
  // Estado para errores del formulario y envío
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Estados para Google Maps
  const [mapLoaded, setMapLoaded] = useState(false);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [autocompleteInitialized, setAutocompleteInitialized] = useState(false);

  // Crear una ref callback que pueda ser usada directamente
  const autocompleteRef: RefCallback<HTMLInputElement> = (element) => {
    autocompleteInputRef.current = element;
  };

  // Cargar la API de Google Maps
  useEffect(() => {
    // Solo cargar la API si no está ya cargada
    if (window.google?.maps?.places) {
      console.log('Google Maps API ya está cargada');
      setMapLoaded(true);
      return;
    }

    // Carga de la API de Google Maps
    const loader = new Loader({
      apiKey: 'AIzaSyBHIoHJDp6StLJlUAQV_gK7woFsEYgbzHY',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      console.log('Google Maps API cargada correctamente');
      setMapLoaded(true);
    }).catch(error => {
      console.error('Error cargando Google Maps API:', error);
    });
  }, []);

  // Solo inicializar el autocompletado cuando el modal esté visible
  useEffect(() => {
    // Si el modal no está visible, no inicializar
    if (!showForm) {
      return;
    }

    // Inicializar autocompletado cuando el modal está visible
    if (mapLoaded && autocompleteInputRef.current && !autocompleteInitialized) {
      try {
        console.log('Intentando inicializar autocompletado en dirección');
        
        // Pequeña pausa para asegurar que el DOM está listo
        setTimeout(() => {
          const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current!, {
            types: ['address'],
            componentRestrictions: { country: 'cl' },
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.address_components) return;

            setFormData(prev => ({
              ...prev,
              direccion: place.formatted_address || ''
            }));

            // Extraer comuna y ciudad
            let comuna = '';
            let ciudad = '';

            place.address_components.forEach((component: any) => {
              const types = component.types;
              
              if (types.includes('locality')) {
                ciudad = component.long_name;
              }
              
              if (types.includes('administrative_area_level_3') || 
                  types.includes('sublocality_level_1') || 
                  types.includes('sublocality')) {
                comuna = component.long_name;
              }
            });

            setFormData(prev => ({
              ...prev,
              comuna,
              ciudad
            }));

            console.log('Lugar seleccionado:', place.formatted_address);
            console.log('Comuna extraída:', comuna);
            console.log('Ciudad extraída:', ciudad);
          });

          setAutocompleteInitialized(true);
          console.log('Autocompletado inicializado correctamente');
        }, 500);
      } catch (error) {
        console.error('Error al inicializar autocompletado:', error);
      }
    }
  }, [mapLoaded, showForm, autocompleteInitialized]);

  // Resetear el estado de inicialización cuando se cierra el modal
  useEffect(() => {
    if (!showForm) {
      setAutocompleteInitialized(false);
    }
  }, [showForm]);

  // Mantener la función handleDireccionChange como fallback
  const handleDireccionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, direccion: value }));
    
    // Si Google Maps falla, seguir usando la separación manual por comas
    if ((!mapLoaded || !autocompleteInitialized) && value.includes(',')) {
      const parts = value.split(',').map(part => part.trim());
      
      if (parts.length >= 2) {
        const ciudad = parts[parts.length - 1];
        
        if (parts.length >= 3) {
          const comuna = parts[parts.length - 2];
          setFormData(prev => ({ ...prev, ciudad, comuna }));
        } else {
          setFormData(prev => ({ ...prev, ciudad }));
        }
      }
    }
    
    // Limpiar error si el campo tiene valor
    if (value && formErrors.direccion) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.direccion;
        return newErrors;
      });
    }
  };
  
  // Calcular el costo total cuando cambian los roles
  useEffect(() => {
    const total = roles.reduce((sum, role) => {
      return sum + calcularCostoRol(role);
    }, 0);
    
    setCostoTotal(total);
  }, [roles]);
  
  // Funciones para manejar roles
  const addRole = () => {
    setRoles([
      ...roles,
      crearNuevoRol(Date.now().toString(), '4x4')
    ]);
  };
  
  const updateRole = (id: string, updatedRole: RolOperativo) => {
    setRoles(roles.map(role => 
      role.id === id ? updatedRole : role
    ));
  };
  
  const removeRole = (id: string) => {
    if (roles.length > 1) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };
  
  const duplicateRole = (id: string) => {
    const rolToDuplicate = roles.find(role => role.id === id);
    if (rolToDuplicate) {
      const newRol = {
        ...rolToDuplicate,
        id: Date.now().toString()
      };
      setRoles([...roles, newRol]);
    }
  };
  
  // Función para manejar cambios en el formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiar error si el campo tiene valor
    if (value && formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validar formulario
  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    const requiredFields: Array<keyof FormData> = ['nombre', 'apellido', 'email', 'telefono', 'empresa', 'direccion'];
    
    // Verificar campos requeridos
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = `Este campo es requerido`;
      }
    });
    
    // Validar email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }
    
    // Validar teléfono (debe tener exactamente 9 dígitos)
    const phoneDigits = formData.telefono.replace(/\D/g, '');
    if (!formData.telefono || phoneDigits.length !== 9) {
      errors.telefono = 'El teléfono debe tener 9 dígitos';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Generar el formato de texto para rolesSolicitados
      const rolesSolicitados = roles.map(rol => {
        const costoEstimado = calcularCostoRol(rol);
        return `🛡️ Turno ${rol.tipoTurno} | ${rol.horario} | ${rol.puestos} puesto(s) | ${rol.diasSemana} días/semana | ${rol.horasDia} hrs/día | Sueldo: $${rol.sueldoLiquido.toLocaleString('es-CL')} | Costo: $${costoEstimado.toLocaleString('es-CL')}`;
      }).join('\n');

      // Preparar datos para enviar
      const dataToSend = {
        ...formData,
        roles: roles.map(rol => ({
          tipoTurno: rol.tipoTurno,
          horario: rol.horario,
          puestos: rol.puestos,
          diasSemana: rol.diasSemana,
          horasDia: rol.horasDia,
          sueldoLiquido: rol.sueldoLiquido,
          costoEstimado: calcularCostoRol(rol)
        })),
        costoTotal,
        rolesSolicitados,
        detalleCotizador: {
          detalleRolOperativo: roles.map(rol => ({
            tipoTurno: rol.tipoTurno,
            horario: rol.horario,
            diasPorSemana: rol.diasSemana,
            sueldoLiquido: rol.sueldoLiquido
          })),
          valorCotizacion: costoTotal
        }
      };
      
      console.log('Enviando datos al backend:', dataToSend);
      
      // Enviar al endpoint del backend
      const response = await fetch(API_URLS.COTIZACION_INTELIGENTE, {
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
          rubro: rubros[0],
          comentarios: ''
        });
        
        // Obtener parámetros UTM de sessionStorage
        const utmSource = sessionStorage.getItem('utm_source') || '';
        const utmMedium = sessionStorage.getItem('utm_medium') || '';
        const utmCampaign = sessionStorage.getItem('utm_campaign') || '';
        const utmTerm = sessionStorage.getItem('utm_term') || '';
        const utmContent = sessionStorage.getItem('utm_content') || '';
        
        // Google Tag Manager event - Añadir logs de depuración
        console.log('ANTES: Intentando enviar evento GA4 - submit_form_cotizacion_inteligente');
        console.log('DataLayer existe:', typeof window !== 'undefined' && !!window.dataLayer);
        
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || [];
          console.log('DataLayer actual:', window.dataLayer);
          window.dataLayer.push({
            event: "submit_form_cotizacion_inteligente",
            form_type: "cotizador_inteligente",
            page_path: window.location.pathname,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_content: utmContent
          });
          console.log('DESPUÉS: Evento enviado a GA4');
        } else {
          console.log('ERROR: window no está definido');
        }
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
    <div className="w-full py-8 md:py-12">
      <div className="max-w-[760px] mx-auto px-4">
        {/* Header del Cotizador eliminado para evitar duplicación con la página principal */}
        
        {/* Contenedor de roles y acciones */}
        <div className="flex flex-col gap-8">
          <AnimatePresence>
            {roles.map((rol, index) => (
              <RolOperativoCard
                key={rol.id}
                rol={rol}
                index={index}
                onUpdate={updateRole}
                onRemove={removeRole}
                onDuplicate={duplicateRole}
                canRemove={roles.length > 1}
                isActive={rolActivo === rol.id}
                setActive={(active) => setRolActivo(active ? rol.id : null)}
              />
            ))}
          </AnimatePresence>

          {/* Botón para agregar nuevo rol */}
          <motion.button
            onClick={addRole}
            className="group flex items-center justify-center gap-3 py-8 px-6 rounded-2xl bg-card/50 dark:bg-card/30 hover:bg-card/80 dark:hover:bg-card/40 text-foreground backdrop-blur-sm transition-all border border-border/50 hover:border-border"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 dark:bg-primary/20">
              <PlusCircle className="h-5 w-5 text-primary dark:text-accent" />
            </span>
            <span className="font-medium">Agregar otro Rol Operativo</span>
          </motion.button>

          {/* Resumen de costos - Ahora siempre visible sin importar la cantidad de roles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-8 rounded-2xl bg-card/80 dark:bg-card/60 backdrop-blur-sm border border-border/80 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Resumen Total
            </h3>
            
            {/* Tabla de resumen */}
            <div className="w-full mb-6 overflow-hidden rounded-lg">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 dark:bg-muted/30">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Rol Operativo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Configuración
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Guardias
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Costo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {roles.map((rol, idx) => (
                      <tr key={rol.id} className="text-sm">
                        <td className="px-4 py-3 text-foreground">
                          Rol {idx + 1}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {rol.tipoTurno}, {rol.horario}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {calcularTotalGuardias(rol)}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-primary dark:text-accent">
                          ${formatearPrecio(calcularCostoRol(rol))}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-muted/30 dark:bg-muted/10 font-semibold">
                      <td colSpan={3} className="px-4 py-3 text-foreground">
                        Total
                      </td>
                      <td className="px-4 py-3 text-right text-primary dark:text-accent text-lg">
                        ${formatearPrecio(costoTotal)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 py-3 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md hover:shadow-lg"
              >
                <Send className="h-4 w-4" />
                <span>Solicitar Cotización</span>
              </button>
              <p className="text-xs text-muted-foreground mt-3">Responderemos en menos de 24 horas.</p>
            </div>
          </motion.div>
          
          {/* Footer informativo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 px-4 py-2 text-center"
          >
            <p className="text-sm text-muted-foreground">
              * El monto final puede estar sujeto a ajustes según las necesidades específicas del servicio.
            </p>
          </motion.div>
        </div>

        {/* Modal de Formulario */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
              onClick={() => setShowForm(false)}
            >
              {submitSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-card dark:bg-card/90 rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-md relative my-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setShowForm(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/60 transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      ¡Solicitud enviada con éxito!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Hemos recibido tu información y nos pondremos en contacto contigo a la brevedad.
                    </p>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setSubmitSuccess(false);
                      }}
                      className="rounded-xl py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-card dark:bg-card/90 rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-md relative my-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setShowForm(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/60 transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                    Complete sus datos
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
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
                          className={cn(
                            "w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            formErrors.nombre && "border-red-500"
                          )}
                        />
                        {formErrors.nombre && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.nombre}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="apellido" className="text-base font-medium text-foreground block mb-2">
                          Apellido
                        </label>
                        <input
                          id="apellido"
                          name="apellido"
                          type="text"
                          required
                          value={formData.apellido}
                          onChange={handleFormChange}
                          className={cn(
                            "w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            formErrors.apellido && "border-red-500"
                          )}
                        />
                        {formErrors.apellido && (
                          <p className="text-red-500 text-xs mt-1">{formErrors.apellido}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="text-base font-medium text-foreground block mb-2 flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleFormChange}
                        className={cn(
                          "w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          formErrors.email && "border-red-500"
                        )}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="telefono" className="text-base font-medium text-foreground block mb-2 flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                        Teléfono (9 dígitos)
                      </label>
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        required
                        maxLength={9}
                        value={formData.telefono}
                        onChange={(e) => {
                          // Solo permitir dígitos numéricos
                          const value = e.target.value.replace(/\D/g, '');
                          setFormData(prev => ({ ...prev, telefono: value }));
                          // Limpiar error si el campo tiene valor y 9 dígitos
                          if (value.length === 9 && formErrors.telefono) {
                            setFormErrors(prev => {
                              const newErrors = { ...prev };
                              delete newErrors.telefono;
                              return newErrors;
                            });
                          }
                        }}
                        className={cn(
                          "w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          formErrors.telefono && "border-red-500"
                        )}
                      />
                      {formErrors.telefono && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.telefono}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="empresa" className="text-base font-medium text-foreground block mb-2 flex items-center">
                        <Building className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                        Empresa
                      </label>
                      <input
                        id="empresa"
                        name="empresa"
                        type="text"
                        required
                        value={formData.empresa}
                        onChange={handleFormChange}
                        className={cn(
                          "w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          formErrors.empresa && "border-red-500"
                        )}
                      />
                      {formErrors.empresa && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.empresa}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="rubro" className="text-base font-medium text-foreground block mb-2">
                        Rubro
                      </label>
                      <select
                        id="rubro"
                        name="rubro"
                        value={formData.rubro}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {rubros.map((rubro) => (
                          <option key={rubro} value={rubro}>
                            {rubro}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Nuevos campos de dirección con autocompletado */}
                    <div>
                      <label htmlFor="direccion" className="text-base font-medium text-foreground block mb-2 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                        Dirección
                      </label>
                      <input
                        id="direccion"
                        name="direccion"
                        type="text"
                        ref={autocompleteRef}
                        required
                        value={formData.direccion}
                        onChange={handleDireccionChange}
                        className={cn(
                          "w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          formErrors.direccion && "border-red-500"
                        )}
                        placeholder="Buscar dirección..."
                      />
                      {formErrors.direccion && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.direccion}</p>
                      )}
                      {!mapLoaded && (
                        <p className="text-amber-500 text-xs mt-1">
                          Autocompletado no disponible. Ingresa la dirección manualmente.
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="comuna" className="text-base font-medium text-foreground block mb-2">
                          Comuna
                        </label>
                        <input
                          id="comuna"
                          name="comuna"
                          type="text"
                          value={formData.comuna}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="ciudad" className="text-base font-medium text-foreground block mb-2">
                          Ciudad
                        </label>
                        <input
                          id="ciudad"
                          name="ciudad"
                          type="text"
                          value={formData.ciudad}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="comentarios" className="text-base font-medium text-foreground block mb-2">
                        Comentarios adicionales (opcional)
                      </label>
                      <textarea
                        id="comentarios"
                        name="comentarios"
                        rows={3}
                        value={formData.comentarios}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                      ></textarea>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 py-3 rounded-xl border border-input bg-background hover:bg-accent/10 text-foreground transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors disabled:opacity-50"
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
                            Enviar
                            <Send className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Componente para cada Rol Operativo
function RolOperativoCard({
  rol,
  index,
  onUpdate,
  onRemove,
  onDuplicate,
  canRemove,
  isActive,
  setActive
}: {
  rol: RolOperativo;
  index: number;
  onUpdate: (id: string, rol: RolOperativo) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  canRemove: boolean;
  isActive: boolean;
  setActive: (active: boolean) => void;
}) {
  // Estado para el menú de acciones
  const [showMenu, setShowMenu] = useState(false);
  
  // Estado para el tooltip de información
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  // Manejadores de cambios
  const handleUpdate = <K extends keyof RolOperativo>(
    field: K, 
    value: RolOperativo[K]
  ) => {
    // Si el campo es tipoTurno, usamos la función de actualización específica
    if (field === 'tipoTurno') {
      const tipoTurnoActualizado = actualizarConfiguracionTurno(rol, value as TipoTurno);
      onUpdate(rol.id, tipoTurnoActualizado);
    } else {
      onUpdate(rol.id, { ...rol, [field]: value });
    }
  };
  
  // Incrementar o decrementar puestos
  const adjustPuestos = (increment: boolean) => {
    const newValue = increment 
      ? Math.min(rol.puestos + 1, 10) 
      : Math.max(rol.puestos - 1, 1);
    handleUpdate('puestos', newValue);
  };
  
  // Calcular costo para este rol
  const costoRol = calcularCostoRol(rol);
  const totalGuardias = calcularTotalGuardias(rol);
  
  // Obtener ícono para el tipo de horario
  const getHorarioIcon = (horario: TipoHorario) => {
    switch (horario) {
      case 'Día': return <Sun className="h-4 w-4" />;
      case 'Noche': return <Moon className="h-4 w-4" />;
      case '24 horas': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };
  
  // Descripciones para tooltips
  const tooltips = {
    tipoTurno: "El sistema de turnos define cómo se organizan los días de trabajo y descanso de los guardias. Por ejemplo, 4x4 significa 4 días de trabajo seguidos de 4 días de descanso.",
    horario: "Define el horario de cobertura: Día (8am-8pm), Noche (8pm-8am) o 24 horas (cobertura completa).",
    puestos: "Número de posiciones que necesitan ser cubiertas simultáneamente. Cada puesto puede requerir múltiples guardias dependiendo del sistema de turnos.",
    sueldo: "Sueldo líquido mensual por guardia. Este valor afecta directamente el costo del servicio."
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
      className="p-8 rounded-2xl bg-card dark:bg-card/80 shadow-md hover:shadow-lg border border-border/50 hover:border-border transition-all backdrop-blur-sm"
    >
      {/* Encabezado del rol */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-primary dark:text-accent" />
          </div>
          <h3 className="text-xl font-medium text-foreground">
            Rol Operativo {index + 1}
          </h3>
        </div>
        
        {/* Menú de acciones */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-muted/60 dark:hover:bg-muted/30 transition-colors"
          >
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 bg-popover dark:bg-popover/80 ring-1 ring-border/50 backdrop-blur-sm z-20"
              >
                <button
                  onClick={() => {
                    onDuplicate(rol.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-foreground hover:bg-muted dark:hover:bg-muted/30"
                >
                  <Copy className="h-4 w-4 mr-3 text-primary dark:text-accent" />
                  Duplicar
                </button>
                
                {canRemove && (
                  <button
                    onClick={() => {
                      onRemove(rol.id);
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-muted dark:hover:bg-muted/30"
                  >
                    <Trash2 className="h-4 w-4 mr-3 text-red-600 dark:text-red-400" />
                    Eliminar
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Parámetros de configuración en grid visual unificado */}
      <div className="grid grid-cols-1 gap-8 mt-4">
        {/* Tipo de turno */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 text-primary dark:text-accent" />
              Tipo de turno
            </label>
            <Tooltip content={tooltips.tipoTurno}>
              <HelpCircle className="h-4 w-4 text-muted-foreground/70" />
            </Tooltip>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {OPCIONES_TIPO_TURNO.map((tipo) => (
              <button
                key={tipo}
                onClick={() => handleUpdate('tipoTurno', tipo)}
                className={cn(
                  "flex-1 px-3 py-2.5 rounded-xl transition-all text-sm font-medium",
                  rol.tipoTurno === tipo
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/20 shadow-md"
                    : "bg-muted/60 hover:bg-muted text-foreground hover:shadow-sm"
                )}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
        
        {/* Horario */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2 text-primary dark:text-accent" />
              Horario
            </label>
            <Tooltip content={tooltips.horario}>
              <HelpCircle className="h-4 w-4 text-muted-foreground/70" />
            </Tooltip>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {OPCIONES_HORARIO.map((horario) => (
              <button
                key={horario}
                onClick={() => handleUpdate('horario', horario)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 py-3 rounded-xl transition-all text-sm font-medium",
                  rol.horario === horario
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/20 shadow-md"
                    : "bg-muted/60 hover:bg-muted text-foreground hover:shadow-sm"
                )}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background/80 dark:bg-background/20">
                  {getHorarioIcon(horario)}
                </div>
                {horario}
              </button>
            ))}
          </div>
        </div>
        
        {/* Número de puestos con stepper */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2 text-primary dark:text-accent" />
              Nº de puestos
            </label>
            <Tooltip content={tooltips.puestos}>
              <HelpCircle className="h-4 w-4 text-muted-foreground/70" />
            </Tooltip>
          </div>
          
          <div className="flex items-center justify-between bg-muted/60 rounded-xl p-4">
            <button
              onClick={() => adjustPuestos(false)}
              disabled={rol.puestos <= 1}
              className={cn(
                "flex items-center justify-center h-10 w-10 rounded-full transition-all",
                rol.puestos <= 1 
                  ? "bg-muted/60 text-muted-foreground cursor-not-allowed" 
                  : "bg-muted hover:bg-primary/10 text-foreground"
              )}
            >
              <Minus className="h-4 w-4" />
            </button>
            
            <div className="text-3xl font-bold text-foreground">{rol.puestos}</div>
            
            <button
              onClick={() => adjustPuestos(true)}
              disabled={rol.puestos >= 10}
              className={cn(
                "flex items-center justify-center h-10 w-10 rounded-full transition-all",
                rol.puestos >= 10 
                  ? "bg-muted/60 text-muted-foreground cursor-not-allowed" 
                  : "bg-muted hover:bg-primary/10 text-foreground"
              )}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Sueldo líquido con slider rediseñado */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2 text-primary dark:text-accent" />
              Sueldo líquido
            </label>
            <Tooltip content={tooltips.sueldo}>
              <HelpCircle className="h-4 w-4 text-muted-foreground/70" />
            </Tooltip>
          </div>
          
          <div className="space-y-4 bg-muted/30 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Min: ${formatearPrecio(RANGOS_SALARIALES[rol.tipoTurno].min)}</span>
              <span className="text-lg font-semibold text-primary dark:text-accent">${formatearPrecio(rol.sueldoLiquido)}</span>
              <span className="text-sm text-muted-foreground">Max: ${formatearPrecio(RANGOS_SALARIALES[rol.tipoTurno].max)}</span>
            </div>
            
            <input
              type="range"
              min={RANGOS_SALARIALES[rol.tipoTurno].min}
              max={RANGOS_SALARIALES[rol.tipoTurno].max}
              step="10000"
              value={rol.sueldoLiquido}
              onChange={(e) => handleUpdate('sueldoLiquido', parseInt(e.target.value))}
              className="w-full h-2 appearance-none bg-muted rounded-full outline-none overflow-hidden cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md relative"
              style={{
                background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(rol.sueldoLiquido - RANGOS_SALARIALES[rol.tipoTurno].min) / (RANGOS_SALARIALES[rol.tipoTurno].max - RANGOS_SALARIALES[rol.tipoTurno].min) * 100}%, var(--muted) ${(rol.sueldoLiquido - RANGOS_SALARIALES[rol.tipoTurno].min) / (RANGOS_SALARIALES[rol.tipoTurno].max - RANGOS_SALARIALES[rol.tipoTurno].min) * 100}%, var(--muted) 100%)`
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Resumen de costo estimado */}
      <div className="mt-10 pt-6 border-t border-border/50 flex flex-col items-center">
        <motion.p 
          className="text-4xl font-bold text-primary dark:text-accent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          ${formatearPrecio(costoRol)} CLP
        </motion.p>
        
        <p className="text-sm text-muted-foreground mt-3 flex items-center justify-center">
          <Users className="h-4 w-4 mr-2" />
          {totalGuardias} {totalGuardias === 1 ? 'guardia requerido' : 'guardias requeridos'} para {rol.puestos} {rol.puestos === 1 ? 'puesto' : 'puestos'}
        </p>
        
        {rol.precioFijo && (
          <span className="inline-block mt-3 px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent rounded-full text-xs font-medium">
            Precio fijo
          </span>
        )}
      </div>
    </motion.div>
  );
} 