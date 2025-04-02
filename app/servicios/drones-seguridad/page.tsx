import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Drones de Seguridad | Gard Security',
  description: 'Vigilancia aérea avanzada para grandes áreas y terrenos complejos con tecnología de drones y transmisión en tiempo real.',
};

export default function DronesSeguridad() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'drones-seguridad' }} />;
} 