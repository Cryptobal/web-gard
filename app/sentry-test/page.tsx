'use client';

import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function SentryTestPage() {
  const [hasError, setHasError] = useState(false);

  // Función que generará un error para probar Sentry
  const triggerError = () => {
    try {
      // Esto causará un error deliberadamente
      const nonExistentFunction = (window as any).nonExistentFunction;
      nonExistentFunction();
    } catch (error) {
      // Capturamos el error con Sentry
      Sentry.captureException(error);
      setHasError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Página de prueba de Sentry</h1>
      
      <button 
        onClick={triggerError}
        className="px-4 py-2 bg-red-600 text-white rounded-lg mb-4 hover:bg-red-700"
      >
        Generar error de prueba
      </button>
      
      {hasError && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          ¡Error generado y enviado a Sentry correctamente!
          <p className="text-sm mt-2">Revisa tu panel de Sentry para verlo.</p>
        </div>
      )}
    </div>
  );
} 