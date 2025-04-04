import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle, ArrowUpRight, ShieldCheck, Shield, Eye, Plane, ClipboardCheck, FileText } from 'lucide-react';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { servicios, type Servicio } from '@/app/data/servicios';
import { industries } from '@/app/data/industries';
import { servicesMetadata } from '../serviceMetadata';
import CloudflareImage from '@/components/CloudflareImage';
import CtaFinal from '@/components/ui/shared/CtaFinal';
import IndustriasGridPage from '@/app/components/IndustriasGridPage';
import ServiceDescription from '@/app/components/services/ServiceDescription';
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
import GaleriaImagenes from '@/components/GaleriaImagenes';

// Generar rutas estáticas para cada servicio
export async function generateStaticParams() {
  return servicios.map((servicio) => ({
    slug: servicio.slug,
  }));
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const servicio = servicesMetadata.find(s => s.slug === params.slug);

  if (!servicio) {
    return {
      title: 'Servicio no encontrado | Gard Security',
      description: 'El servicio solicitado no existe o fue eliminado.',
      robots: 'noindex',
    };
  }

  return {
    title: servicio.title,
    description: servicio.description,
    keywords: servicio.keywords,
    robots: 'index, follow',
    openGraph: {
      title: servicio.title,
      description: servicio.description,
      url: `https://gard.cl/servicios/${servicio.slug}`,
      siteName: 'Gard Security',
      type: 'article',
      locale: 'es_CL',
    },
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

  // Crear el JSON-LD para Schema.org
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': servicio.name,
    'description': descripcionLarga,
    'provider': {
      '@type': 'Organization',
      'name': 'Gard Security',
      'url': 'https://www.gard.cl',
      'logo': 'https://www.gard.cl/images/logo.png'
    },
    'serviceType': servicio.name,
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'url': `https://www.gard.cl/servicios/${servicio.slug}`,
      'areaServed': {
        '@type': 'Country',
        'name': 'Chile'
      }
    }
  };
  
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      {/* Descripción detallada - Ahora usando el componente */}
      <ServiceDescription 
        title={`Sobre nuestro servicio de ${servicio.name}`}
        description={descripcionLarga}
        benefits={beneficios}
        serviceName={servicio.name}
        serviceSlug={servicio.slug}
      />

      {/* Galería de imágenes */}
      {servicio.gallery.length > 0 && (
        <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="gard-container max-w-7xl mx-auto px-4">
            <h2 className="text-heading-2 mb-10 text-center">Galería de {servicio.name}</h2>
            
            <GaleriaImagenes imagenes={servicio.gallery} titulo={servicio.name} />
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

      {/* Servicios relacionados */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="gard-container max-w-7xl mx-auto px-4">
          <h2 className="text-heading-2 mb-6 text-center">Servicios relacionados</h2>
          <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
            Descubre otros servicios complementarios para una solución de seguridad integral
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicios
              .filter(s => s.slug !== servicio.slug)
              .slice(0, 3)
              .map((servicioRelacionado, index) => (
                <Link 
                  key={index}
                  href={`/servicios/${servicioRelacionado.slug}`}
                  className="bg-card dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex items-center mb-4">
                    {servicioRelacionado.icon === "ShieldCheck" && <ShieldCheck className="h-8 w-8 text-primary dark:text-accent mr-3" />}
                    {servicioRelacionado.icon === "Shield" && <ShieldCheck className="h-8 w-8 text-primary dark:text-accent mr-3" />}
                    {servicioRelacionado.icon === "Eye" && <Stethoscope className="h-8 w-8 text-primary dark:text-accent mr-3" />}
                    {servicioRelacionado.icon === "Plane" && <Plane className="h-8 w-8 text-primary dark:text-accent mr-3" />}
                    {servicioRelacionado.icon === "ShieldAlert" && <ShieldCheck className="h-8 w-8 text-primary dark:text-accent mr-3" />}
                    {servicioRelacionado.icon === "ClipboardCheck" && <ClipboardCheck className="h-8 w-8 text-primary dark:text-accent mr-3" />}
                    {servicioRelacionado.icon === "FileText" && <FileText className="h-8 w-8 text-primary dark:text-accent mr-3" />}
                    <h3 className="text-xl font-semibold">{servicioRelacionado.name}</h3>
                  </div>
                  <p className="text-body-base text-muted-foreground mb-4 flex-grow">
                    {servicioRelacionado.description}
                  </p>
                  <div className="flex justify-end mt-auto">
                    <span className="inline-flex items-center text-primary dark:text-accent font-medium">
                      Ver servicio <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
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