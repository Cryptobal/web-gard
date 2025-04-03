"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import { motion } from 'framer-motion';
import CloudflareImage from '@/components/CloudflareImage';
import { industries } from '@/app/data/industries';
import { 
  Mountain, 
  ShoppingCart, 
  Mic, 
  Boxes, 
  Stethoscope, 
  GraduationCap,
  Building2,
  Hammer,
  Truck,
  Factory,
  Landmark,
  Hotel,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mapeo de nombres de íconos a componentes de Lucide
const iconComponents: Record<string, React.ComponentType<any>> = {
  Mountain,
  ShoppingCart,
  Mic,
  Boxes,
  Stethoscope,
  GraduationCap,
  Building2,
  Hammer,
  Truck,
  Factory,
  Landmark,
  Hotel
};

// Interface para las props del componente
interface IndustriasGridPageProps {
  servicioSlug?: string; // Slug del servicio (opcional)
}

export default function IndustriasGridPage({ servicioSlug }: IndustriasGridPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en móvil
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

  // Función para renderizar el ícono correcto según el nombre
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6 mb-2 text-white" /> : null;
  };

  // Función para generar el slug de la industria
  const generateIndustrySlug = (name: string) => {
    return name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  };

  // Configuración simplificada del slider para mejor compatibilidad
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      loop: true, // Habilitar loop para navegación continua
      slides: {
        perView: 1,
        spacing: 16,
      },
      created() {
        setLoaded(true);
      }
    }
  );

  // Maneja la navegación del carrusel
  const handlePrev = () => {
    instanceRef.current?.prev();
  };

  const handleNext = () => {
    instanceRef.current?.next();
  };

  // Componente para versión desktop (grid)
  const DesktopGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {industries.map((industria) => {
        const slug = generateIndustrySlug(industria.name);
        
        // Determinar el enlace según el contexto
        const href = servicioSlug 
          ? `/servicios/${servicioSlug}/${slug}` // Para página de servicios
          : `/industrias/${slug}`; // Para página de industrias normal
        
        return (
          <Link 
            key={industria.name} 
            href={href}
            className="relative group overflow-hidden rounded-xl shadow-md aspect-[4/3] block hover:scale-[1.02] transition-transform duration-300"
          >
            <CloudflareImage
              imageId={industria.imageId}
              alt={`Industria de ${industria.name}`}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition z-10"></div>
            
            {/* Texto superpuesto */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
              {renderIcon(industria.icon)}
              <h3 className="text-white text-lg font-semibold drop-shadow-md">
                {industria.name}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );

  // Componente para versión móvil (carrusel)
  const MobileCarousel = () => (
    <div className="relative">
      {/* Botones de navegación */}
      {loaded && (
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between z-20 pointer-events-none px-2">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-primary dark:text-accent hover:scale-105 transition-all pointer-events-auto"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-primary dark:text-accent hover:scale-105 transition-all pointer-events-auto"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Carrusel */}
      <div ref={sliderRef} className="keen-slider py-2">
        {industries.map((industria, index) => {
          const slug = generateIndustrySlug(industria.name);
          
          // Determinar el enlace según el contexto
          const href = servicioSlug 
            ? `/servicios/${servicioSlug}/${slug}` // Para página de servicios
            : `/industrias/${slug}`; // Para página de industrias normal
          
          return (
            <div key={industria.name} className="keen-slider__slide px-4">
              <Link 
                href={href}
                className="relative block overflow-hidden rounded-xl shadow-lg aspect-[4/3]"
              >
                <CloudflareImage
                  imageId={industria.imageId}
                  alt={`Industria de ${industria.name}`}
                  fill
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
                
                {/* Texto superpuesto */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center" // Asegurar centrado
                  >
                    <div className="flex justify-center items-center mb-3"> {/* Contenedor centrado para el ícono */}
                      {renderIcon(industria.icon)}
                    </div>
                    <h3 className="text-white text-xl font-semibold drop-shadow-md text-center">
                      {industria.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-2 text-center max-w-[250px]">
                      Soluciones de seguridad especializadas para el sector {industria.name.toLowerCase()}
                    </p>
                  </motion.div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      
      {/* Indicadores de posición (dots) - Versión mejorada y más compacta */}
      {loaded && (
        <div className="flex justify-center mt-5">
          <div className="inline-flex bg-gray-200/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full p-1.5 gap-1.5">
            {/* Mostrar máximo 5 dots + indicador actual para evitar sobrecarga visual */}
            {industries.slice(0, Math.min(industries.length, 7)).map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  currentSlide === idx 
                    ? "bg-primary dark:bg-accent w-6" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                )}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            {industries.length > 7 && (
              <span className="text-xs text-white/70 ml-1">+{industries.length - 7}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Vista para móviles (carrusel) */}
      <div className={`${isMobile ? 'block' : 'hidden'}`}>
        <MobileCarousel />
      </div>
      
      {/* Vista para desktop (grid) */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <DesktopGrid />
      </div>
    </>
  );
} 