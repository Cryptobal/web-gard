import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seguridad Electrónica | Gard Security',
  description: 'Instalación y gestión de sistemas electrónicos de control de acceso, alarmas y cámaras inteligentes.',
};

export default function SeguridadElectronica() {
  return (
    <div className="gard-container py-20">
      <h1 className="text-heading-2 mb-6">Seguridad Electrónica</h1>
      <p className="text-body-lg">Aquí irá el detalle del servicio de seguridad electrónica.</p>
    </div>
  );
} 