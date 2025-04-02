'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader } from '@googlemaps/js-api-loader';
import { 
  ArrowRight, 
  User, 
  Briefcase, 
  FileCheck, 
  BadgeCheck, 
  Users, 
  GraduationCap,
  CheckCircle,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Car,
  AlertCircle,
  Loader2,
  DollarSign,
  Award,
  Smile,
  Shield
} from 'lucide-react';

import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

// Validador de RUT chileno usando algoritmo Módulo 11
const validateRut = (rut: string) => {
  // Eliminar puntos y guión
  const cleanRut = rut.replace(/[.-]/g, '');
  
  // Obtener dígito verificador
  const dv = cleanRut.slice(-1).toUpperCase();
  const rutNumber = parseInt(cleanRut.slice(0, -1), 10);
  
  // Algoritmo para calcular dígito verificador
  let suma = 0;
  let factor = 2;
  
  // Sumar dígitos multiplicados por factor
  for (let i = rutNumber.toString().length - 1; i >= 0; i--) {
    suma += parseInt(rutNumber.toString().charAt(i), 10) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  
  // Calcular dígito verificador
  const resultado = 11 - (suma % 11);
  
  // Determinar dígito verificador esperado
  let dvEsperado;
  if (resultado === 11) {
    dvEsperado = '0';
  } else if (resultado === 10) {
    dvEsperado = 'K';
  } else {
    dvEsperado = resultado.toString();
  }
  
  // Comparar dígito verificador calculado con el ingresado
  return dv === dvEsperado;
};

// Esquema de validación del formulario
const formSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre es obligatorio' }),
  apellido: z.string().min(2, { message: 'El apellido es obligatorio' }),
  rut: z.string()
    .min(8, { message: 'RUT inválido' })
    .refine((val) => validateRut(val), { message: 'RUT inválido, verifica el número y dígito verificador' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  telefono: z.string().regex(/^\d{9}$/, { message: 'El teléfono debe tener 9 dígitos' }),
  fechaNacimiento: z.string().min(1, { message: 'La fecha de nacimiento es obligatoria' }),
  direccion: z.string().min(5, { message: 'La dirección es obligatoria' }),
  comuna: z.string().min(1, { message: 'La comuna es obligatoria' }),
  ciudad: z.string().min(1, { message: 'La ciudad es obligatoria' }),
  movilizacionPropia: z.string(),
  certificadoOS10: z.string(),
  comentarios: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReclutamientoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement>(null);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Configuración del formulario
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      rut: '',
      email: '',
      telefono: '',
      fechaNacimiento: '',
      direccion: '',
      comuna: '',
      ciudad: '',
      movilizacionPropia: 'no',
      certificadoOS10: 'no',
      comentarios: '',
    }
  });

  const { setValue } = form;

  // Referencia para autocompletado de Google Places
  const autocompleteRef = (element: HTMLInputElement | null) => {
    autocompleteInputRef.current = element;
  };

  // Cargar API de Google Maps
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyBHIoHJDp6StLJlUAQV_gK7woFsEYgbzHY',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      setMapLoaded(true);
    }).catch(error => {
      console.error('Error cargando Google Maps API:', error);
    });
  }, []);

  // Inicializar autocompletado cuando la API esté cargada
  useEffect(() => {
    if (mapLoaded && autocompleteInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        { types: ['address'], componentRestrictions: { country: 'cl' } }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        setValue('direccion', place.formatted_address || '');

        // Extraer comuna y ciudad
        let comuna = '';
        let ciudad = '';

        if (place.address_components) {
          for (const component of place.address_components) {
            const componentType = component.types[0];

            if (componentType === 'locality') {
              ciudad = component.long_name;
            }

            if (componentType === 'administrative_area_level_3' || 
                componentType === 'sublocality_level_1' || 
                componentType === 'sublocality') {
              comuna = component.long_name;
            }

            // Si no encontramos comuna en los niveles anteriores, usar administrative_area_level_2
            if (!comuna && componentType === 'administrative_area_level_2') {
              comuna = component.long_name;
            }
          }
        }

        setValue('comuna', comuna);
        setValue('ciudad', ciudad);
      });
    }
  }, [mapLoaded, setValue]);

  // Manejar envío del formulario
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setFormStatus('idle');

    try {
      const response = await fetch('https://hook.us1.make.com/5ozb2y5aucrr75d2xtpshmlyckds9nl4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para hacer scroll al formulario
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Variantes de animación
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="flex-grow">
      {/* Hero Principal */}
      <section className="relative h-[60vh] md:h-[65vh] overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="428c1028-8f6b-455a-e110-38421eeb5700"
            alt="Reclutamiento Gard Security"
            fill
            className="object-cover"
            objectPosition="center"
            priority
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="bg-gradient-to-t from-black/60 to-transparent absolute inset-0 z-10"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl mb-6"
          >
            Sé parte de Gard Security
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="text-white text-xl max-w-2xl mb-8"
          >
            Buscamos guardias responsables, con vocación y compromiso.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <Button 
              onClick={scrollToForm}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg flex items-center"
              aria-label="Ir al formulario de postulación"
            >
              Postula Aquí
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ¿A quién buscamos? */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿A quién buscamos?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              En Gard Security seleccionamos a personas comprometidas, íntegras y capacitadas. 
              Nuestro equipo humano es el pilar de nuestra excelencia operativa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <BadgeCheck className="h-8 w-8 text-primary" />, title: "Certificado OS10 vigente", description: "Requisito fundamental para ejercer labores de seguridad privada" },
              { icon: <User className="h-8 w-8 text-primary" />, title: "Buena presencia", description: "Presentación personal impecable y trato profesional" },
              { icon: <CheckCircle className="h-8 w-8 text-primary" />, title: "Compromiso", description: "Responsabilidad, puntualidad y seriedad en el trabajo" },
              { icon: <Calendar className="h-8 w-8 text-primary" />, title: "Disponibilidad", description: "Flexibilidad para turnos rotativos según necesidades" },
              { icon: <Briefcase className="h-8 w-8 text-primary" />, title: "Experiencia", description: "Valoramos experiencia previa en seguridad (no excluyente)" },
              { icon: <Users className="h-8 w-8 text-primary" />, title: "Trabajo en equipo", description: "Capacidad para integrarse a equipos de alto rendimiento" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Reclutamiento */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proceso de Reclutamiento</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nuestro proceso garantiza excelencia desde el primer paso. Nos aseguramos de contratar a los mejores para entregar el mejor servicio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <Briefcase className="h-10 w-10 text-primary" />, title: "Identificación de necesidad", description: "Evaluamos requerimientos específicos del cliente" },
              { icon: <FileCheck className="h-10 w-10 text-primary" />, title: "Filtro documental", description: "Revisión de OS10, antecedentes y referencias" },
              { icon: <User className="h-10 w-10 text-primary" />, title: "Evaluación psicológica", description: "Evaluamos aptitudes y perfil psicológico" },
              { icon: <BadgeCheck className="h-10 w-10 text-primary" />, title: "Verificación de antecedentes", description: "Comprobación exhaustiva de historial laboral y personal" },
              { icon: <Users className="h-10 w-10 text-primary" />, title: "Entrevista personal", description: "Entrevista con nuestro equipo de Recursos Humanos" },
              { icon: <GraduationCap className="h-10 w-10 text-primary" />, title: "Capacitación inicial", description: "Formación específica según el servicio asignado" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primary/10 mb-6 mx-auto">
                  {step.icon}
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mb-4 mx-auto">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Beneficios de trabajar en Gard</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Únete a un equipo donde valoramos a nuestros colaboradores y ofrecemos condiciones óptimas para tu desarrollo profesional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Contrato formal</h3>
                <p className="text-muted-foreground">
                  Condiciones laborales claras y seguras desde el primer día.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <DollarSign className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Pagos puntuales</h3>
                <p className="text-muted-foreground">
                  Cumplimos rigurosamente con nuestras obligaciones salariales.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <GraduationCap className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Capacitación constante</h3>
                <p className="text-muted-foreground">
                  Formación presencial y online para tu desarrollo profesional.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Crecimiento profesional</h3>
                <p className="text-muted-foreground">
                  Oportunidades reales de avanzar dentro de la empresa.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <Smile className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Excelente clima laboral</h3>
                <p className="text-muted-foreground">
                  Ambiente de trabajo respetuoso y profesional.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Implementos de calidad</h3>
                <p className="text-muted-foreground">
                  Equipamiento completo para realizar tu trabajo con seguridad.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulario de Postulación */}
      <section 
        ref={formRef} 
        id="formulario"
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Formulario de Postulación</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Completa el siguiente formulario para iniciar tu proceso de postulación. Nos pondremos en contacto contigo a la brevedad.
            </p>
          </motion.div>

          {formStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">¡Postulación enviada con éxito!</h3>
              <p className="text-lg mb-6">
                Hemos recibido tu información correctamente. Nuestro equipo de reclutamiento revisará tu perfil y se contactará contigo en los próximos días.
              </p>
              <Button
                onClick={() => setFormStatus('idle')}
                className="bg-primary hover:bg-primary/90"
              >
                Enviar otra postulación
              </Button>
            </motion.div>
          ) : (
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apellido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="rut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RUT</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="12345678-9" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fechaNacimiento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de nacimiento</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="tucorreo@ejemplo.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="912345678"
                            maxLength={9}
                            {...field}
                            onChange={(e) => {
                              // Solo permitir números
                              const value = e.target.value.replace(/\D/g, '');
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="direccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ingresa tu dirección" 
                          {...field} 
                          ref={autocompleteRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="comuna"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comuna</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Comuna" 
                            readOnly 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ciudad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ciudad" 
                            readOnly 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="movilizacionPropia"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>¿Cuenta con movilización propia?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="si" id="movilizacion-si" />
                              <label htmlFor="movilizacion-si">Sí</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="movilizacion-no" />
                              <label htmlFor="movilizacion-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="certificadoOS10"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>¿Cuenta con certificado OS10 vigente?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="si" id="os10-si" />
                              <label htmlFor="os10-si">Sí</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="os10-no" />
                              <label htmlFor="os10-no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="comentarios"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comentarios adicionales</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Cuéntanos sobre tu experiencia, disponibilidad horaria, u otra información relevante"
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    className={cn(
                      "bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Postulación
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>

                {formStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                    <p className="text-red-600 dark:text-red-400">
                      Ocurrió un error al enviar tu postulación. Por favor intenta nuevamente.
                    </p>
                  </div>
                )}
              </form>
            </Form>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-20 bg-primary dark:bg-primary/80 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            ¿Listo para proteger con excelencia?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
          >
            Únete a Gard Security y desarrolla tu carrera en una empresa líder del sector.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={scrollToForm}
              className="bg-white text-primary hover:bg-white/90 px-8 py-6 rounded-full text-lg"
            >
              Postula Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 