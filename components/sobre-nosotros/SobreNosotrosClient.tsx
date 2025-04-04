'use client';

import React from 'react';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { ArrowRight, CheckCircle, Clock, Zap, Shield, Users, Cpu, MonitorSmartphone, HeartHandshake, BookOpen, Bell, Clock4 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import CanonicalUrl from '@/components/seo/CanonicalUrl';
import SEODevPanel from '@/components/seo/SEODevPanel';

export default function SobreNosotrosClient() {
  return (
    <>
      {/* Componentes SEO */}
      <CanonicalUrl />
      <SEODevPanel />
      
      {/* Hero Section */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00"
            alt="Equipo de Gard Security"
            fill
            className="object-cover"
            objectPosition="center"
            priority
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="bg-gradient-to-t from-black/60 to-transparent absolute inset-0 z-10"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl mb-6"
          >
            Somos Gard Security: tu socio en protección empresarial
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white text-xl max-w-2xl mb-8"
          >
            Más de 20 años resguardando instalaciones críticas, con tecnología avanzada y equipos altamente capacitados.
          </motion.p>
        </div>
      </section>

      {/* Historia y trayectoria */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 my-12">
        <div className="max-w-content-xl">
          <h2 className="text-heading-2 mb-8">Historia y trayectoria</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-body-lg mb-6">
                Gard Security nace desde la experiencia real de empresarios del rubro, que entendieron que la seguridad no se trata solo de presencia física, sino de estrategia, eficiencia y tecnología.
              </p>
              <p className="text-body-base mb-6">
                Con más de dos décadas operando en sectores como minería, infraestructura crítica y retail, desarrollamos un modelo operativo robusto, flexible y escalable.
              </p>
              <p className="text-body-base">
                Nuestra historia es la de cientos de empresas que confiaron en nosotros para proteger su negocio y su gente.
              </p>
            </div>
            
            <div className="relative h-[300px] md:h-full rounded-xl overflow-hidden">
              <CloudflareImage
                imageId="7d33f2ab-1ad7-4f8d-11c3-e82a0b54db00"
                alt="Trayectoria de Gard Security"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Timeline de la empresa */}
          <div className="mt-16">
            <h3 className="text-heading-3 mb-8">Nuestra trayectoria</h3>
            <div className="relative border-l-2 border-primary/20 pl-8 pb-4 space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">2002</span>
                  <h4 className="text-heading-4">Fundación</h4>
                </div>
                <p className="text-body-base">Nacimiento de Gard Security como respuesta a la necesidad de seguridad especializada para empresas.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">2010</span>
                  <h4 className="text-heading-4">Expansión nacional</h4>
                </div>
                <p className="text-body-base">Ampliación de operaciones a todo el territorio nacional, con foco en industrias críticas.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">2015</span>
                  <h4 className="text-heading-4">Integración tecnológica</h4>
                </div>
                <p className="text-body-base">Implementación de plataformas propias de gestión y control de operaciones de seguridad.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-4 h-4 bg-primary rounded-full"></div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">2023</span>
                  <h4 className="text-heading-4">Innovación continua</h4>
                </div>
                <p className="text-body-base">Lanzamiento de soluciones de seguridad inteligente con IA y análisis predictivo.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Nuestro Compromiso */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24 my-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-content-xl">
            <h2 className="text-heading-2 mb-8">Nuestro compromiso</h2>
            
            <div className="text-xl md:text-2xl font-semibold italic text-primary dark:text-accent border-l-4 border-primary dark:border-accent pl-6 py-2 mb-8">
              Creemos que la seguridad es confianza, y la confianza se construye con profesionalismo, tecnología y resultados.
            </div>
            
            <p className="text-body-lg mb-8">
              Nos comprometemos con cada cliente a entregar una solución adaptada a sus riesgos reales, con personal entrenado, supervisión constante y herramientas digitales para control y gestión en tiempo real.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Users className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-heading-4 mb-2">Personal capacitado</h4>
                    <p className="text-body-base text-muted-foreground">
                      Nuestros equipos reciben formación continua, específica para cada sector y cliente.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-heading-4 mb-2">Protección integral</h4>
                    <p className="text-body-base text-muted-foreground">
                      Análisis, prevención y acción coordinada para cada nivel de riesgo.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Clock className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-heading-4 mb-2">Disponibilidad 24/7</h4>
                    <p className="text-body-base text-muted-foreground">
                      Centro de monitoreo activo las 24 horas, todos los días del año.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Zap className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-heading-4 mb-2">Respuesta inmediata</h4>
                    <p className="text-body-base text-muted-foreground">
                      Protocolos de acción rápida ante incidentes o situaciones de riesgo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lo que nos diferencia */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 my-12">
        <div className="max-w-content-xl">
          <h2 className="text-heading-2 mb-10">Lo que nos diferencia</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Conocemos el terreno</h3>
                <p className="text-muted-foreground">
                  Fuimos operadores antes que empresarios, entendemos los desafíos reales de la seguridad.
                </p>
              </div>
            </div>
            
            <div className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <Bell className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Entendemos urgencias</h3>
                <p className="text-muted-foreground">
                  Entendemos las urgencias del cliente, porque las vivimos en primera persona.
                </p>
              </div>
            </div>
            
            <div className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <Cpu className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Integramos tecnología</h3>
                <p className="text-muted-foreground">
                  Integramos tecnología en cada proceso operativo y administrativo para mayor eficiencia.
                </p>
              </div>
            </div>
            
            <div className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Formamos guardias</h3>
                <p className="text-muted-foreground">
                  Formamos a nuestros guardias con foco en prevención, comunicación y reacción efectiva.
                </p>
              </div>
            </div>
            
            <div className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <Clock4 className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Monitoreo 24/7</h3>
                <p className="text-muted-foreground">
                  Nuestro centro de control monitorea, responde y audita las 24 horas del día, los 7 días de la semana.
                </p>
              </div>
            </div>
            
            <div className="bg-[#1E293B] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#1E293B] rounded-full flex items-center justify-center mb-6">
                  <HeartHandshake className="h-8 w-8 text-[#F97316]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Atención personalizada</h3>
                <p className="text-muted-foreground">
                  Brindamos atención dedicada a cada cliente, adaptando nuestros servicios a sus necesidades específicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA final */}
      <CtaFinal 
        title="¿Buscas una empresa de seguridad que combine experiencia en terreno con tecnología aplicada?"
        description="Contáctanos hoy para una evaluación personalizada de tus necesidades de seguridad empresarial."
        ctaLabel="Solicita una reunión"
        ctaHref="/cotizar"
        variant="soft"
      />
    </>
  );
} 