import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Seguridad Perimetral | Gard Security',
  description: 'Protección avanzada para el perímetro físico y digital de su empresa con soluciones de vigilancia inteligente.',
};

export default function SeguridadPerimetral() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'seguridad-perimetral' }} />;
} 