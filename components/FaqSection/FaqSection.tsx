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
  ChevronLeft,
  ChevronRight
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
  'Guardias de Seguridad': <ShieldCheck className="h-6 w-6" />,
  'Monitoreo y CCTV': <Video className="h-6 w-6" />,
  'Drones de Seguridad': <Plane className="h-6 w-6" />,
  'Tecnología e Innovación': <Cpu className="h-6 w-6" />,
  'Empresa y Operación': <Building className="h-6 w-6" />
};

export default function FaqSection() {
  // Afirmamos que faqData es del tipo FaqCategories
  const typedFaqData = faqData as FaqCategories;
  const [activeTab, setActiveTab] = useState(Object.keys(typedFaqData)[0]);
  const categories = Object.keys(typedFaqData);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(400);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en dispositivo móvil
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

  // Reset expanded item when changing tab
  useEffect(() => {
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

  // Navegar a la categoría anterior
  const goToPrevCategory = () => {
    const currentIndex = categories.indexOf(activeTab);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
    setActiveTab(categories[prevIndex]);
  };

  // Navegar a la categoría siguiente
  const goToNextCategory = () => {
    const currentIndex = categories.indexOf(activeTab);
    const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
    setActiveTab(categories[nextIndex]);
  };

  return (
    <section ref={sectionRef} className="gard-section gard-section-alt py-12">
      <div className="gard-container max-w-5xl mx-auto px-4">
        <h2 
          ref={titleRef}
          className="text-heading-2 text-center mb-8"
          id="preguntas-frecuentes"
        >
          Preguntas Frecuentes
        </h2>
        
        <div className="w-full">
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
            {/* Navegación de categorías */}
            <div className="mb-8 relative">
              {/* Flechas de navegación para móvil */}
              <div className="md:hidden flex justify-between items-center mb-4">
                <button 
                  onClick={goToPrevCategory}
                  className="p-2 rounded-full hover:bg-muted/30 transition-colors text-primary"
                  aria-label="Categoría anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <div className="text-center text-sm font-medium">
                  {activeTab}
                </div>
                
                <button 
                  onClick={goToNextCategory}
                  className="p-2 rounded-full hover:bg-muted/30 transition-colors text-primary"
                  aria-label="Categoría siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              
              {/* Pestañas de categorías (visible en desktop, oculto en móvil) */}
              <div className="hidden md:flex justify-center">
                <TabsList className="flex flex-nowrap space-x-6 justify-center p-2 rounded-xl bg-muted/50">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="relative p-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                      title={category}
                    >
                      <span className={`flex items-center justify-center transition-colors ${activeTab === category ? 'text-primary' : 'text-muted-foreground'}`}>
                        {categoryIcons[category]}
                      </span>
                      
                      <span className="ml-2 text-sm">
                        {category}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {/* Vista de un solo icono para móvil */}
              <div className="flex md:hidden justify-center">
                <div className="p-3 rounded-xl bg-muted/50 flex items-center justify-center">
                  <span className="text-primary">
                    {categoryIcons[activeTab]}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Contenedor de contenido */}
            <div 
              ref={contentRef}
              className="relative"
              style={{ 
                minHeight: `350px`,
                transition: 'height 0.3s ease'
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {categories.map((category) => (
                  activeTab === category && (
                    <TabsContent 
                      key={category} 
                      value={category}
                      className="mt-0 w-full"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: isMobile ? 20 : 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isMobile ? -20 : 0 }}
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
                                        className="flex justify-between items-start w-full text-left py-4 px-3 hover:bg-muted/20 rounded-md transition-all duration-200 group"
                                        aria-expanded={isExpanded}
                                        aria-controls={`answer-${questionId}`}
                                      >
                                        <span className="text-base font-semibold dark:text-white pr-3">{item.question}</span>
                                        <span className="flex-shrink-0 ml-2 text-primary mt-1">
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
                                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}
                                    >
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ duration: 0.2 }}
                                          className="text-sm text-muted-foreground leading-relaxed mt-1 mb-3 px-4 py-3"
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
      </div>
    </section>
  );
} 