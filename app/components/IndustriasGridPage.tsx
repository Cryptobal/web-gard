"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CloudflareImage } from '@/components/ui';
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
  // Estado para controlar la industria visible en móvil
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint en Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  // Navegar a la industria anterior
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : industries.length - 1));
  };

  // Navegar a la industria siguiente
  const goToNext = () => {
    setCurrentIndex((prev) => (prev < industries.length - 1 ? prev + 1 : 0));
  };

  // Renderizar una industria individual (tanto para móvil como desktop)
  const renderIndustria = (industria: typeof industries[0], index: number) => {
    const slug = generateIndustrySlug(industria.name);
    
    // Determinar el enlace según el contexto
    const href = servicioSlug 
      ? `/servicios/${servicioSlug}/${slug}` // Para página de servicios
      : `/industrias/${slug}`; // Para página de industrias normal
    
    console.log(`Industria: ${industria.name}, Slug: ${slug}, URL: ${href}`); // Depuración
    
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
          <h3 className="text-white text-lg font-semibold text-center drop-shadow-md">
            {industria.name}
          </h3>
        </div>
      </Link>
    );
  };

  // Vista de carrusel para móvil
  if (isMobile) {
    return (
      <div className="relative">
        {/* Contenedor del carrusel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full"
            >
              {renderIndustria(industries[currentIndex], currentIndex)}
            </motion.div>
          </AnimatePresence>
          
          {/* Botones de navegación */}
          <button 
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-primary p-2 rounded-full transition-colors w-12 h-12 flex items-center justify-center"
            aria-label="Industria anterior"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-primary p-2 rounded-full transition-colors w-12 h-12 flex items-center justify-center"
            aria-label="Industria siguiente"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
        
        {/* Indicadores (dots) en lugar del contador numérico */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: industries.length }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                currentIndex === idx 
                  ? "bg-primary w-8" 
                  : "bg-gray-300 dark:bg-gray-700"
              )}
              aria-label={`Industria ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Vista de grid para desktop (comportamiento original)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {industries.map((industria, index) => renderIndustria(industria, index))}
    </div>
  );
} 