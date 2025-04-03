import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Drones de Seguridad | Gard Security',
  description: 'Vigilancia aérea con drones para cobertura en tiempo real de perímetros e instalaciones críticas.',
};

export default function SeguridadDrones() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'drones-seguridad' }} />;
} 