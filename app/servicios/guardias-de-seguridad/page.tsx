import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

// Configuración de optimización para páginas estáticas
export const runtime = 'edge';
export const dynamicParams = false;
export const preferredRegion = 'chl1';

// Metadatos dinámicos para SEO
export const metadata: Metadata = {
  title: 'Servicio de Guardias de Seguridad Privada | Gard Security',
  description: 'Guardias de seguridad profesionales, capacitados y certificados para proteger su empresa las 24 horas. Servicio de seguridad física premium en todo Chile.',
  keywords: ['guardias de seguridad', 'seguridad privada', 'vigilantes', 'seguridad empresarial', 'guardias certificados', 'vigilancia 24/7'],
  openGraph: {
    title: 'Servicio de Guardias de Seguridad Privada | Gard Security',
    description: 'Guardias de seguridad profesionales, capacitados y certificados para proteger su empresa las 24 horas. Servicio de seguridad física premium en todo Chile.',
    url: 'https://gard.cl/servicios/guardias-de-seguridad',
    images: [
      {
        url: 'https://imagedelivery.net/gGw8cfmEZedi85dYm6qcFw/4824f8b9-abb0-4e77-c654-efe920697b00/public',
        width: 1200,
        height: 630,
        alt: 'Guardias de seguridad Gard'
      }
    ],
    type: 'website',
  }
};

export default function GuardiasDeSeguridad() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'guardias-de-seguridad' }} />;
} 