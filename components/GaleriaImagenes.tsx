"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CloudflareImage from '@/components/CloudflareImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GaleriaImagenesProps {
  imagenes: string[];
  titulo: string;
}

export default function GaleriaImagenes({ imagenes, titulo }: GaleriaImagenesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  // Obtener imágenes a mostrar según el dispositivo
  const getVisibleImages = () => {
    if (isMobile) {
      // En móvil solo muestra una imagen
      return [imagenes[currentIndex]];
    } else {
      // En desktop muestra hasta 3 imágenes
      const startIndex = currentIndex;
      const endIndex = Math.min(startIndex + 3, imagenes.length);
      return imagenes.slice(startIndex, endIndex);
    }
  };

  // Calcular número total de páginas
  const totalPages = isMobile 
    ? imagenes.length 
    : Math.ceil(imagenes.length / 3);

  // Función para ir a la siguiente página
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const increment = isMobile ? 1 : 3;
      const newIndex = prevIndex + increment;
      return newIndex >= imagenes.length ? 0 : newIndex;
    });
  };

  // Función para ir a la página anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const decrement = isMobile ? 1 : 3;
      const newIndex = prevIndex - decrement;
      return newIndex < 0 ? (isMobile ? imagenes.length - 1 : (Math.floor((imagenes.length - 1) / 3) * 3)) : newIndex;
    });
  };

  // Ir a una página específica
  const goToPage = (page: number) => {
    setCurrentIndex(isMobile ? page : page * 3);
  };

  // Obtener la página actual
  const getCurrentPage = () => {
    return isMobile ? currentIndex : Math.floor(currentIndex / 3);
  };

  return (
    <div className="relative w-full">
      {/* Carrusel de imágenes */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
        
        {/* Flechas de navegación */}
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 transform -translate-y-1/2 left-4 z-30 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Imágenes anteriores"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 z-30 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Siguientes imágenes"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Indicadores de página */}
      <div className="flex justify-center gap-2 mb-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === getCurrentPage() ? 'bg-orange-500' : 'bg-gray-400'
            }`}
            aria-label={`Ir a página ${index + 1} de imágenes`}
          />
        ))}
      </div>
    </div>
  );
} 