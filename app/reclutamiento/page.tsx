import React from 'react';
import ReclutamientoForm from './ReclutamientoForm';

// Metadata para SEO (esto sí se puede hacer en un componente de servidor)
export const metadata = {
  title: 'Trabaja con Nosotros | Gard Security',
  description: 'Postula para ser guardia de seguridad en Gard Security. Estabilidad, pagos puntuales y formación continua. Súmate a una empresa de excelencia.',
  keywords: 'trabajo guardia de seguridad, postular empresa seguridad, empleo con OS10, reclutamiento seguridad privada',
};

export default function ReclutamientoPage() {
  return (
    <ReclutamientoForm />
  );
} 