'use client';

import React from 'react';
import { ConsentPreferencesButton } from './cookie/ConsentModal';

/**
 * Componente para incluir en el footer que muestra el enlace para gestionar cookies
 */
export default function FooterCookiesSection() {
  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p className="mb-2">
          Utilizamos cookies para mejorar tu experiencia en nuestro sitio.
        </p>
        <ConsentPreferencesButton />
      </div>
    </div>
  );
} 