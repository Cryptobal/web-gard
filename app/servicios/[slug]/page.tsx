import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle } from 'lucide-react';

import { servicios, type Servicio } from '@/app/data/servicios';
import { industries } from '@/app/data/industries';
import CloudflareImage from '@/components/CloudflareImage';
import CtaFinal from '@/components/ui/shared/CtaFinal';
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
  
  return {
    title: `${servicio.name} | Gard Security`,
    description: servicio.description,
    keywords: servicio.keywords,
  };
}

// Lista de beneficios para cada tipo de servicio
const beneficiosPorServicio: Record<string, string[]> = {
  'guardias-de-seguridad': [
    'Personal altamente capacitado y certificado',
    'Supervisión constante y coordinación centralizada',
    'Uniformes profesionales y equipamiento completo',
    'Distribución estratégica según evaluación de riesgo',
    'Procedimientos personalizados según necesidad',
    'Reportes detallados de actividades e incidentes'
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
  ]
};

// Descripciones largas para cada servicio
const descripcionesLargas: Record<string, string> = {
  'guardias-de-seguridad': 'Nuestro servicio de guardias de seguridad proporciona protección profesional para empresas, instituciones y comunidades. Cada guardia está minuciosamente seleccionado, capacitado y certificado para garantizar el más alto nivel de servicio. Adaptamos nuestras soluciones a las necesidades específicas de cada cliente, desde vigilancia básica hasta protección especializada. Todos nuestros guardias cuentan con los permisos legales requeridos y pasan por verificaciones exhaustivas de antecedentes.',
  
  'seguridad-electronica': 'La seguridad electrónica de Gard Security combina tecnología de punta con experiencia operativa para crear capas de protección digital en su organización. Diseñamos, instalamos y mantenemos sistemas completos que incluyen videovigilancia CCTV, control de acceso biométrico, detección perimetral y sistemas de alarma avanzados. Nuestros ingenieros certificados evalúan sus instalaciones para desarrollar soluciones personalizadas que se integran perfectamente con su infraestructura existente.',
  
  'central-monitoreo': 'Nuestra central de monitoreo opera 24/7 para proporcionar vigilancia constante a sus instalaciones. Con operadores altamente capacitados y sistemas redundantes, garantizamos que cualquier incidente sea detectado y atendido inmediatamente. La central recibe señales de alarmas, videocámaras y sensores, evaluando cada alerta según protocolos específicos para su organización. Esto permite una respuesta rápida y adecuada a cada situación, minimizando riesgos y daños potenciales.',
  
  'drones-seguridad': 'La seguridad con drones representa nuestra solución más avanzada para vigilancia de grandes áreas y terrenos complejos. Utilizamos aeronaves no tripuladas equipadas con cámaras de alta definición, sensores térmicos y capacidades de vuelo autónomo para monitorear extensas propiedades, eventos masivos o zonas de difícil acceso. Nuestros pilotos están certificados por la DGAC y cumplen con todas las normativas vigentes para operaciones aéreas comerciales.',
  
  'seguridad-perimetral': 'La protección perimetral es la primera línea de defensa de cualquier instalación. Nuestro servicio combina barreras físicas, tecnología de detección y vigilancia humana para crear un escudo integral alrededor de su propiedad. Comenzamos con una evaluación completa para identificar vulnerabilidades y diseñar un sistema personalizado que puede incluir cercos electrificados, sensores de movimiento, cámaras térmicas, iluminación de seguridad y guardias estratégicamente ubicados.'
};

// Función helper para normalizar y obtener el slug de la industria
const getIndustrySlug = (name: string) => {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

// Componente de industrias relacionadas con un servicio
function RelacionIndustriaPorServicio({ servicioSlug }: { servicioSlug: string }) {
  // Renderiza el ícono correcto según el nombre
  const renderIcon = (iconName: string) => {
    const icons = {
      Mountain: <Mountain className="w-6 h-6 mb-2 text-white" />,
      ShoppingCart: <ShoppingCart className="w-6 h-6 mb-2 text-white" />,
      Mic: <Mic className="w-6 h-6 mb-2 text-white" />,
      Boxes: <Boxes className="w-6 h-6 mb-2 text-white" />,
      Stethoscope: <Stethoscope className="w-6 h-6 mb-2 text-white" />,
      GraduationCap: <GraduationCap className="w-6 h-6 mb-2 text-white" />,
      Building2: <Building2 className="w-6 h-6 mb-2 text-white" />,
      Hammer: <Hammer className="w-6 h-6 mb-2 text-white" />,
      Truck: <Truck className="w-6 h-6 mb-2 text-white" />,
      Factory: <Factory className="w-6 h-6 mb-2 text-white" />,
      Landmark: <Landmark className="w-6 h-6 mb-2 text-white" />,
      Hotel: <Hotel className="w-6 h-6 mb-2 text-white" />
    } as Record<string, JSX.Element>;
    
    return icons[iconName] || null;
  };

  return (
    <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="gard-container max-w-7xl mx-auto px-4">
        <h2 className="text-heading-2 mb-6 text-center">Industrias que protegemos con este servicio</h2>
        <p className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
          Adaptamos nuestras soluciones de seguridad a los desafíos específicos de cada sector
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {industries.map((industria) => {
            const industriaSlug = getIndustrySlug(industria.name);
            
            return (
              <Link 
                key={industria.name} 
                href={`/servicios/${servicioSlug}/${industriaSlug}`}
                className="relative group overflow-hidden rounded-xl shadow-md aspect-[4/3] block hover:scale-[1.02] transition-transform duration-300"
                prefetch={true}
              >
                <CloudflareImage
                  imageId={industria.imageId}
                  alt={`${industria.name} - Gard Security`}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition z-10"></div>
                
                {/* Texto superpuesto */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
                  {renderIcon(industria.icon)}
                  <h3 className="text-white text-lg font-semibold drop-shadow-md">
                    {industria.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
          <Link href="/cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center">
            Cotizar este servicio <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
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
                <Link href="/cotizar" className="gard-btn gard-btn-primary w-full justify-center">
                  Solicitar cotización
                </Link>
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

      {/* Industrias compatibles */}
      <RelacionIndustriaPorServicio servicioSlug={params.slug} />

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