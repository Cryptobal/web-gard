import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guardias de Seguridad | Gard Security',
  description: 'Personal altamente capacitado para la protección física de instalaciones, personas y activos de su empresa.',
};

export default function GuardiasDeSeguridad() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Guardias de Seguridad</h1>
      <p className="text-body-lg mb-4">Aquí irá el detalle del servicio de guardias de seguridad para protección física.</p>
    </div>
  );
} 