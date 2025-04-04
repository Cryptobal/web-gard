'use client';

import React, { useEffect } from 'react';

// Componente cliente que oculta navbar y footer y aplica estilos
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.backgroundColor = '#111827';
    document.body.style.color = 'white';

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
  }, []);

  return <>{children}</>;
}
