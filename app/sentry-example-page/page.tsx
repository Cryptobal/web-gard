"use client";

import { useEffect } from 'react';

export default function SentryExamplePage() {
  useEffect(() => {
    // Esta función no existe, lo que causará un error
    const generateError = () => {
      // @ts-ignore - Ignoramos el error de TypeScript para que el código compile
      const nonExistentVariable = undefinedVariable.property;
    };

    // Llamamos a la función después de 2 segundos para que la página se cargue primero
    const timer = setTimeout(() => {
      generateError();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Página de ejemplo para Sentry</h1>
      <p className="mb-4">Esta página generará un error automáticamente en 2 segundos...</p>
      <p className="text-sm text-gray-600">Este error será capturado por Sentry.</p>
    </div>
  );
}
