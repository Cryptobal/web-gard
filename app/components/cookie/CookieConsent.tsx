'use client';

import React from 'react';
import { ConsentProvider } from '@/app/context/ConsentContext';
import ConsentBanner from './ConsentBanner';
import ConsentModal from './ConsentModal';

/**
 * Componente principal que integra todos los componentes de consentimiento de cookies
 */
export default function CookieConsent({ children }: { children?: React.ReactNode }) {
  return (
    <ConsentProvider>
      <ConsentBanner />
      <ConsentModal />
      {children}
    </ConsentProvider>
  );
} 