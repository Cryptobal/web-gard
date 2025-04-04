import React from 'react';
import type { Metadata } from 'next';
import ServicioPage from '../[slug]/page';
import CotizadorGuardias from '@/app/components/CotizadorGuardias';

export const metadata: Metadata = {
  title: 'Guardias de Seguridad | Gard Security',
  description: 'Personal altamente capacitado para la protección física de instalaciones, personas y activos de su empresa.',
};

export default function GuardiasDeSeguridad() {
  return (
    <>
      {/* Primero mostramos la página de servicio estándar */}
      <ServicioPage params={{ slug: 'guardias-de-seguridad' }} />
      
      {/* A continuación, agregamos el cotizador */}
      <div className="mt-8">
        <CotizadorGuardias />
      </div>
    </>
  );
} 