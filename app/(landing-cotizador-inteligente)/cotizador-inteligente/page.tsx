'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CotizadorInteligenteV2 from '@/app/components/cotizador/CotizadorInteligenteV2';
import FAQsCotizador from '@/components/cotizador/FAQsCotizador';
import CloudflareImage from '@/components/CloudflareImage';
import Link from 'next/link';
import { 
  ArrowRight, 
  Shield, 
  Clock, 
  Calculator, 
  HeadphonesIcon, 
  CheckCircle, 
  Star, 
  MessageSquare,
  ChevronRight,
  Users,
  BadgeCheck,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CountUp from 'react-countup';

// IDs de imágenes para logos e imágenes
const LOGO_GARD_BLANCO = '49b89002-6bb9-41b9-50ad-e6b91e5f6d00';
const ESCUDO_GARD_BLANCO = 'f1cad221-0c11-43c4-3142-a53a6febbd00';
const HERO_IMAGE_ID = '4824f8b9-abb0-4e77-c654-efe920697b00';
const GUARDIA_IMAGEN_ID = '5eea1064-8a2d-4e8b-5606-d28775467a00'; // Imagen de guardia trabajando

// Definir el metadata directamente en este archivo para evitar problemas de importación
const metadataInfo = {
  title: 'Cotizador Inteligente de Guardias de Seguridad | Gard Security',
  description: 'Calcula el costo de tu servicio de guardias de seguridad con nuestro cotizador inteligente. Configura turnos, horarios y recibe una cotización personalizada.',
  keywords: ['cotizador guardias', 'calculadora seguridad', 'presupuesto guardias', 'cotización online seguridad'],
  openGraph: {
    title: 'Cotizador Inteligente de Guardias de Seguridad | Gard Security',
    description: 'Calcula el costo de tu servicio de guardias de seguridad con nuestro cotizador inteligente. Configura turnos, horarios y recibe una cotización personalizada.',
    url: 'https://gard.cl/cotizador-inteligente',
    siteName: 'Gard Security',
    locale: 'es_CL',
    type: 'website',
  }
};

// Animación básica para cada sección
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Animación para los elementos de lista
const staggerChildrenVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Componente lado cliente para forzar metadatos
const MetadataEnforcer = () => {
  useEffect(() => {
    // Función para forzar la aplicación de metadatos
    const forceMetadata = () => {
      if (typeof document !== 'undefined') {
        // Aplicar título explícitamente
        document.title = metadataInfo.title;
        
        // Aplicar metadescripción
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
          descMeta = document.createElement('meta');
          descMeta.setAttribute('name', 'description');
          document.head.appendChild(descMeta);
        }
        descMeta.setAttribute('content', metadataInfo.description);
        
        // Aplicar Open Graph
        if (metadataInfo.openGraph) {
          const og = metadataInfo.openGraph;
          
          // OG Title
          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute('content', og.title);
          
          // OG Description
          let ogDesc = document.querySelector('meta[property="og:description"]');
          if (!ogDesc) {
            ogDesc = document.createElement('meta');
            ogDesc.setAttribute('property', 'og:description');
            document.head.appendChild(ogDesc);
          }
          ogDesc.setAttribute('content', og.description);
        }
      }
    };
    
    // Ejecutar inmediatamente y luego cada segundo durante 5 segundos para asegurar que se apliquen
    forceMetadata();
    const interval = setInterval(forceMetadata, 1000);
    const timeout = setTimeout(() => clearInterval(interval), 5000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  
  return null;
};

// Componente de Beneficios Iniciales con diseño mejorado
const BeneficiosIniciales = () => {
  const beneficios = [
    {
      icon: <Calculator className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Cotización en 1 minuto",
      description: "Configure turnos, cantidad de guardias y obtenga un estimado inmediato del costo mensual."
    },
    {
      icon: <Shield className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Ajuste exacto a tus necesidades",
      description: "Personaliza cada aspecto del servicio según tus requisitos específicos de seguridad."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Formulario ultra simple",
      description: "Solicita tu cotización formal con solo unos clics y recíbela en tu correo."
    },
    {
      icon: <HeadphonesIcon className="h-12 w-12 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Asesoría inmediata",
      description: "Un ejecutivo especializado te contactará para resolver todas tus consultas."
    }
  ];

  return (
    <section className="py-16 w-full bg-gray-900" id="beneficios">
      <motion.div 
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Beneficios de nuestro <span className="text-orange-500">servicio premium</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Diseñamos soluciones de seguridad integral para empresas con los más altos estándares de calidad.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {beneficios.map((beneficio, index) => (
            <motion.div
              key={index}
              className="group bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1
                  }
                }
              }}
            >
              <div className="flex justify-center mb-5">
                {beneficio.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{beneficio.title}</h3>
              <p className="text-gray-300">{beneficio.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Componente de Beneficios Premium mejorado
const BeneficiosPremium = () => {
  return (
    <section className="py-20 w-full relative overflow-hidden" id="beneficios-premium">
      {/* Fondo con overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-95 z-0"></div>
      
      {/* Imagen de fondo con blur */}
      <div className="absolute inset-0 z-[-1] opacity-20">
        <CloudflareImage
          imageId={GUARDIA_IMAGEN_ID}
          alt="Guardia de seguridad profesional"
          fill
          className="object-cover blur-sm"
        />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-white inline-flex items-center justify-center"
            variants={fadeInUp}
          >
            <Shield className="mr-3 text-orange-500 h-8 w-8 md:h-10 md:w-10" />
            ¿Por qué elegir nuestro servicio premium?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            En Gard Security combinamos experiencia, tecnología y profesionalismo para brindar un servicio superior.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <motion.div 
            className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-xl"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-3">
              Nuestras ventajas competitivas
            </h3>
            <motion.ul 
              className="space-y-4"
              variants={staggerChildrenVariants}
            >
              {[
                'Guardias certificados y capacitados',
                'Supervisión permanente 24/7',
                'Tecnología de punta en seguridad',
                'Uniformes y equipamiento completo'
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-gray-200"
                  variants={itemVariants}
                >
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-xl"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-3">
              Beneficios para tu empresa
            </h3>
            <motion.ul 
              className="space-y-4"
              variants={staggerChildrenVariants}
            >
              {[
                'Reducción de costos operacionales',
                'Mayor tranquilidad para tu equipo',
                'Respuesta inmediata ante emergencias',
                'Informes detallados de incidentes'
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center text-gray-200"
                  variants={itemVariants}
                >
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
        
        <div className="text-center">
          <a 
            href="#cotizador" 
            className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Solicitar cotización personalizada <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

// Componente de Contador de Empresas
const ContadorEmpresas = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <motion.div 
      className="bg-gray-800 py-8 border-t border-gray-700"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      onViewportEnter={() => setIsVisible(true)}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg text-gray-300 mb-3">
          <span className="font-bold text-orange-500 text-2xl">
            {isVisible ? <CountUp end={27} duration={4} /> : 0}
          </span>
          {" "}empresas ya cotizaron este mes
        </p>
        <p className="text-sm text-gray-400">Gard Security: más de 50 empresas confían en nosotros para su protección.</p>
      </div>
    </motion.div>
  );
};

// Componente de botón sticky para móvil
const StickyMobileButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={cn(
      "fixed bottom-4 left-0 right-0 z-50 px-4 md:hidden transition-all duration-300",
      isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <a 
        href="#cotizador" 
        className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-xl transition-colors"
      >
        Simular Cotización <Calculator className="w-5 h-5" />
      </a>
    </div>
  );
};

export default function CotizadorInteligentePage() {
  return (
    <>      
      {/* Componente para forzar metadatos */}
      <MetadataEnforcer />
      
      {/* Botón sticky para móvil */}
      <StickyMobileButton />
      
      {/* Hero Section Rediseñada */}
      <section className="relative w-full h-[80vh] md:h-[80vh]">
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60 z-10"></div>
        
        {/* Imagen de fondo */}
        <CloudflareImage
          imageId={HERO_IMAGE_ID}
          alt="Guardias de seguridad profesionales"
          fill
          priority
          className="object-cover"
        />
        
        {/* Contenido del Hero */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          {/* Escudo para móviles en la parte superior */}
          <motion.div 
            className="absolute top-8 block md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="block hover:opacity-90 transition-opacity">
              <div className="relative w-12 h-12">
                <CloudflareImage 
                  imageId={ESCUDO_GARD_BLANCO}
                  alt="Gard Security Escudo"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
              Cotizador Inteligente de Guardias de Seguridad
            </h1>
            
            <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Configura turnos, calcula costos y solicita tu cotización personalizada
            </p>
            
            {/* Badges de confianza */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.div 
                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Star className="text-yellow-400 w-5 h-5 mr-2" />
                <span className="text-white text-sm">Más de 10 años de experiencia</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Shield className="text-orange-500 w-5 h-5 mr-2" />
                <span className="text-white text-sm">Certificación OS10</span>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <MessageSquare className="text-blue-400 w-5 h-5 mr-2" />
                <span className="text-white text-sm">Soporte 24/7</span>
              </motion.div>
            </div>
            
            {/* CTA principal */}
            <motion.a 
              href="#cotizador"
              className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Simular Cotización <ChevronRight className="ml-2 h-5 w-5" />
            </motion.a>
          </motion.div>
          
          {/* Logo para desktop en la parte inferior */}
          <motion.div 
            className="absolute bottom-4 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/" className="block hover:opacity-90 transition-opacity">
              <div className="relative w-48 h-20">
                <CloudflareImage 
                  imageId={LOGO_GARD_BLANCO}
                  alt="Gard Security Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sección de Beneficios Iniciales */}
      <BeneficiosIniciales />
      
      {/* Cotizador inteligente con diseño mejorado */}
      <section id="cotizador" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            {/* Ícono añadido sobre el título */}
            <motion.div 
              className="inline-flex items-center justify-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Calculator className="h-10 w-10 text-orange-500" />
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Calculadora de Costos
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Personalice los parámetros según sus necesidades para obtener un estimado del costo mensual
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <CotizadorInteligenteV2 />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
          </motion.div>
        </div>
      </section>
      
      {/* Beneficios Premium */}
      <BeneficiosPremium />
      
      {/* Preguntas frecuentes */}
      <section id="faqs" className="py-20 bg-gray-50 dark:bg-gray-900">
        <motion.div 
          className="max-w-4xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <motion.div 
              className="inline-flex items-center justify-center mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-orange-600 dark:text-orange-500" />
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Resolvemos tus dudas sobre nuestros servicios de seguridad
            </p>
          </div>
          
          <motion.div
            variants={staggerChildrenVariants}
          >
            <FAQsCotizador />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Contador de empresas */}
      <ContadorEmpresas />
    </>
  );
} 