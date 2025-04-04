"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloudflareImage from '@/components/CloudflareImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GaleriaCarruselProps {
  imagenes: string[];
  titulo: string;
}

export default function GaleriaCarrusel({ imagenes, titulo }: GaleriaCarruselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Verificar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Funciones para navegación del carrusel
  const nextSlide = useCallback(() => {
    if (isMobile) {
      setCurrentIndex((prevIndex) => 
        prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      // En desktop avanzamos de 3 en 3
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 3;
        return nextIndex >= imagenes.length ? 0 : nextIndex;
      });
    }
  }, [isMobile, imagenes.length]);

  const prevSlide = useCallback(() => {
    if (isMobile) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
      );
    } else {
      // En desktop retrocedemos de 3 en 3
      setCurrentIndex((prevIndex) => {
        const prevIdx = prevIndex - 3;
        return prevIdx < 0 ? Math.max(0, imagenes.length - 3) : prevIdx;
      });
    }
  }, [isMobile, imagenes.length]);

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

  // Obtener imágenes a mostrar según el dispositivo
  const getVisibleImages = () => {
    if (isMobile) {
      // En móvil solo muestra una imagen
      return [imagenes[currentIndex]];
    } else {
      // En desktop muestra hasta 3 imágenes
      return imagenes.slice(currentIndex, currentIndex + 3);
    }
  };

  // Obtener el número de "páginas" para el indicador de posición
  const getTotalPages = () => {
    if (isMobile) {
      return imagenes.length;
    } else {
      return Math.ceil(imagenes.length / 3);
    }
  };

  // Obtener la página actual para el indicador de posición
  const getCurrentPage = () => {
    if (isMobile) {
      return currentIndex;
    } else {
      return Math.floor(currentIndex / 3);
    }
  };

  return (
    <div className="relative w-full pb-12">
      <div 
        className="relative aspect-video overflow-hidden rounded-xl"
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
            className={`grid grid-cols-1 ${!isMobile ? 'md:grid-cols-3' : ''} gap-4 w-full h-full`}
          >
            {getVisibleImages().map((imageId, index) => (
              <div key={index} className="relative aspect-video rounded-xl overflow-hidden shadow-sm">
                <CloudflareImage
                  imageId={imageId}
                  alt={`${titulo} - Imagen ${currentIndex + index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Botones de navegación */}
        <button 
          onClick={prevSlide} 
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 rounded-full p-2 text-white"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 rounded-full p-2 text-white"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Indicadores de posición */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: getTotalPages() }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(isMobile ? index : index * 3)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === getCurrentPage() ? 'bg-accent' : 'bg-gray-300'
            }`}
            aria-label={`Ir a página ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 