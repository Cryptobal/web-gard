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
import CloudflareImage from '@/components/CloudflareImage';
import { services } from '@/app/data/services';
import { serviciosPorIndustria } from '@/app/data/servicios-por-industria';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Comprobar al cargar
    checkIfMobile();
    
    // Comprobar al redimensionar la ventana
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
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

  // Función para renderizar el ícono correcto según el nombre
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
    return IconComponent ? <IconComponent className="h-10 w-10 text-primary dark:text-accent" /> : null;
  };

  // Funciones para navegación del carrusel
  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? serviciosFiltrados.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === serviciosFiltrados.length - 1 ? 0 : prev + 1
    );
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

        {/* Vista de escritorio (sin cambios) */}
        <div className={`md:flex justify-center gap-4 overflow-x-auto flex-wrap ${isMobile ? 'hidden' : 'flex'}`}>
          {serviciosFiltrados.map((service, index) => {
            // Determinar la ruta del enlace según si hay una industria especificada
            const href = industria 
              ? `${service.href}/${industria}` 
              : service.href;
              
            return (
              <Link 
                key={index} 
                href={href}
                className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col w-1/5 min-w-[200px] max-w-[23%] mb-6"
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

        {/* Vista de móvil (carrusel) */}
        <div className={`relative ${isMobile ? 'block' : 'hidden'}`}>
          <div 
            ref={carouselRef}
            className="flex justify-center"
          >
            {serviciosFiltrados.length > 0 && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full max-w-[300px] mx-auto"
              >
                <Link 
                  href={industria 
                    ? `${serviciosFiltrados[currentIndex].href}/${industria}` 
                    : serviciosFiltrados[currentIndex].href
                  }
                  className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-md flex flex-col"
                >
                  <div className="relative aspect-[3/2] w-full mb-4">
                    <CloudflareImage
                      imageId={serviciosFiltrados[currentIndex].imageId}
                      alt={serviciosFiltrados[currentIndex].name}
                      fill
                      className="rounded-xl object-cover w-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center my-4">
                    {renderIcon(serviciosFiltrados[currentIndex].icon)}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
                    {serviciosFiltrados[currentIndex].name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 text-center flex-grow">
                    {serviciosFiltrados[currentIndex].description}
                  </p>
                  
                  <div className="flex justify-center mt-auto">
                    <span className="inline-flex items-center text-primary dark:text-accent font-medium">
                      Saber más <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Flechas de navegación */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6 text-primary dark:text-accent" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6 text-primary dark:text-accent" />
          </button>

          {/* Indicadores de páginación */}
          <div className="flex justify-center gap-4 mt-4">
            {serviciosFiltrados.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                  currentIndex === index 
                    ? 'bg-primary dark:bg-accent w-8' 
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`${index + 1} - Ir a servicio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 