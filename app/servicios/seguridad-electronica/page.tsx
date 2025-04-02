import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Seguridad Electrónica | Gard Security',
  description: 'Sistemas tecnológicos avanzados de CCTV, control de acceso y alarmas para proteger instalaciones con detección inteligente.',
};

export default function SeguridadElectronica() {
  // Utiliza el componente dinámico con el slug correspondiente
  return <ServicioPage params={{ slug: 'seguridad-electronica' }} />;
} 