"use client";

import React, { useState, useEffect, useRef } from 'react';
import CloudflareImage from '@/components/CloudflareImage';
import { clients } from '@/app/data/clients';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TrustedClients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Determinar el número de clientes a mostrar por diapositiva en móvil
  const clientsPerSlide = 2;
  const totalSlides = Math.ceil(clients.length / clientsPerSlide);
  
  // Detectar si estamos en móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Navegar a la diapositiva anterior
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };
  
  // Navegar a la diapositiva siguiente
  const goToNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };
  
  // Obtener clientes para la diapositiva actual
  const getCurrentClients = () => {
    const startIndex = currentIndex * clientsPerSlide;
    return clients.slice(startIndex, startIndex + clientsPerSlide);
  };

  return (
    <section className="bg-[#0F172A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-4"
        >
          Empresas que confían en nosotros
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-slate-400 mb-10"
        >
          Nos eligen líderes de industrias exigentes en todo Chile
        </motion.p>
        
        {/* Vista móvil con carrusel */}
        {isMobile ? (
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
                  <div className="grid grid-cols-2 gap-6 place-items-center">
                    {getCurrentClients().map((client, index) => (
                      <motion.div 
                        key={client.imageId}
                        className="flex items-center justify-center h-32 w-full"
                      >
                        <div 
                          className="max-h-16 h-auto relative w-full"
                          title={client.name}
                        >
                          <CloudflareImage
                            imageId={client.imageId}
                            alt={client.name}
                            width={100}
                            height={48}
                            className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition duration-300"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Botones de navegación */}
              <button 
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-primary p-2 rounded-full transition-colors w-12 h-12 flex items-center justify-center"
                aria-label="Clientes anteriores"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              
              <button 
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 text-primary p-2 rounded-full transition-colors w-12 h-12 flex items-center justify-center"
                aria-label="Clientes siguientes"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>
            
            {/* Indicadores (dots) */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalSlides }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    currentIndex === idx 
                      ? "bg-primary w-8" 
                      : "bg-gray-600"
                  )}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Vista de escritorio original
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center">
            {clients.map((client, index) => (
              <motion.div 
                key={client.imageId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  ease: "easeOut" 
                }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <div 
                  className="max-h-12 h-auto relative w-full"
                  title={client.name}
                >
                  <CloudflareImage
                    imageId={client.imageId}
                    alt={client.name}
                    width={100}
                    height={48}
                    className="object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 