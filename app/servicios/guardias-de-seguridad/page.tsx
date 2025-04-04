import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';

export const metadata: Metadata = {
  title: 'Guardias de Seguridad | Gard Security',
  description: 'Personal altamente capacitado para la protección física de instalaciones, personas y activos de su empresa.',
};

export default function GuardiasDeSeguridad() {
  return (
    <>
      {/* Página de servicio estándar */}
      <ServicioPage params={{ slug: 'guardias-de-seguridad' }} />
    </>
  );
} 