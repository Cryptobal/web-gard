'use client';

import { useConsent as useConsentContext } from '../context/ConsentContext';

// Re-exportar el hook desde el contexto para facilitar su importación
export const useConsent = useConsentContext; 