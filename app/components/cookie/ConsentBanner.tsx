'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsent } from '@/app/hooks/useConsent';
import { Shield, Check, X, Settings } from 'lucide-react';

/**
 * Banner de consentimiento de cookies que cumple con GDPR y LGPD
 */
export default function ConsentBanner() {
  const { hasInteracted, acceptAll, rejectAll, openPreferences } = useConsent();

  // Si el usuario ya ha interactuado, no mostrar nada
  if (hasInteracted) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        aria-live="polite"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <div className="mx-auto max-w-4xl rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
          <div className="p-6 md:p-8">
            {/* Encabezado */}
            <div className="flex items-center gap-4 mb-4">
              <div className="shrink-0 p-2 rounded-full bg-primary/10 text-primary dark:text-accent">
                <Shield className="h-6 w-6" />
              </div>
              <h2 id="cookie-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                Respetamos tu privacidad
              </h2>
            </div>
            
            {/* Texto de consentimiento */}
            <div className="mb-6 text-gray-600 dark:text-gray-300 space-y-2">
              <p>
                Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar el contenido. 
                Al hacer clic en "Aceptar todo", consientes el uso de todas las cookies. 
                También puedes personalizar tus preferencias o rechazar cookies no esenciales.
              </p>
              <p className="text-sm">
                Las cookies esenciales siempre están activas ya que son necesarias para el funcionamiento del sitio.
              </p>
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={rejectAll}
                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Rechazar todo"
              >
                <span className="flex items-center justify-center gap-2">
                  <X className="h-4 w-4" />
                  <span>Rechazar todo</span>
                </span>
              </button>
              
              <button
                onClick={openPreferences}
                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Configurar preferencias"
              >
                <span className="flex items-center justify-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Configurar preferencias</span>
                </span>
              </button>
              
              <button
                onClick={acceptAll}
                className="px-6 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium shadow-sm transition-colors"
                aria-label="Aceptar todo"
              >
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Aceptar todo</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 