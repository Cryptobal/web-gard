import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';

import { servicios, type Servicio } from '@/app/data/servicios';
import { industries } from '@/app/data/industries';
import CloudflareImage from '@/components/CloudflareImage';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import IndustriasGridPage from '@/app/components/IndustriasGridPage';
import { 
  Mountain, 
  ShoppingCart, 
  Mic, 
  Boxes, 
  Stethoscope, 
  GraduationCap,
  Building2,
  Hammer,
  Truck,
  Factory,
  Landmark,
  Hotel
} from 'lucide-react';
import LinkParamsAware from '@/app/components/LinkParamsAware';

// Generar rutas estáticas para cada servicio
export async function generateStaticParams() {
  return servicios.map((servicio) => ({
    slug: servicio.slug,
  }));
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const servicio = servicios.find((s) => s.slug === params.slug);
  
  if (!servicio) {
    return {
      title: 'Servicio no encontrado | Gard Security',
      description: 'No se ha encontrado el servicio solicitado',
    };
  }
  
  // Metadatos específicos para guardias de seguridad
  if (servicio.slug === 'guardias-de-seguridad') {
    return {
      title: `Servicio de Guardias de Seguridad Profesionales | Gard Security`,
      description: `Guardias de seguridad certificados para empresas, control de acceso, disuasión y prevención. Personal altamente capacitado en protocolos preventivos y vigilancia empresarial.`,
      keywords: [
        ...servicio.keywords,
        'disuasión de riesgos',
        'control preventivo',
        'guardias para control de acceso',
        'supervisión de seguridad',
        'guardias certificados'
      ],
    };
  }
  
  // Metadatos específicos para auditoría de seguridad
  if (params.slug === 'auditoria-seguridad') {
    return {
      title: `Auditoría de Seguridad Profesional | Evaluación y Diagnóstico | Gard Security`,
      description: `Servicio de auditoría completa de sistemas de seguridad física y electrónica. Identificamos vulnerabilidades y proponemos soluciones para fortalecer la protección de su empresa.`,
      keywords: [
        'auditoría de seguridad',
        'evaluación de vulnerabilidades',
        'diagnóstico de seguridad',
        'análisis de riesgos',
        'consultoría especializada',
        'cumplimiento normativo'
      ],
    };
  }
  
  // Metadatos específicos para consultoría
  if (params.slug === 'consultoria') {
    return {
      title: `Consultoría en Seguridad Privada y Corporativa | Gard Security`,
      description: `Asesoramiento especializado en seguridad para empresas e instituciones. Desarrollamos estrategias personalizadas para optimizar la protección de sus activos y personal.`,
      keywords: [
        'consultoría de seguridad',
        'asesoramiento especializado',
        'estrategias de protección',
        'optimización de seguridad',
        'gestión de riesgos',
        'seguridad corporativa'
      ],
    };
  }
  
  // Metadatos específicos para prevención de intrusiones
  if (params.slug === 'prevencion-intrusiones') {
    return {
      title: `Sistemas de Prevención de Intrusiones | Detección Temprana | Gard Security`,
      description: `Soluciones avanzadas para prevenir accesos no autorizados a sus instalaciones. Combinamos tecnología, barreras físicas y protocolos específicos para anticiparnos a posibles amenazas.`,
      keywords: [
        'prevención de intrusiones',
        'detección temprana',
        'control de accesos',
        'protección perimetral',
        'sistemas anti-intrusión',
        'seguridad proactiva'
      ],
    };
  }
  
  // Metadatos por defecto para los demás servicios
  return {
    title: `${servicio.name} | Gard Security`,
    description: servicio.description,
    keywords: servicio.keywords,
  };
}

// Descripciones largas para cada servicio
const descripcionesLargas: Record<string, string> = {
  'guardias-de-seguridad': 'Nuestro servicio de guardias de seguridad proporciona una presencia disuasoria profesional y visible para empresas, instituciones y comunidades. Cada guardia está minuciosamente seleccionado, capacitado y certificado para garantizar el más alto nivel de vigilancia preventiva. Ofrecemos guardias para control de acceso, rondas perimetrales, supervisión de áreas críticas y eventos corporativos. Todo nuestro personal cuenta con capacitación en detección de comportamientos sospechosos, prevención de riesgos, primeros auxilios y protocolos de evacuación, proporcionando no solo seguridad, sino también tranquilidad a nuestros clientes.',
  
  'seguridad-electronica': 'La seguridad electrónica de Gard Security combina tecnología de punta con experiencia operativa para crear capas de protección digital en su organización. Diseñamos, instalamos y mantenemos sistemas completos que incluyen videovigilancia CCTV, control de acceso biométrico, detección perimetral y sistemas de alarma avanzados. Nuestros ingenieros certificados evalúan sus instalaciones para desarrollar soluciones personalizadas que se integran perfectamente con su infraestructura existente.',
  
  'central-monitoreo': 'Nuestra central de monitoreo opera 24/7 para proporcionar vigilancia constante a sus instalaciones. Con operadores altamente capacitados y sistemas redundantes, garantizamos que cualquier incidente sea detectado y atendido inmediatamente. La central recibe señales de alarmas, videocámaras y sensores, evaluando cada alerta según protocolos específicos para su organización. Esto permite una respuesta rápida y adecuada a cada situación, minimizando riesgos y daños potenciales.',
  
  'drones-seguridad': 'La seguridad con drones representa nuestra solución más avanzada para vigilancia de grandes áreas y terrenos complejos. Utilizamos aeronaves no tripuladas equipadas con cámaras de alta definición, sensores térmicos y capacidades de vuelo autónomo para monitorear extensas propiedades, eventos masivos o zonas de difícil acceso. Nuestros pilotos están certificados por la DGAC y cumplen con todas las normativas vigentes para operaciones aéreas comerciales.',
  
  'seguridad-perimetral': 'La protección perimetral es la primera línea de defensa de cualquier instalación. Nuestro servicio combina barreras físicas, tecnología de detección y vigilancia humana para crear un escudo integral alrededor de su propiedad. Comenzamos con una evaluación completa para identificar vulnerabilidades y diseñar un sistema personalizado que puede incluir cercos electrificados, sensores de movimiento, cámaras térmicas, iluminación de seguridad y guardias estratégicamente ubicados.',

  'auditoria-seguridad': 'Nuestro servicio de auditoría de seguridad proporciona una evaluación exhaustiva y profesional de la infraestructura de seguridad existente en su organización. Nuestros especialistas certificados analizan protocolos, sistemas, personal y vulnerabilidades físicas y digitales para identificar puntos débiles y oportunidades de mejora. El proceso incluye evaluación de riesgos, pruebas de penetración, revisión de procedimientos y análisis de cumplimiento normativo. Tras la evaluación, entregamos un informe detallado con hallazgos y recomendaciones específicas para fortalecer su postura de seguridad global.',
  
  'consultoria': 'El servicio de consultoría de seguridad de Gard Security ofrece asesoramiento especializado a medida para empresas e instituciones que buscan desarrollar o mejorar sus estrategias de protección. Nuestros consultores expertos trabajan estrechamente con su equipo para entender sus necesidades específicas, evaluar riesgos potenciales y diseñar soluciones personalizadas que optimicen recursos y garanticen la seguridad de sus activos. Abordamos desde la planificación estratégica hasta la implementación técnica, incluyendo capacitación de personal, gestión de crisis y continuidad de negocio.',
  
  'prevencion-intrusiones': 'Nuestro servicio de prevención de intrusiones ofrece una estrategia proactiva para detectar y neutralizar amenazas antes de que se materialicen. Combinamos tecnología avanzada, inteligencia de seguridad y protocolos específicos para crear múltiples capas de protección que dificulten el acceso no autorizado a sus instalaciones. El servicio incluye sistemas de detección temprana, barreras físicas y electrónicas, protocolos de respuesta inmediata y capacitación del personal. Todo ello integrado en una solución completa que se anticipa a posibles intrusiones y minimiza riesgos potenciales.'
};

// Lista de beneficios para cada tipo de servicio
const beneficiosPorServicio: Record<string, string[]> = {
  'guardias-de-seguridad': [
    'Personal capacitado en prevención y disuasión',
    'Supervisión constante por coordinadores de zona',
    'Uniformes profesionales y equipamiento visible',
    'Presencia disuasoria diseñada según evaluación de riesgo',
    'Protocolos de acción preventiva personalizados',
    'Reportes detallados de actividades e incidencias',
    'Rotación planificada para mantener vigilancia óptima',
    'Comunicación coordinada con autoridades'
  ],
  'seguridad-electronica': [
    'Diseño e instalación profesional de sistemas CCTV',
    'Integración con sistemas de alarma y control de acceso',
    'Tecnología de última generación con detección inteligente',
    'Mantenimiento preventivo incluido',
    'Sistemas escalables según necesidades del cliente',
    'Monitoreo remoto opcional 24/7'
  ],
  'central-monitoreo': [
    'Vigilancia ininterrumpida 24/7/365',
    'Operadores certificados y altamente entrenados',
    'Protocolos de respuesta personalizados',
    'Infraestructura redundante contra fallos',
    'Tiempos de respuesta garantizados',
    'Integración con fuerzas de seguridad locales'
  ],
  'drones-seguridad': [
    'Vigilancia de grandes extensiones de terreno',
    'Detección de intrusos en zonas de difícil acceso',
    'Modelos especializados para día y noche',
    'Operadores certificados por la DGAC',
    'Transmisión en tiempo real a central de monitoreo',
    'Respuesta rápida ante detección de amenazas'
  ],
  'seguridad-perimetral': [
    'Evaluación completa del perímetro y puntos vulnerables',
    'Diseño integral de soluciones de protección',
    'Combinación de elementos físicos y electrónicos',
    'Detección temprana de intrusiones',
    'Alertas inmediatas ante violación del perímetro',
    'Mantenimiento preventivo de infraestructura'
  ],
  'auditoria-seguridad': [
    'Análisis exhaustivo de vulnerabilidades físicas y digitales',
    'Evaluación de cumplimiento normativo y legal',
    'Revisión de protocolos y procedimientos de seguridad',
    'Pruebas prácticas de efectividad de sistemas',
    'Informe detallado con hallazgos y recomendaciones',
    'Plan de acción priorizado para implementación'
  ],
  'consultoria': [
    'Asesoramiento personalizado según industria y necesidades',
    'Diseño de estrategias de seguridad a medida',
    'Optimización de recursos existentes',
    'Planificación de contingencias y gestión de crisis',
    'Capacitación especializada para personal interno',
    'Seguimiento y mejora continua de estrategias'
  ],
  'prevencion-intrusiones': [
    'Sistemas de detección temprana de última generación',
    'Múltiples capas de protección física y electrónica',
    'Protocolos de respuesta inmediata ante alertas',
    'Disuasión activa mediante elementos visibles',
    'Análisis predictivo de patrones de intrusión',
    'Actualización constante frente a nuevas amenazas'
  ]
};

// Función helper para normalizar y obtener el slug de la industria
const getIndustrySlug = (name: string) => {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

// Componente principal de la página de servicio
export default function ServicioPage({ params }: { params: { slug: string } }) {
  // Buscar el servicio correspondiente por slug
  const servicio = servicios.find((s) => s.slug === params.slug);
  
  // Si no existe el servicio, mostrar 404
  if (!servicio) {
    return notFound();
  }

  // Obtener beneficios y descripción larga para este servicio
  const beneficios = beneficiosPorServicio[servicio.slug] || [];
  const descripcionLarga = descripcionesLargas[servicio.slug] || servicio.description;
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] md:h-[60vh]">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            {servicio.name}
          </h1>
          <p className="text-white text-lg md:text-xl opacity-90 max-w-3xl mb-8">
            {servicio.description}
          </p>
          <LinkParamsAware 
            href="/cotizar" 
            className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center"
            serviceName={servicio.name}
            serviceSlug={servicio.slug}
          >
            Cotizar este servicio <ArrowRight className="ml-2 h-5 w-5" />
          </LinkParamsAware>
        </div>
        <CloudflareImage
          imageId={servicio.heroImageId}
          alt={`${servicio.name} - Gard Security`}
          fill
          priority
          className="object-cover"
        />
      </section>

      {/* Descripción detallada */}
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <h2 className="text-heading-2 mb-6">Sobre nuestro servicio de {servicio.name}</h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                {descripcionLarga}
              </p>
              
              <h3 className="text-heading-3 mb-5">Beneficios principales</h3>
              <ul className="space-y-4 mb-8">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-body-base">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl self-start">
              <h3 className="text-heading-4 mb-4">¿Por qué elegir Gard Security?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Más de 10 años de experiencia</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Personal certificado y verificado</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Servicio 24/7 garantizado</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Tecnología de vanguardia</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Soluciones personalizadas</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <LinkParamsAware 
                  href="/cotizar" 
                  className="gard-btn gard-btn-primary w-full justify-center"
                  serviceName={servicio.name}
                  serviceSlug={servicio.slug}
                >
                  Solicitar cotización
                </LinkParamsAware>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de imágenes */}
      {servicio.gallery.length > 0 && (
        <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="gard-container max-w-7xl mx-auto px-4">
            <h2 className="text-heading-2 mb-10 text-center">Galería de {servicio.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicio.gallery.map((imageId, index) => (
                <div key={index} className="relative aspect-video rounded-2xl overflow-hidden shadow-sm">
                  <CloudflareImage
                    imageId={imageId}
                    alt={`${servicio.name} - Imagen ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industrias compatibles - Usamos el componente reutilizable */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 mb-6 text-center">Industrias que protegemos con este servicio</h2>
          <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
            Adaptamos nuestras soluciones de seguridad a los desafíos específicos de cada sector
          </p>
          
          <IndustriasGridPage servicioSlug={params.slug} />
        </div>
      </section>

      {/* CTA Final */}
      <CtaFinal 
        title={`¿Necesitas un servicio de ${servicio.name} personalizado?`}
        description="Cada empresa tiene desafíos únicos. Contacta con nuestro equipo para una solución adaptada a tus necesidades específicas."
        ctaLabel="Solicita tu cotización"
        ctaHref="/cotizar"
        variant="soft"
      />
    </>
  );
} 