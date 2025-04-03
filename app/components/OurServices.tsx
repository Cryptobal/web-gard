"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Plane, 
  Cpu, 
  MonitorSmartphone, 
  Scan, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import { CloudflareImage } from '@/components/ui';
import { services } from '@/app/data/services';
import { serviciosPorIndustria } from '@/app/data/servicios-por-industria';
import { cn } from '@/lib/utils';

// Mapeo de nombres de íconos a componentes de Lucide
const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  ShieldCheck,
  Drone: Plane, // Usamos Plane como alternativa a Drone
  Cpu,
  MonitorSmartphone,
  Scan,
  ClipboardCheck,
  FileText,
  ShieldAlert
};

interface OurServicesProps {
  title?: string;
  subtitle?: string;
  industria?: string;
  nombreIndustria?: string;
}

export default function OurServices({ 
  title = "Nuestros Servicios", 
  subtitle = "Soluciones integrales de seguridad diseñadas para proteger lo que más importa.",
  industria,
  nombreIndustria
}: OurServicesProps) {
  // Estado para controlar el carrusel en móviles
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState<'desktop' | 'mobile'>('desktop');

  // Detectar si es dispositivo móvil y actualizar el modo de visualización
  useEffect(() => {
    const updateDisplayMode = () => {
      setDisplayMode(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };
    
    // Comprobar al cargar
    updateDisplayMode();
    
    // Comprobar al redimensionar la ventana
    window.addEventListener('resize', updateDisplayMode);
    
    return () => window.removeEventListener('resize', updateDisplayMode);
  }, []);

  // Filtrar servicios según la industria si se proporciona
  const serviciosFiltrados = React.useMemo(() => {
    // Si se especificó una industria, filtrar por ella
    if (industria) {
      // Buscar la relación industria-servicios
      const relacion = serviciosPorIndustria.find(
        item => item.industria === industria
      );
      
      // Si existe la relación, filtrar los servicios
      if (relacion) {
        // Mapear slugs de servicios a objetos del array services
        return services.filter(servicio => {
          // Extraer slug del href: "/servicios/slug" -> "slug"
          const servicioSlug = servicio.href.split('/').pop();
          return relacion.servicios.includes(servicioSlug || '');
        });
      }
    }
    
    // Por defecto, mostrar todos los servicios
    return services;
  }, [industria]);

  // Configuración de keen-slider para móviles
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 1,
      spacing: 16
    },
    created() {
      setLoaded(true);
    }
  });

  // Función para renderizar el ícono correcto según el nombre
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
    return IconComponent ? <IconComponent className="h-10 w-10 text-primary dark:text-accent" /> : null;
  };

  // Maneja la navegación del carrusel
  const handlePrev = () => {
    if (instanceRef.current) {
      instanceRef.current.prev();
    }
  };

  const handleNext = () => {
    if (instanceRef.current) {
      instanceRef.current.next();
    }
  };

  return (
    <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-heading-2 mb-4">{title}</h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Vista de escritorio */}
        <div className={displayMode === 'desktop' ? 'block' : 'hidden'}>
          <div className="flex justify-center gap-4 overflow-x-auto flex-wrap">
            {serviciosFiltrados.map((service, index) => {
              // Determinar la ruta del enlace según si hay una industria especificada
              const href = industria 
                ? `${service.href}/${industria}` 
                : service.href;
                
              console.log(`Servicio: ${service.name}, URL: ${href}`); // Depuración
                
              return (
                <Link 
                  key={index} 
                  href={href}
                  className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col w-full md:w-[46%] lg:w-[30%] xl:w-[22%] mb-6"
                >
                  <div className="relative aspect-[3/2] w-full mb-4">
                    <CloudflareImage
                      imageId={service.imageId}
                      alt={service.name}
                      fill
                      className="rounded-xl object-cover w-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center my-4">
                    {renderIcon(service.icon)}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2 text-center">{service.name}</h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 text-center flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="flex justify-center mt-auto">
                    <span className="inline-flex items-center text-primary dark:text-accent font-medium">
                      Saber más <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Vista de móvil con keen-slider */}
        <div className={displayMode === 'mobile' ? 'block' : 'hidden'}>
          <div className="relative">
            {/* Botones de navegación */}
            {loaded && instanceRef.current && (
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between z-10 pointer-events-none">
                <button 
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-primary transition-all pointer-events-auto"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-primary transition-all pointer-events-auto"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>
            )}
            
            {/* Carrusel con Keen Slider */}
            <div ref={sliderRef} className="keen-slider">
              {serviciosFiltrados.map((service, index) => {
                // Determinar la ruta del enlace según si hay una industria
                const href = industria 
                  ? `${service.href}/${industria}` 
                  : service.href;
                  
                console.log(`Servicio: ${service.name}, URL: ${href}`); // Depuración
                
                return (
                  <div key={index} className="keen-slider__slide px-2 py-2">
                    <Link 
                      href={href}
                      className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-md flex flex-col h-full"
                    >
                      <div className="relative aspect-[3/2] w-full mb-4">
                        <CloudflareImage
                          imageId={service.imageId}
                          alt={service.name}
                          fill
                          className="rounded-xl object-cover w-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out"
                        />
                      </div>
                      
                      <div className="flex items-center justify-center my-4">
                        {renderIcon(service.icon)}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
                        {service.name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 text-center flex-grow">
                        {service.description}
                      </p>
                      
                      <div className="flex justify-center mt-auto">
                        <span className="inline-flex items-center text-primary dark:text-accent font-medium">
                          Saber más <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Indicadores de posición (dots) */}
          {loaded && instanceRef.current && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from(
                { length: serviciosFiltrados.length },
                (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      currentSlide === idx 
                        ? "bg-primary w-8" 
                        : "bg-gray-300 dark:bg-gray-700"
                    )}
                    aria-label={`Slide ${idx + 1}`}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 