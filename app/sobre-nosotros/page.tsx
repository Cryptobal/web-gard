import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Gard Security',
  description: 'Conozca más sobre Gard Security, nuestra historia, valores y el equipo detrás de nuestras soluciones de seguridad.',
};

export default function SobreNosotros() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Sobre nosotros</h1>
      <p className="text-body-lg mb-4">Aquí irá el contenido sobre la historia y el equipo de Gard Security.</p>
    </div>
  );
} 