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
import { cn } from '@/lib/utils';

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
        heights[category] = tempDiv.offsetHeight + 100; // Extra padding aumentado para evitar cortes
        document.body.removeChild(tempDiv);
      });
      
      // Establecer la altura máxima con más margen para móviles
      const maxHeight = Math.max(...Object.values(heights), 500);
      setContentHeight(isMobile ? maxHeight + 100 : maxHeight);
    };
    
    calculateHeights();
    
    window.addEventListener('resize', calculateHeights);
    return () => window.removeEventListener('resize', calculateHeights);
  }, [categories, typedFaqData, isMobile]);

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

  return (
    <section 
      ref={sectionRef} 
      className="gard-section py-16 md:py-24 bg-gradient-to-b from-[#0D0F1C] to-[#171B2F] relative overflow-hidden"
    >
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat"
        }}>
      </div>
      
      <div className="gard-container max-w-5xl mx-auto px-4 relative z-10">
        <motion.h2 
          ref={titleRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-heading-2 text-center mb-12 text-white"
          id="preguntas-frecuentes"
        >
          Preguntas Frecuentes
        </motion.h2>
        
        <div className="w-full">
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative mb-8 overflow-hidden">
              <TabsList className="flex flex-nowrap overflow-x-auto pb-3 justify-start md:justify-center gap-2 md:gap-3 w-full bg-transparent">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className={cn(
                      "relative rounded-xl py-2 px-3 md:py-2.5 md:px-4 text-sm md:text-base whitespace-nowrap flex-shrink-0",
                      "flex items-center justify-center transition-all duration-300",
                      "text-white/80 hover:text-white font-medium",
                      "data-[state=active]:text-white",
                      "border-b-2 border-transparent",
                      "data-[state=active]:border-primary dark:data-[state=active]:border-accent"
                    )}
                    title={category}
                  >
                    {/* En móviles mostraremos textos abreviados o nombres completos según el espacio */}
                    <span className="hidden md:block">{category}</span>
                    <span className="block md:hidden">
                      {category === 'Guardias de Seguridad' ? 'Guardias' : 
                       category === 'Monitoreo y CCTV' ? 'Monitoreo' :
                       category === 'Drones de Seguridad' ? 'Drones' :
                       category === 'Tecnología e Innovación' ? 'Tecnología' :
                       category === 'Empresa y Operación' ? 'Empresa' : 
                       category}
                    </span>
                    
                    {activeTab === category && (
                      <motion.div
                        layoutId="tab-background"
                        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Contenedor con altura dinámica para evitar saltos y cortes en transiciones */}
            <div 
              ref={contentRef}
              className="relative"
              style={{ 
                height: `${contentHeight}px`, 
                minHeight: isMobile ? "600px" : "400px", // Altura mínima para asegurar que todo sea visible
                overflow: 'hidden',
                transition: 'height 0.4s ease'
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
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ 
                          duration: 0.4,
                          ease: "easeInOut"
                        }}
                        className="w-full"
                      >
                        <Card className="border-0 shadow-lg bg-[#151824]/80 backdrop-blur-sm rounded-xl overflow-hidden">
                          <CardContent className="pt-6 pb-10"> {/* Añadido padding bottom para evitar cortes */}
                            <dl className="w-full divide-y divide-gray-700/30">
                              {typedFaqData[category].map((item: FaqItem, index: number) => {
                                const questionId = `${category}-question-${index}`;
                                const isExpanded = expandedItem === questionId;
                                
                                return (
                                  <div 
                                    key={index} 
                                    className="py-3 w-full"
                                  >
                                    <dt className="w-full">
                                      <button 
                                        onClick={() => toggleQuestion(questionId)}
                                        className={cn(
                                          "flex justify-between items-center w-full text-left py-5 px-4",
                                          "hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg transition-all duration-300",
                                          "group transform hover:translate-x-1"
                                        )}
                                        aria-expanded={isExpanded}
                                        aria-controls={`answer-${questionId}`}
                                      >
                                        <span className="text-base font-semibold text-white group-hover:text-primary dark:group-hover:text-accent transition-colors">
                                          {item.question}
                                        </span>
                                        <span className="flex-shrink-0 ml-3">
                                          {isExpanded ? (
                                            <motion.div
                                              initial={{ rotate: 0 }}
                                              animate={{ rotate: 45 }}
                                              transition={{ duration: 0.3 }}
                                              className="flex items-center justify-center" // Centrar icono
                                            >
                                              <Plus className="h-5 w-5 text-accent" />
                                            </motion.div>
                                          ) : (
                                            <motion.div
                                              whileHover={{ scale: 1.2 }}
                                              transition={{ duration: 0.2 }}
                                              className="flex items-center justify-center" // Centrar icono
                                            >
                                              <Plus className="h-5 w-5 text-primary" />
                                            </motion.div>
                                          )}
                                        </span>
                                      </button>
                                    </dt>
                                    <dd 
                                      id={`answer-${questionId}`}
                                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`} // Aumentado max-height
                                    >
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0, y: -10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -10 }}
                                          transition={{ duration: 0.4, ease: "easeOut" }}
                                          className="px-4 py-4 my-2 ml-2 mr-4 bg-gray-800/50 rounded-lg text-gray-200 text-sm leading-relaxed border-l-2 border-primary/30"
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