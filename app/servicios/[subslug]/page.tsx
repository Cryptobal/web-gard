import React from 'react';
import { Metadata } from 'next';

// Definir las rutas estáticas disponibles
export async function generateStaticParams() {
  return [
    { subslug: 'seguridad-perimetral' },
    { subslug: 'monitoreo' },
    { subslug: 'proteccion-datos' },
    { subslug: 'prevencion-intrusiones' },
    { subslug: 'auditoria-seguridad' },
    { subslug: 'consultoria' },
  ];
}

// Generar los metadatos específicos para cada página
export async function generateMetadata({
  params,
}: {
  params: { subslug: string };
}): Promise<Metadata> {
  const subslug = params.subslug;
  
  // Mapeo de títulos y descripciones según la ruta
  const titles: Record<string, string> = {
    'seguridad-perimetral': 'Servicios de Seguridad Perimetral',
    'monitoreo': 'Servicios de Monitoreo 24/7',
    'proteccion-datos': 'Servicios de Protección de Datos',
    'prevencion-intrusiones': 'Servicios de Prevención de Intrusiones',
    'auditoria-seguridad': 'Servicios de Auditoría de Seguridad',
    'consultoria': 'Servicios de Consultoría en Seguridad',
  };

  const descriptions: Record<string, string> = {
    'seguridad-perimetral': 'Proteja el perímetro de su empresa con nuestras soluciones avanzadas. Seguridad física y digital integrada.',
    'monitoreo': 'Vigilancia constante de sus sistemas con respuesta inmediata ante incidentes. Monitoreo 24/7 por especialistas.',
    'proteccion-datos': 'Proteja su información crítica con nuestras soluciones de cifrado, respaldo y recuperación de datos.',
    'prevencion-intrusiones': 'Detecte y prevenga intrusiones en tiempo real con nuestras soluciones avanzadas de seguridad.',
    'auditoria-seguridad': 'Identifique vulnerabilidades en sus sistemas con nuestras auditorías exhaustivas de seguridad.',
    'consultoria': 'Obtenga asesoramiento experto para mejorar su postura de seguridad y cumplir con regulaciones.',
  };

  return {
    title: titles[subslug] || 'Servicio no encontrado',
    description: descriptions[subslug] || 'Este servicio no existe.',
    openGraph: {
      title: titles[subslug] || 'Servicio no encontrado',
      description: descriptions[subslug] || 'Este servicio no existe.',
    },
  };
}

export default function ServiceSubPage({ params }: { params: { subslug: string } }) {
  const { subslug } = params;

  // Componente de página según la ruta
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Servicio: {subslug.replace(/-/g, ' ')}</h1>
      <p className="text-body-lg mb-8">
        Esta es una página para el servicio específico: {subslug.replace(/-/g, ' ')}.
        El contenido real se cargará desde archivos Markdown en una implementación posterior.
      </p>
    </div>
  );
} 