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

// Iconos por categoría
const categoryIcons: Record<string, React.ReactNode> = {
  'Guardias de Seguridad': <ShieldCheck className="h-8 w-8" />,
  'Monitoreo y CCTV': <Video className="h-8 w-8" />,
  'Drones de Seguridad': <Plane className="h-8 w-8" />,
  'Tecnología e Innovación': <Cpu className="h-8 w-8" />,
  'Empresa y Operación': <Building className="h-8 w-8" />
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
            <div className="mb-8 flex justify-center">
              <TabsList className="flex flex-nowrap space-x-5 md:space-x-6 justify-center p-3 rounded-xl bg-muted/50">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="relative p-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                    title={category}
                  >
                    {/* Mostrar solo íconos, con el activo en color primario */}
                    <span className={`flex items-center justify-center transition-colors ${activeTab === category ? 'text-primary' : 'text-muted-foreground'}`}>
                      {categoryIcons[category] || <HelpCircle className="h-8 w-8" />}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Nombre de la categoría seleccionada para mejor contexto */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-medium">{activeTab}</h3>
            </div>
            
            {/* Contenedor de contenido */}
            <div 
              ref={contentRef}
              className="relative min-h-[350px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {categories.map((category) => (
                  activeTab === category && (
                    <TabsContent 
                      key={category} 
                      value={category}
                      className="mt-0 w-full"
                      forceMount={activeTab === category ? true : undefined}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 0.3,
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