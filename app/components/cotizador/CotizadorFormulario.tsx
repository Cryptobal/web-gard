"use client";

import { useState, useEffect, useRef, RefCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  PlusCircle, 
  Send,
  ChevronRight,
  Building,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  RolOperativo,
  crearNuevoRol,
  calcularCostoRol,
  formatearPrecio,
} from '@/lib/calculadora-costos';
import NuevoRolOperativo from './NuevoRolOperativo';
import { Loader } from '@googlemaps/js-api-loader';
import API_URLS from '@/app/config/api';

// Declaración global para Google Maps API
declare global {
  interface Window {
    google: any;
  }
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

export default function CotizadorFormulario() {
  // Estado para los roles operativos
  const [roles, setRoles] = useState<RolOperativo[]>([
    crearNuevoRol('1', '4x4')
  ]);
  
  // Estado para el costo total
  const [costoTotal, setCostoTotal] = useState(0);
  
  // Estados para el formulario
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
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

  // Agregamos estados para Google Maps siguiendo el patrón de CotizacionForm.tsx
  const [mapLoaded, setMapLoaded] = useState(false);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [autocompleteInitialized, setAutocompleteInitialized] = useState(false);

  // Crear una ref callback que pueda ser usada directamente (como en CotizacionForm)
  const autocompleteRef: RefCallback<HTMLInputElement> = (element) => {
    autocompleteInputRef.current = element;
  };

  // Cargar la API de Google Maps de la misma manera que CotizacionForm.tsx
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
  
  // Función para agregar un nuevo rol
  const addRole = () => {
    setRoles([
      ...roles,
      crearNuevoRol(Date.now().toString(), '4x4')
    ]);
  };
  
  // Función para actualizar un rol
  const updateRole = (id: string, updatedRole: RolOperativo) => {
    setRoles(roles.map(role => 
      role.id === id ? updatedRole : role
    ));
  };
  
  // Función para eliminar un rol
  const removeRole = (id: string) => {
    if (roles.length > 1) {
      setRoles(roles.filter(role => role.id !== id));
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
            horario: `${rol.horasDia} horas por día`,
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
        
        // Google Tag Manager event
        window.dataLayer = window.dataLayer || [];
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
            {roles.map((rol, index) => (
              <NuevoRolOperativo
                key={rol.id}
                rol={rol}
                onChange={(updatedRole) => updateRole(rol.id, updatedRole)}
                onRemove={() => removeRole(rol.id)}
                showRemoveButton={roles.length > 1}
                index={index}
              />
            ))}
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
              {submitSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-card dark:bg-gray-800 rounded-3xl p-8 shadow-2xl w-full max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
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
                      className="gard-btn rounded-xl py-3 px-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
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
                  className="bg-card dark:bg-gray-800 rounded-3xl p-8 shadow-2xl w-full max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
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
                        Teléfono celular (9 dígitos)
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
                      <label htmlFor="direccion" className="text-base font-medium text-foreground block mb-2 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-primary dark:text-accent" />
                        Dirección de empresa
                      </label>
                      <input
                        id="direccion"
                        name="direccion"
                        type="text"
                        ref={autocompleteRef}
                        required
                        placeholder="Ingresa la dirección"
                        value={formData.direccion}
                        onChange={handleDireccionChange}
                        className={cn(
                          "w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          formErrors.direccion && "border-red-500"
                        )}
                      />
                      {formErrors.direccion && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.direccion}</p>
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
                          readOnly
                          placeholder="Se completará automáticamente"
                          value={formData.comuna}
                          className="w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-base focus-visible:outline-none text-muted-foreground cursor-not-allowed"
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
                          readOnly
                          placeholder="Se completará automáticamente"
                          value={formData.ciudad}
                          className="w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-base focus-visible:outline-none text-muted-foreground cursor-not-allowed"
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
    </section>
  );
} 