'use client';

/**
 * COMPONENTE PRINCIPAL DE CARRUSEL
 * 
 * Este componente implementa toda la funcionalidad del carrusel:
 * 1. Navegación con flechas y paginación visual
 * 2. Comportamiento responsivo (3 imágenes en desktop, 2 en tablet, 1 en móvil)
 * 3. Animaciones y transiciones suaves
 * 4. Navegación táctil en dispositivos móviles
 * 5. Controles accesibles mediante teclado
 * 
 * Es un componente reutilizable que puede recibir cualquier conjunto de IDs de imágenes
 * para mostrarlas con la misma experiencia visual.
 */

import { useState, useRef, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { cn } from '@/lib/utils';

interface GaleriaGuardiasCarruselProps {
  imageIds: string[];
  title?: string;
}

export default function GaleriaGuardiasCarrusel({ imageIds, title = "Galería de Guardias de Seguridad" }: GaleriaGuardiasCarruselProps) {
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
  
  // Configurar si el desplazamiento es táctil
  const dragMode = () => {
    return isMobile ? "free" : "snap";
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
  
  // Manejar eventos táctiles para evitar scroll no deseado
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Solo en móviles y cuando el touch está en el área del slider
      if (isMobile && sliderContainerRef.current?.contains(e.target as Node)) {
        // Prevenir el scroll vertical mientras se interactúa con el slider
        document.body.style.overflow = 'hidden';
      }
    };
    
    const handleTouchEnd = () => {
      // Restaurar el scroll cuando termina la interacción
      if (isMobile) {
        document.body.style.overflow = '';
      }
    };
    
    if (sliderContainerRef.current) {
      sliderContainerRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
      sliderContainerRef.current.addEventListener('touchend', handleTouchEnd);
      sliderContainerRef.current.addEventListener('touchcancel', handleTouchEnd);
    }
    
    return () => {
      if (sliderContainerRef.current) {
        sliderContainerRef.current.removeEventListener('touchstart', handleTouchStart);
        sliderContainerRef.current.removeEventListener('touchend', handleTouchEnd);
        sliderContainerRef.current.removeEventListener('touchcancel', handleTouchEnd);
      }
    };
  }, [isMobile]);
  
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
    // Permitir avanzar por grupos en escritorio pero individualmente en móvil
    mode: "snap",
    drag: true,
    dragSpeed: 1,
    // Prevenir que el swipe interfiera con el scroll de la página
    rubberband: false,
    // En escritorio avanzamos de 3 en 3, en móvil de 1 en 1
    breakpoints: {
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 16 },
        mode: "snap",
      },
      '(min-width: 640px) and (max-width: 1023px)': {
        slides: { perView: 2, spacing: 16 },
        mode: "snap",
      },
      '(max-width: 639px)': {
        slides: { perView: 1, spacing: 10 },
        mode: "free-snap", // Modo más táctil para móviles
      },
    },
  });

  // Maneja la navegación del carrusel
  const handlePrev = () => {
    if (instanceRef.current) {
      const slidesToMove = isMobile ? 1 : slidesPerView();
      const currentIdx = instanceRef.current.track.details.rel;
      const targetIdx = Math.max(0, currentIdx - slidesToMove);
      instanceRef.current.moveToIdx(targetIdx);
    }
  };

  const handleNext = () => {
    if (instanceRef.current) {
      const slidesToMove = isMobile ? 1 : slidesPerView();
      const currentIdx = instanceRef.current.track.details.rel;
      const maxIdx = instanceRef.current.track.details.slides.length - slidesPerView();
      const targetIdx = Math.min(maxIdx, currentIdx + slidesToMove);
      instanceRef.current.moveToIdx(targetIdx);
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
  }, [isMobile]);

  // Animaciones para las imágenes
  const imageVariants = {
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

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto">
        {title && title !== "Galería de Guardias de Seguridad" && (
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-heading-2 text-center text-gray-900 dark:text-white font-title mb-10"
          >
            {title}
          </motion.h2>
        )}
        
        <div 
          className="relative px-4"
          ref={sliderContainerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          tabIndex={0}
          aria-label="Galería de guardias de seguridad"
          role="region"
        >
          {/* Botones de navegación - Siempre visibles en móvil, solo al hover en desktop */}
          {loaded && instanceRef.current && (
            <div className={cn(
              "absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between z-10 pointer-events-none",
              isMobile ? "opacity-100" : isHovering ? "opacity-100" : "opacity-0 transition-opacity duration-300"
            )}>
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
          
          {/* Carrusel */}
          <div className="keen-slider-container">
            <div 
              ref={sliderRef} 
              className="keen-slider cursor-grab active:cursor-grabbing touch-manipulation"
            >
              {imageIds.map((imageId, index) => (
                <motion.div
                  key={`guard-image-${imageId}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={imageVariants}
                  custom={index}
                  className="keen-slider__slide px-2 py-2 h-full"
                >
                  <div 
                    className={cn(
                      "h-[300px] md:h-[360px]",
                      "bg-white dark:bg-gray-800",
                      "rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700",
                      "overflow-hidden",
                      "hover:scale-[1.02] transition-transform duration-300"
                    )}
                  >
                    <CloudflareImage 
                      imageId={imageId}
                      alt="Guardia de seguridad Gard"
                      fill={true}
                      className="object-cover" 
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Indicadores (dots) */}
          {loaded && instanceRef.current && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from(
                { length: isMobile 
                  ? instanceRef.current.track.details.slides.length 
                  : Math.ceil(imageIds.length / slidesPerView())
                },
                (_, idx) => {
                  // En escritorio, cada dot representa un grupo de imágenes
                  // En móvil, cada dot representa una imagen individual
                  const isActive = isMobile
                    ? currentSlide === idx
                    : Math.floor(currentSlide / slidesPerView()) === idx;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        const targetIdx = isMobile ? idx : idx * slidesPerView();
                        instanceRef.current?.moveToIdx(targetIdx);
                      }}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300",
                        isActive ? "bg-primary w-8" : "bg-gray-300 dark:bg-gray-700"
                      )}
                      aria-label={isMobile 
                        ? `Imagen ${idx + 1}` 
                        : `Grupo de imágenes ${idx + 1}`
                      }
                    />
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 