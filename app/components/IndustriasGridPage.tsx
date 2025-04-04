"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
import { motion, AnimatePresence } from 'framer-motion';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Verificar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
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

  // Funciones para navegación del carrusel
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === industries.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? industries.length - 1 : prevIndex - 1
    );
  }, []);

  // Funciones para detectar gestos táctiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Deslizamiento hacia la izquierda
      nextSlide();
    }
    
    if (touchEnd - touchStart > 50) {
      // Deslizamiento hacia la derecha
      prevSlide();
    }
  };

  // Si es móvil, mostrar carrusel
  if (isMobile) {
    const industria = industries[currentIndex];
    const slug = generateIndustrySlug(industria.name);
    const href = servicioSlug 
      ? `/servicios/${servicioSlug}/${slug}` 
      : `/industrias/${slug}`;

    return (
      <div className="relative w-full pb-12">
        <div 
          className="relative aspect-[4/3] overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Link href={href} className="block w-full h-full relative">
                <CloudflareImage
                  imageId={industria.imageId}
                  alt={`Industria de ${industria.name}`}
                  fill
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/40 transition z-10"></div>
                
                {/* Texto superpuesto */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
                  {renderIcon(industria.icon)}
                  <h3 className="text-white text-lg font-semibold drop-shadow-md">
                    {industria.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
          
          {/* Botones de navegación */}
          <button 
            onClick={(e) => { e.preventDefault(); prevSlide(); }} 
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 rounded-full p-2 text-white"
            aria-label="Anterior industria"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={(e) => { e.preventDefault(); nextSlide(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 rounded-full p-2 text-white"
            aria-label="Siguiente industria"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Indicadores de posición */}
        <div className="flex justify-center mt-4 space-x-2">
          {industries.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-accent' : 'bg-gray-300'
              }`}
              aria-label={`Ir a industria ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // En pantallas más grandes, mantener el grid original
  return (
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
} 