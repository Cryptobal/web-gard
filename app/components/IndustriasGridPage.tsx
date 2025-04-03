"use client";

import React, { useState, useEffect } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalIndustries = industries.length;

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

  // Funciones simples de navegación
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalIndustries);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalIndustries) % totalIndustries);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
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

  // Componente para versión móvil (carrusel) - implementación simplificada sin keen-slider
  const MobileCarousel = () => {
    const currentIndustria = industries[currentIndex];
    const slug = generateIndustrySlug(currentIndustria.name);
    
    // Determinar el enlace según el contexto
    const href = servicioSlug 
      ? `/servicios/${servicioSlug}/${slug}` // Para página de servicios
      : `/industrias/${slug}`; // Para página de industrias normal
    
    return (
      <div className="relative px-4 py-2">
        {/* Botones de navegación */}
        <div className="absolute left-2 right-2 top-1/2 transform -translate-y-1/2 flex justify-between z-30 pointer-events-none">
          <button 
            onClick={goToPrev}
            className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center text-primary dark:text-accent hover:scale-105 transition-all pointer-events-auto"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center text-primary dark:text-accent hover:scale-105 transition-all pointer-events-auto"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Slide actual */}
        <div className="w-full">
          <Link 
            href={href}
            className="relative block overflow-hidden rounded-xl shadow-lg aspect-[4/3]"
          >
            <CloudflareImage
              imageId={currentIndustria.imageId}
              alt={`Industria de ${currentIndustria.name}`}
              fill
              className="w-full h-full object-cover"
            />
            
            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
            
            {/* Texto superpuesto */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
              <div className="flex flex-col items-center justify-center text-center bg-black/20 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex justify-center items-center mb-3">
                  {renderIcon(currentIndustria.icon)}
                </div>
                <h3 className="text-white text-xl font-semibold drop-shadow-md text-center">
                  {currentIndustria.name}
                </h3>
                <p className="text-white/80 text-sm mt-3 text-center max-w-[250px]">
                  Soluciones de seguridad especializadas para el sector {currentIndustria.name.toLowerCase()}
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Indicadores mejorados y más grandes */}
        <div className="flex justify-center mt-4">
          <div className="flex gap-3 py-2">
            {industries.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={cn(
                  "transition-all duration-300",
                  currentIndex === idx 
                    ? "w-16 h-4 bg-primary dark:bg-accent rounded-full" 
                    : "w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400"
                )}
                aria-label={`Ir a industria ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

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