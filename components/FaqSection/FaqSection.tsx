'use client';

import React, { useState, useRef, useEffect } from 'react';
import { faqData } from '@/app/data/faqData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  ShieldCheck, 
  Video, 
  Plane, 
  Cpu, 
  Building,
  HelpCircle
} from 'lucide-react';

// Definimos una interfaz para los datos FAQ
interface FaqItem {
  question: string;
  answer: string;
}

// Creamos un tipo para las categorías de FAQ
type FaqCategories = {
  [key: string]: FaqItem[];
};

// Iconos por categoría para móviles
const categoryIcons: Record<string, React.ReactNode> = {
  'Guardias de Seguridad': <ShieldCheck className="h-5 w-5" />,
  'Monitoreo y CCTV': <Video className="h-5 w-5" />,
  'Drones de Seguridad': <Plane className="h-5 w-5" />,
  'Tecnología e Innovación': <Cpu className="h-5 w-5" />,
  'Empresa y Operación': <Building className="h-5 w-5" />
};

export default function FaqSection() {
  // Afirmamos que faqData es del tipo FaqCategories
  const typedFaqData = faqData as FaqCategories;
  const [activeTab, setActiveTab] = useState(Object.keys(typedFaqData)[0]);
  const categories = Object.keys(typedFaqData);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(400); // Altura predeterminada

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Precalcular alturas para transiciones fluidas
  useEffect(() => {
    const calculateHeights = () => {
      const heights: Record<string, number> = {};
      
      categories.forEach(category => {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.width = '100%';
        
        // Clonar el contenido para esta categoría
        tempDiv.innerHTML = `
          <div class="card border-0 shadow-sm">
            <div class="pt-6">
              <dl class="w-full divide-y divide-gray-200">
                ${typedFaqData[category].map(item => `
                  <div class="py-2 w-full">
                    <dt class="w-full">
                      <button class="flex justify-between items-center w-full py-5 px-3">
                        <span class="text-base font-semibold">${item.question}</span>
                      </button>
                    </dt>
                  </div>
                `).join('')}
              </dl>
            </div>
          </div>
        `;
        
        document.body.appendChild(tempDiv);
        heights[category] = tempDiv.offsetHeight + 30; // Extra padding
        document.body.removeChild(tempDiv);
      });
      
      // Establecer la altura máxima
      const maxHeight = Math.max(...Object.values(heights), 400);
      setContentHeight(maxHeight);
    };
    
    calculateHeights();
    
    window.addEventListener('resize', calculateHeights);
    return () => window.removeEventListener('resize', calculateHeights);
  }, [categories, typedFaqData]);

  // Scroll al título cuando cambia la categoría
  useEffect(() => {
    // Eliminar el scroll automático al cargar o cambiar pestañas
    // if (titleRef.current) {
    //   titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }
    // Reset expanded item when changing tab
    setExpandedItem(null);
  }, [activeTab]);

  // Manejar cambio de categoría
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Manejar expansión de pregunta
  const toggleQuestion = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="gard-section gard-section-alt py-12">
      <div className="gard-container max-w-5xl mx-auto px-4">
        <h2 
          ref={titleRef}
          className="text-heading-2 text-center mb-12"
          id="preguntas-frecuentes"
        >
          Preguntas Frecuentes
        </h2>
        
        <div className="w-full">
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative mb-8 overflow-hidden">
              <TabsList className="flex flex-nowrap overflow-x-auto pb-2 justify-start md:justify-center gap-2 w-full">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="relative rounded-xl py-2 px-4 text-sm md:text-base whitespace-nowrap flex-shrink-0 flex items-center justify-center"
                    title={category} // Para accesibilidad en caso de mostrar solo iconos
                  >
                    {/* En móvil mostramos solo iconos, en desktop texto */}
                    <span className="md:block hidden">{category}</span>
                    <span className="md:hidden flex items-center justify-center" aria-hidden="true">
                      {categoryIcons[category] || <HelpCircle className="h-5 w-5" />}
                    </span>
                    
                    {activeTab === category && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Contenedor con altura fija para evitar saltos en transiciones */}
            <div 
              ref={contentRef}
              className="relative"
              style={{ 
                height: `${contentHeight}px`, 
                overflow: 'hidden',
                transition: 'height 0.3s ease'
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {categories.map((category) => (
                  activeTab === category && (
                    <TabsContent 
                      key={category} 
                      value={category}
                      className="mt-4 w-full absolute top-0 left-0"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 0.25,
                          ease: "easeInOut"
                        }}
                        className="w-full"
                      >
                        <Card className="border-0 shadow-sm">
                          <CardContent className="pt-6">
                            <dl className="w-full divide-y divide-gray-200 dark:divide-gray-800">
                              {typedFaqData[category].map((item: FaqItem, index: number) => {
                                const questionId = `${category}-question-${index}`;
                                const isExpanded = expandedItem === questionId;
                                
                                return (
                                  <div 
                                    key={index} 
                                    className="py-2 w-full"
                                  >
                                    <dt className="w-full">
                                      <button 
                                        onClick={() => toggleQuestion(questionId)}
                                        className="flex justify-between items-center w-full text-left py-5 px-3 hover:bg-muted/20 rounded-md transition-all duration-200 group"
                                        aria-expanded={isExpanded}
                                        aria-controls={`answer-${questionId}`}
                                      >
                                        <span className="text-base font-semibold dark:text-white">{item.question}</span>
                                        <span className="flex-shrink-0 ml-2 text-primary">
                                          {isExpanded ? (
                                            <Minus className="h-4 w-4 transition-transform duration-300" />
                                          ) : (
                                            <Plus className="h-4 w-4 transition-transform duration-300" />
                                          )}
                                        </span>
                                      </button>
                                    </dt>
                                    <dd 
                                      id={`answer-${questionId}`}
                                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}
                                    >
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ duration: 0.2 }}
                                          className="text-sm text-muted-foreground leading-relaxed mt-2 pl-4 py-3"
                                        >
                                          {item.answer}
                                        </motion.div>
                                      )}
                                    </dd>
                                  </div>
                                );
                              })}
                            </dl>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>
                  )
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
        
        {/* Datos estructurados para SEO (comentado para futura implementación) */}
        {/* 
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                ${categories.flatMap(category => 
                  typedFaqData[category].map(item => `
                    {
                      "@type": "Question",
                      "name": "${item.question}",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "${item.answer}"
                      }
                    }
                  `)
                ).join(',')}
              ]
            }
          `}
        </script>
        */}
      </div>
    </section>
  );
} 