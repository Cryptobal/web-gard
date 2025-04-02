import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Auditoría de Seguridad | Gard Security',
  description: 'Evaluación exhaustiva de sistemas de seguridad y detección de vulnerabilidades para fortalecer la protección de su empresa.',
};

export default function AuditoriaSeguridad() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'auditoria-seguridad' }} />;
} 