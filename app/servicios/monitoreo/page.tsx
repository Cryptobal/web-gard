import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monitoreo 24/7 | Gard Security',
  description: 'Vigilancia constante de sus instalaciones con sistemas de monitoreo en tiempo real y respuesta inmediata.',
};

export default function Monitoreo() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Monitoreo 24/7</h1>
      <p className="text-body-lg">Aquí irá el detalle del servicio de monitoreo.</p>
    </div>
  );
} 