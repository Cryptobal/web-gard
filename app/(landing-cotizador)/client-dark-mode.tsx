'use client';

import { useEffect } from 'react';

export default function ClientDarkMode() {
  useEffect(() => {
    // Asegura que el fondo se mantenga oscuro
    document.body.style.backgroundColor = '#111827';
    document.body.style.color = 'white';
    
    // Oculta el header y footer adicionalmente desde JS
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
  }, []);

  return null;
} 