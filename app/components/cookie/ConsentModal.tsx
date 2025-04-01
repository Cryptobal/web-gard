'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsent } from '@/app/hooks/useConsent';
import { ConsentCategories } from '@/app/context/ConsentContext';
import { X, Info, ToggleLeft, ToggleRight, Shield, BarChart4, Target, Settings2 } from 'lucide-react';

/**
 * Información detallada para cada categoría de cookies
 */
const categoriesInfo = {
  necessary: {
    title: 'Cookies necesarias',
    description: 'Estas cookies son esenciales para el funcionamiento del sitio web y no pueden ser desactivadas.',
    examples: ['Autenticación', 'Seguridad', 'Balance de carga', 'Preferencias de sesión'],
    icon: <Shield className="h-5 w-5" />,
  },
  analytics: {
    title: 'Cookies analíticas',
    description: 'Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.',
    examples: ['Google Analytics', 'Análisis de uso', 'Medición de rendimiento', 'Heatmaps'],
    icon: <BarChart4 className="h-5 w-5" />,
  },
  marketing: {
    title: 'Cookies de marketing',
    description: 'Utilizadas para mostrar anuncios relevantes y campañas de marketing.',
    examples: ['Google Ads', 'Facebook Pixel', 'Remarketing', 'Análisis de conversión'],
    icon: <Target className="h-5 w-5" />,
  },
  preferences: {
    title: 'Cookies de preferencias',
    description: 'Permiten recordar información que cambia el comportamiento o apariencia del sitio.',
    examples: ['Idioma preferido', 'Región', 'Configuración de fuentes', 'Tema oscuro/claro'],
    icon: <Settings2 className="h-5 w-5" />,
  },
};

/**
 * Toggle switch para activar/desactivar categorías de cookies
 */
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id: string;
}

function ToggleSwitch({ checked, onChange, disabled = false, id }: ToggleSwitchProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex items-center justify-center flex-shrink-0 h-6 w-11 cursor-pointer transition-colors ease-in-out duration-200 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'} 
        rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
    >
      <span className="sr-only">{checked ? 'Enable' : 'Disable'}</span>
      {checked ? (
        <ToggleRight className="text-primary dark:text-accent h-6 w-6" />
      ) : (
        <ToggleLeft className="text-gray-400 h-6 w-6" />
      )}
    </button>
  );
}

/**
 * Modal de preferencias de cookies que permite configuración granular
 */
export default function ConsentModal() {
  const { isPreferencesOpen, closePreferences, consent, updateConsent } = useConsent();
  const [preferences, setPreferences] = useState<ConsentCategories>({ ...consent });

  // Actualizar el estado local cuando cambia el consentimiento global
  useEffect(() => {
    setPreferences({ ...consent });
  }, [consent]);

  // Actualizar una categoría específica
  const updateCategory = (category: keyof ConsentCategories, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  // Guardar las preferencias
  const savePreferences = () => {
    updateConsent(preferences);
    closePreferences();
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isPreferencesOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isPreferencesOpen && (
        <>
          {/* Overlay con backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={closePreferences}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <h2 id="cookie-preferences-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                  Preferencias de cookies
                </h2>
                <button
                  onClick={closePreferences}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Cerrar preferencias"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Explicación general */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 text-blue-500 dark:text-blue-400 mt-1">
                        <Info className="h-5 w-5" />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <p className="mb-2">
                          Utilizamos cookies y tecnologías similares para diferentes propósitos, incluyendo:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Asegurar el correcto funcionamiento del sitio</li>
                          <li>Analizar el tráfico para mejorar la experiencia</li>
                          <li>Personalizar contenido y anuncios</li>
                          <li>Recordar tus preferencias</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  {(Object.keys(categoriesInfo) as Array<keyof typeof categoriesInfo>).map((category) => (
                    <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 p-2 rounded-full bg-primary/10 text-primary dark:text-accent">
                            {categoriesInfo[category].icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {categoriesInfo[category].title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {categoriesInfo[category].description}
                            </p>
                          </div>
                        </div>
                        <ToggleSwitch
                          id={`toggle-${category}`}
                          checked={preferences[category]}
                          onChange={(checked) => updateCategory(category, checked)}
                          disabled={category === 'necessary'} // No se puede desactivar necessary
                        />
                      </div>
                      
                      {/* Examples */}
                      <div className="px-4 pb-4 pt-0">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-medium">Ejemplos: </span>
                          {categoriesInfo[category].examples.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer with actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={closePreferences}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={savePreferences}
                  className="px-6 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium shadow-sm transition-colors"
                >
                  Guardar preferencias
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Botón para abrir el modal de preferencias desde cualquier parte de la aplicación
 */
export function ConsentPreferencesButton() {
  const { openPreferences } = useConsent();
  
  return (
    <button
      onClick={openPreferences}
      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent underline"
    >
      Configurar preferencias de cookies
    </button>
  );
} 