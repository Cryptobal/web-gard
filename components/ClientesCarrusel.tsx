'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { CLIENTES } from '@/app/data/clientes';
import { cn } from '@/lib/utils';

export default function ClientesCarrusel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  
  // Función para determinar cuántas diapositivas mostrar según el ancho de la ventana
  const slidesPerView = () => {
    if (typeof window === 'undefined') return 3; // Default para SSR
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };
  
  // Detectar si estamos en mobile
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
  
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: slidesPerView,
      spacing: 16,
    },
    created() {
      setLoaded(true);
    },
  });

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

  // Manejo de navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === sliderContainerRef.current || 
          sliderContainerRef.current?.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          handlePrev();
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          handleNext();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Animaciones para las tarjetas
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  // Animaciones para el logo en hover
  const logoVariants = {
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.3 } 
    }
  };

  return (
    <section className="py-20 md:py-28 w-full bg-white dark:bg-[#0D0F1C]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-heading-2 text-blue-900 dark:text-white font-title mb-4"
          >
            Empresas que confían en nosotros
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Brindamos soluciones de seguridad a líderes de diversas industrias en todo Chile
          </motion.p>
        </div>
        
        <div 
          className="relative px-4"
          ref={sliderContainerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          tabIndex={0}
          aria-label="Carrusel de clientes"
          role="region"
        >
          {/* Botones de navegación */}
          {loaded && instanceRef.current && (
            <>
              <button 
                onClick={handlePrev}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 left-0 z-10",
                  "w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 dark:bg-[#1A1A1A] shadow-md",
                  "flex items-center justify-center text-white transition-all pointer-events-auto",
                  (isHovering || isMobile) ? "opacity-100" : "opacity-0"
                )}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 right-0 z-10",
                  "w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 dark:bg-[#1A1A1A] shadow-md",
                  "flex items-center justify-center text-white transition-all pointer-events-auto",
                  (isHovering || isMobile) ? "opacity-100" : "opacity-0"
                )}
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          {/* Carrusel */}
          <div className="keen-slider-container">
            <div 
              ref={sliderRef} 
              className="keen-slider"
            >
              {CLIENTES.map((cliente, index) => (
                <motion.div
                  key={cliente.imageId}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  custom={index}
                  className="keen-slider__slide px-2 py-2 h-full"
                >
                  <div 
                    className={cn(
                      "h-[340px] md:h-[360px] lg:h-[380px]",
                      "bg-gray-100 dark:bg-[#1C1C1E]",
                      "rounded-xl shadow-lg shadow-black/10 overflow-hidden",
                      "flex flex-col items-center justify-center text-center gap-y-2",
                      "p-6 lg:p-8 hover:scale-[1.02] transition-transform duration-300"
                    )}
                  >
                    {/* Logo del cliente - clickeable si hay link */}
                    <div className="flex items-center justify-center w-full h-1/3 mb-4">
                      {cliente.link ? (
                        <Link
                          href={cliente.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visitar sitio web de ${cliente.nombre}`}
                          className="cursor-pointer group flex items-center justify-center"
                        >
                          <motion.div
                            whileHover="hover"
                            variants={logoVariants}
                            className="w-24 md:w-28 lg:w-32 h-auto flex items-center justify-center"
                          >
                            <CloudflareImage 
                              imageId={cliente.imageId}
                              alt={`Logo de ${cliente.nombre} - ${cliente.industria}`}
                              width={200}
                              height={80}
                              className="object-contain max-h-full dark:invert"
                            />
                          </motion.div>
                        </Link>
                      ) : (
                        <div className="w-24 md:w-28 lg:w-32 h-auto flex items-center justify-center">
                          <CloudflareImage 
                            imageId={cliente.imageId}
                            alt={`Logo de ${cliente.nombre} - ${cliente.industria}`}
                            width={200}
                            height={80}
                            className="object-contain max-h-full dark:invert"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Información del cliente */}
                    <div className="flex flex-col items-center flex-grow">
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-blue-900 dark:text-white">
                        {cliente.nombre}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {cliente.industria}
                      </p>
                      
                      <p className="text-sm italic text-gray-500 dark:text-slate-300">
                        "{cliente.frase}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Indicadores (dots) */}
          {loaded && instanceRef.current && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from(
                { length: Math.max(1, instanceRef.current.track.details.slides.length - slidesPerView() + 1) },
                (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      currentSlide === idx 
                        ? "bg-blue-600 dark:bg-blue-400 w-6" 
                        : "bg-gray-300 dark:bg-gray-700"
                    )}
                    aria-label={`Ir a slide ${idx + 1}`}
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