'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos para el consentimiento
export type ConsentCategories = {
  necessary: boolean;  // Siempre true (no se puede rechazar)
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

// Estado inicial del consentimiento
const defaultConsent: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false
};

// Tipo para el contexto
type ConsentContextType = {
  consent: ConsentCategories;
  hasInteracted: boolean;
  updateConsent: (categories: Partial<ConsentCategories>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openPreferences: () => void;
  isPreferencesOpen: boolean;
  closePreferences: () => void;
};

// Crear el contexto
export const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

// Proveedor del contexto
export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // Estado para el consentimiento
  const [consent, setConsent] = useState<ConsentCategories>(defaultConsent);
  // Estado para saber si el usuario ha interactuado con el banner
  const [hasInteracted, setHasInteracted] = useState<boolean>(true); // Inicialmente true para evitar flash en SSR
  // Estado para el modal de preferencias
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);

  // Cargar el consentimiento desde localStorage al montar el componente
  useEffect(() => {
    // No ejecutar en SSR
    if (typeof window === 'undefined') return;

    // Comprobar si hay consentimiento guardado
    const savedConsent = localStorage.getItem('cookieConsent');
    const hasConsented = localStorage.getItem('hasInteractedWithConsent');

    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(current => ({
          ...current,
          ...parsedConsent,
          necessary: true // Siempre forzar necessary a true
        }));
      } catch (error) {
        console.error('Error parsing consent data:', error);
      }
    }

    // Establecer si ha interactuado
    setHasInteracted(hasConsented === 'true');
  }, []);

  // Actualizar consentimiento por categoría
  const updateConsent = (categories: Partial<ConsentCategories>) => {
    setConsent(current => {
      const newConsent = {
        ...current,
        ...categories,
        necessary: true // Siempre forzar necessary a true
      };
      
      // Guardar en localStorage
      localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
      localStorage.setItem('hasInteractedWithConsent', 'true');
      
      return newConsent;
    });
    
    setHasInteracted(true);
  };

  // Aceptar todas las categorías
  const acceptAll = () => {
    updateConsent({
      analytics: true,
      marketing: true,
      preferences: true
    });
  };

  // Rechazar todas las categorías (excepto necessary)
  const rejectAll = () => {
    updateConsent({
      analytics: false,
      marketing: false,
      preferences: false
    });
  };

  // Abrir modal de preferencias
  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };

  // Cerrar modal de preferencias
  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };

  // Valor del contexto
  const value = {
    consent,
    hasInteracted,
    updateConsent,
    acceptAll,
    rejectAll,
    openPreferences,
    isPreferencesOpen,
    closePreferences
  };

  return (
    <ConsentContext.Provider value={value}>
      {children}
    </ConsentContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useConsent() {
  const context = useContext(ConsentContext);
  
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  
  return context;
} 