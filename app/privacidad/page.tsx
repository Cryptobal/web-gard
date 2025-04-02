import { redirect } from 'next/navigation';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Gard Security. Cómo recopilamos, usamos y protegemos su información.',
};

export default function PrivacidadRedirect() {
  redirect('/politica-de-privacidad');
} 