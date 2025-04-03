'use client';

import React from 'react';

interface SkipLinkProps {
  targetId: string;
  className?: string;
}

export function SkipLink({ targetId, className = '' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={`sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:text-sm focus:bg-white focus:dark:bg-gray-900 focus:text-primary focus:dark:text-primary-foreground focus:shadow-md focus:outline-2 focus:outline-primary focus:rounded-md ${className}`}
    >
      Saltar al contenido principal
    </a>
  );
} 