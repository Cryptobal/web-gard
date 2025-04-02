"use client";

import React, { useState, useEffect, useRef, RefCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader } from '@googlemaps/js-api-loader';
import { useGtmEvent } from '../../components/EventTracker';

// Declaración simplificada para Google Maps API
declare global {
  interface Window {
    google: any;
  }
}

const formSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre es obligatorio' }),
  apellido: z.string().min(2, { message: 'El apellido es obligatorio' }),
  email: z.string().email({ message: 'Ingresa un correo electrónico válido' }),
  telefono: z.string().regex(/^\d{9}$/, { message: 'El teléfono debe tener 9 dígitos numéricos' }),
  empresa: z.string().min(2, { message: 'La empresa es obligatoria' }),
  paginaWeb: z.string()
    .min(3, { message: 'La página web es obligatoria' })
    .regex(/^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}/, 
      { message: 'Ingresa una URL válida (ej: gard.cl, www.gard.cl o https://gard.cl)' }),
  direccion: z.string().min(5, { message: 'La dirección es obligatoria' }),
  comuna: z.string().optional(),
  ciudad: z.string().optional(),
  tipoIndustria: z.string().min(1, { message: 'Selecciona un tipo de industria' }),
  cotizacion: z.string().min(3, { message: 'Proporciona los detalles de tu solicitud' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CotizacionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { pushEvent } = useGtmEvent();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      empresa: '',
      paginaWeb: '',
      direccion: '',
      comuna: '',
      ciudad: '',
      tipoIndustria: '',
      cotizacion: '',
    },
  });

  const { setValue } = form;

  // Crear una ref callback que pueda ser usada directamente
  const autocompleteRef: RefCallback<HTMLInputElement> = (element) => {
    autocompleteInputRef.current = element;
  };

  // Efecto para recuperar datos desde sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Obtener valores guardados en navegación previa
    const savedIndustry = sessionStorage.getItem('user_industry') || '';
    const savedService = sessionStorage.getItem('user_service') || '';
    
    // Rellenar formulario con datos guardados si existen
    if (savedIndustry) {
      setValue('tipoIndustria', savedIndustry);
      console.log('✅ Industria cargada desde sessionStorage:', savedIndustry);
    }
    
    // Personalizar el texto de cotización con el servicio si existe
    if (savedService) {
      const cotizacionInicial = `Estoy interesado en contratar servicios de ${savedService}`;
      setValue('cotizacion', cotizacionInicial);
      console.log('✅ Servicio cargado desde sessionStorage:', savedService);
    }
    
    // También obtener UTMs para registrarlos en la conversión después
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    if (utmSource || utmMedium || utmCampaign) {
      console.log('✅ UTMs detectados en URL:', { utmSource, utmMedium, utmCampaign });
    }
  }, [setValue]);

  useEffect(() => {
    // Carga de la API de Google Maps
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

  useEffect(() => {
    if (!mapLoaded || !autocompleteInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'cl' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      setValue('direccion', place.formatted_address || '');

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

      setValue('comuna', comuna);
      setValue('ciudad', ciudad);
    });

    return () => {
      // Cleanup si es necesario
    };
  }, [mapLoaded, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setFormStatus('idle');
    
    try {
      // Verificar si dataLayer está disponible
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        
        // Obtener datos adicionales de sessionStorage
        const serviceRequested = sessionStorage.getItem('user_service') || data.tipoIndustria;
        const industryContext = sessionStorage.getItem('user_industry') || data.tipoIndustria;
        
        // Crear el objeto de evento manualmente para asegurar que se envía correctamente
        const eventData = {
          event: 'submit_form_quotation',
          service_requested: serviceRequested,
          industry: industryContext,
          form_fields_filled: Object.keys(data).length,
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
          referrer: document.referrer
        };
        
        // Enviar el evento al dataLayer
        window.dataLayer.push(eventData);
        
        // Depuración del evento
        console.log('GTM Event enviado manualmente:', eventData);
        console.log('DataLayer actual:', window.dataLayer);
      } else {
        console.warn('Window no está disponible, no se pudo enviar el evento GTM');
      }
      
      // También intentamos con el hook por si acaso
      pushEvent({
        name: 'submit_form_quotation',
        params: {
          service_requested: sessionStorage.getItem('user_service') || data.tipoIndustria,
          industry: sessionStorage.getItem('user_industry') || data.tipoIndustria,
          form_fields_filled: Object.keys(data).length
        }
      });
      
      // Depuración del evento con el hook
      console.log('GTM Event con hook:', window.dataLayer[window.dataLayer.length - 1]);
      
      const response = await fetch('https://hook.us1.make.com/oq1dihqjq7xbl2xbk9wbbdp02h37831a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        // Limpiar sessionStorage después de enviar el formulario
        sessionStorage.removeItem('user_service');
        sessionStorage.removeItem('user_industry');
        sessionStorage.removeItem('user_service_slug');
        sessionStorage.removeItem('user_industry_slug');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm p-6 md:p-8">
      {formStatus === 'success' ? (
        <div className="text-center py-8">
          <h2 className="text-heading-4 text-primary mb-4">¡Tu solicitud ha sido enviada correctamente!</h2>
          <p className="text-body-base mb-6">Te contactaremos en menos de 12 horas.</p>
          <Button 
            onClick={() => setFormStatus('idle')}
            variant="gard-primary"
            className="rounded-2xl"
          >
            Enviar otra cotización
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de contacto</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="correo@ejemplo.com" {...field} />
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
                    <FormLabel>Número de teléfono</FormLabel>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de tu empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paginaWeb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Página Web</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="gard.cl, www.gard.cl o https://gard.cl" 
                        {...field} 
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
                  <FormLabel>Dirección o ubicación del servicio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa la dirección"
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
                      <Input placeholder="Comuna" readOnly {...field} />
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
                      <Input placeholder="Ciudad" readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tipoIndustria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de industria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de industria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Banca y Finanzas">Banca y Finanzas</SelectItem>
                      <SelectItem value="Retail y Centros Comerciales">Retail y Centros Comerciales</SelectItem>
                      <SelectItem value="Salud (Hospitales y Clínicas)">Salud (Hospitales y Clínicas)</SelectItem>
                      <SelectItem value="Educación (Colegios y Universidades)">Educación (Colegios y Universidades)</SelectItem>
                      <SelectItem value="Infraestructura Crítica">Infraestructura Crítica</SelectItem>
                      <SelectItem value="Transporte y Logística">Transporte y Logística</SelectItem>
                      <SelectItem value="Construcción e Inmobiliario">Construcción e Inmobiliario</SelectItem>
                      <SelectItem value="Minería y Energía">Minería y Energía</SelectItem>
                      <SelectItem value="Corporativo y Oficinas">Corporativo y Oficinas</SelectItem>
                      <SelectItem value="Condominios y Residencias">Condominios y Residencias</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cotizacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cotización</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explícanos tus necesidades de seguridad para ofrecerte una cotización personalizada" 
                      rows={5}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formStatus === 'error' && (
              <div className="bg-red-50 p-4 rounded-md text-red-700 text-sm">
                Hubo un error al enviar. Intenta nuevamente.
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isSubmitting}
              variant="gard-primary"
              size="lg"
              className="w-full md:w-auto rounded-2xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Cotización"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
} 