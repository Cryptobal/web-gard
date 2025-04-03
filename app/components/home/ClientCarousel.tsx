'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import { CloudflareImage } from '@/components/ui';
import { CLIENTES } from '@/app/data/clientes';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ClientCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  
  // Función para determinar cuántas diapositivas mostrar según el ancho de la ventana
  const slidesPerView = () => {
    if (typeof window === 'undefined') return 3; // Default para SSR
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };
  
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

  return (
    <section className="py-20 md:py-28 w-full bg-background dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-heading-2 text-gray-900 dark:text-white font-title mb-4">
            Empresas que confían en nosotros
          </h2>
          <p className="text-body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Brindamos soluciones de seguridad a líderes de diversas industrias en todo Chile
          </p>
        </div>
        
        <div className="relative px-4">
          {/* Botones de navegación */}
          {loaded && instanceRef.current && (
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between z-10 pointer-events-none">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center text-primary dark:text-accent hover:scale-105 transition-all pointer-events-auto"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center text-primary dark:text-accent hover:scale-105 transition-all pointer-events-auto"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Carrusel */}
          <div className="keen-slider-container">
            <div ref={sliderRef} className="keen-slider">
              {CLIENTES.map((cliente) => (
                <Link
                  key={cliente.imageId}
                  href={cliente.link || "#"}
                  target={cliente.link ? "_blank" : undefined}
                  rel={cliente.link ? "noopener noreferrer" : undefined}
                  role="link"
                  aria-label={cliente.nombre}
                  className={cn(
                    "keen-slider__slide h-full",
                    cliente.link ? "cursor-pointer" : "cursor-default"
                  )}
                >
                  <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col h-full">
                      {/* Logo del cliente */}
                      <div className="relative h-16 mb-4 flex items-center justify-center">
                        <CloudflareImage 
                          imageId={cliente.imageId}
                          alt={`Logo de ${cliente.nombre}`}
                          width={180}
                          height={64}
                          className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      
                      <h3 className="text-heading-4 text-gray-900 dark:text-white font-title mb-2">
                        {cliente.nombre}
                      </h3>
                      
                      <p className="text-body-base text-gray-600 dark:text-gray-300 mb-4">
                        {cliente.industria}
                      </p>
                      
                      <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-4 flex-grow">
                        "{cliente.frase}"
                      </p>
                      
                      {/* Link */}
                      <div className="mt-auto">
                        {cliente.link ? (
                          <div className="inline-flex items-center text-primary dark:text-accent gap-1 group">
                            <span>Visitar sitio</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">
                            Sitio no disponible
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Indicadores (dots) */}
          {loaded && instanceRef.current && (
            <div className="flex justify-center mt-6 gap-4">
              {Array.from(
                { length: Math.max(1, instanceRef.current.track.details.slides.length - slidesPerView() + 1) },
                (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={cn(
                      "w-6 h-6 rounded-full transition-all flex items-center justify-center",
                      currentSlide === idx 
                        ? "bg-primary dark:bg-accent w-8" 
                        : "bg-gray-300 dark:bg-zinc-700"
                    )}
                    aria-label={`Slide ${idx + 1}`}
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