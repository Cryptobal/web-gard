import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Consultoría de Seguridad | Gard Security',
  description: 'Asesoramiento especializado en seguridad para desarrollar estrategias personalizadas que optimicen la protección de su empresa.',
};

export default function Consultoria() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'consultoria' }} />;
} 