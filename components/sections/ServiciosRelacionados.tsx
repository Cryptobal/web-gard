"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Plane, 
  Eye, 
  Shield, 
  ShieldAlert, 
  ClipboardCheck, 
  FileText, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import { CloudflareImage } from '@/components/ui';
import { servicios, type Servicio } from '@/app/data/servicios';
import { cn } from '@/lib/utils';

// Mapeo de nombres de íconos a componentes de Lucide
const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  ShieldCheck,
  Shield,
  Eye,
  Plane,
  ShieldAlert,
  ClipboardCheck,
  FileText
};

interface ServiciosRelacionadosProps {
  servicioActual: string; // Slug del servicio actual
  titulo?: string;
  descripcion?: string;
  cantidadMostrar?: number;
}

export default function ServiciosRelacionados({ 
  servicioActual,
  titulo = "Servicios relacionados",
  descripcion = "Descubre otros servicios complementarios para una solución de seguridad integral",
  cantidadMostrar = 3
}: ServiciosRelacionadosProps) {
  // Estado para controlar el carrusel en móviles
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Filtrar servicios relacionados (excluyendo el servicio actual)
  const serviciosRelacionados = React.useMemo(() => {
    return servicios
      .filter(s => s.slug !== servicioActual)
      .slice(0, cantidadMostrar);
  }, [servicioActual, cantidadMostrar]);

  // Configuración de keen-slider para dispositivos móviles
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
    },
    mode: "snap",
    loop: serviciosRelacionados.length > 1
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
      <div className="gard-container max-w-7xl mx-auto px-4">
        <h2 className="text-heading-2 mb-6 text-center">{titulo}</h2>
        <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
          {descripcion}
        </p>
        
        {/* Vista de escritorio */}
        {!isMobile ? (
          <div className="flex justify-center gap-4 overflow-x-auto flex-wrap">
            {serviciosRelacionados.map((servicio, index) => (
              <Link 
                key={index} 
                href={`/servicios/${servicio.slug}`}
                className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col w-full md:w-[46%] lg:w-[30%] xl:w-[22%] mb-6"
              >
                <div className="relative aspect-[3/2] w-full mb-4">
                  <CloudflareImage
                    imageId={servicio.heroImageId}
                    alt={servicio.name}
                    fill
                    className="rounded-xl object-cover w-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out"
                  />
                </div>
                
                <div className="flex items-center justify-center my-4">
                  {renderIcon(servicio.icon)}
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 text-center">{servicio.name}</h3>
                
                <p className="text-sm text-muted-foreground mb-4 text-center flex-grow">
                  {servicio.description}
                </p>
                
                <div className="flex justify-center mt-auto">
                  <span className="inline-flex items-center text-primary dark:text-accent font-medium">
                    Ver servicio <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Vista de móvil con keen-slider */
          <div className="relative" ref={sliderContainerRef}>
            {/* Botones de navegación */}
            {loaded && instanceRef.current && serviciosRelacionados.length > 1 && (
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
              {serviciosRelacionados.map((servicio, index) => (
                <div key={index} className="keen-slider__slide px-2 py-2">
                  <Link 
                    href={`/servicios/${servicio.slug}`}
                    className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative aspect-[3/2] w-full mb-4">
                      <CloudflareImage
                        imageId={servicio.heroImageId}
                        alt={servicio.name}
                        fill
                        className="rounded-xl object-cover w-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out"
                      />
                    </div>
                    
                    <div className="flex items-center justify-center my-4">
                      {renderIcon(servicio.icon)}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
                      {servicio.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 text-center flex-grow">
                      {servicio.description}
                    </p>
                    
                    <div className="flex justify-center mt-auto">
                      <span className="inline-flex items-center text-primary dark:text-accent font-medium">
                        Ver servicio <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Indicadores de posición (dots) */}
            {loaded && instanceRef.current && serviciosRelacionados.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from(
                  { length: serviciosRelacionados.length },
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
        )}
      </div>
    </section>
  );
} 