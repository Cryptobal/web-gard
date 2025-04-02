import { redirect } from 'next/navigation';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos y condiciones de servicio de Gard Security. Normas que rigen el uso de nuestros servicios.',
};

export default function TerminosRedirect() {
  redirect('/terminos-de-servicio');
} 