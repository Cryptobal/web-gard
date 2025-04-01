import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seguridad con Drones | Gard Security',
  description: 'Vigilancia aérea con drones para cobertura en tiempo real de perímetros e instalaciones críticas.',
};

export default function SeguridadDrones() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Seguridad con Drones</h1>
      <p className="text-body-lg">Aquí irá el detalle del servicio de drones para vigilancia y control perimetral.</p>
    </div>
  );
} 