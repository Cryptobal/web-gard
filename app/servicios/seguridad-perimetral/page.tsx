import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seguridad Perimetral | Gard Security',
  description: 'Protección avanzada para el perímetro físico y digital de su empresa con soluciones de vigilancia inteligente.',
};

export default function SeguridadPerimetral() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Seguridad Perimetral</h1>
      <p className="text-body-lg">Aquí irá el detalle del servicio de seguridad perimetral.</p>
    </div>
  );
} 