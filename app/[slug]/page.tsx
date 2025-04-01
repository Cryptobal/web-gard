import React from 'react';
import { Metadata } from 'next';

// Definir las rutas estáticas disponibles
export async function generateStaticParams() {
  const slugs = [
    'servicios',
    'sobre-nosotros',
    'tecnologias',
    'contacto',
    'privacidad',
    'terminos',
  ];

  return slugs.map((slug) => ({
    slug,
  }));
}

// Generar los metadatos específicos para cada página
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  
  // Mapeo de títulos y descripciones según la ruta
  const titles: Record<string, string> = {
    'servicios': 'Nuestros Servicios de Seguridad',
    'sobre-nosotros': 'Sobre Gard Security',
    'tecnologias': 'Nuestras Tecnologías',
    'contacto': 'Contáctenos',
    'privacidad': 'Política de Privacidad',
    'terminos': 'Términos de Servicio',
  };

  const descriptions: Record<string, string> = {
    'servicios': 'Descubra nuestra gama completa de servicios de seguridad empresarial. Soluciones personalizadas para proteger su negocio.',
    'sobre-nosotros': 'Conozca más sobre Gard Security, nuestra historia, valores y el equipo detrás de nuestras soluciones de seguridad.',
    'tecnologias': 'Explore las tecnologías de vanguardia que utilizamos en Gard Security para proteger sus activos digitales y físicos.',
    'contacto': 'Póngase en contacto con nuestro equipo de expertos en seguridad. Estamos aquí para responder a sus consultas.',
    'privacidad': 'Política de privacidad de Gard Security. Cómo recopilamos, usamos y protegemos su información.',
    'terminos': 'Términos y condiciones de servicio de Gard Security. Normas que rigen el uso de nuestros servicios.',
  };

  return {
    title: titles[slug] || 'Página no encontrada',
    description: descriptions[slug] || 'Esta página no existe.',
    openGraph: {
      title: titles[slug] || 'Página no encontrada',
      description: descriptions[slug] || 'Esta página no existe.',
    },
  };
}

export default function SlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Componente de página según la ruta
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Página: {slug}</h1>
      <p className="text-body-lg mb-8">
        Esta es una página dinámica para la ruta /{slug}.
        El contenido real se cargará desde archivos Markdown en una implementación posterior.
      </p>
    </div>
  );
} 