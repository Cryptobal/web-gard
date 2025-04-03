'use client';

/**
 * COMPONENTE WRAPPER (ENVOLTORIO)
 * 
 * Este componente funciona como un envoltorio simple que:
 * 1. Obtiene los datos específicos de imágenes de guardias de seguridad desde la fuente de datos
 * 2. Los pasa al componente del carrusel para su visualización
 * 
 * Su única responsabilidad es conectar los datos con el componente visual,
 * permitiendo que el carrusel sea reutilizable para otros conjuntos de imágenes.
 */

import { useState, useEffect } from 'react';
import GaleriaGuardiasCarrusel from '@/components/sections/carousels/GaleriaGuardiasCarrusel';
import { servicios } from '@/app/data/servicios';

export default function GaleriaGuardias() {
  // Obtener las imágenes de la galería del servicio de Guardias de Seguridad
  const guardiasServicio = servicios.find(servicio => servicio.slug === 'guardias-de-seguridad');
  const imageIds = guardiasServicio?.gallery || [];

  return (
    <div className="w-full">
      <GaleriaGuardiasCarrusel 
        imageIds={imageIds} 
        title="Galería de Guardias de Seguridad" 
      />
    </div>
  );
} 