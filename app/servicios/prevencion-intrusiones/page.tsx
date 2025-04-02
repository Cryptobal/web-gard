import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Prevención de Intrusiones | Gard Security',
  description: 'Sistemas avanzados para detectar y neutralizar amenazas antes de que se materialicen, protegiendo el acceso a sus instalaciones.',
};

export default function PrevencionIntrusiones() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'prevencion-intrusiones' }} />;
} 