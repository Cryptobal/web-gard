"use client";

import React from 'react';
import Link from 'next/link';

interface SafeLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: string;
  onClick?: () => void;
}

export function SafeLink({
  href,
  children,
  className = '',
  ariaLabel,
  target,
  onClick,
  ...props
}: SafeLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  // Verificar si el enlace es externo
  const isExternal = href.startsWith('http') || href.startsWith('https') || href.startsWith('//');
  
  // Añadir atributos de seguridad para enlaces externos
  const externalProps = isExternal
    ? {
        target: target || '_blank',
        rel: 'noopener noreferrer',
      }
    : {};
  
  // Usar el componente Link de Next.js para enlaces internos
  if (!isExternal && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
    return (
      <Link
        href={href}
        className={className}
        aria-label={ariaLabel}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  // Usar anchor para enlaces externos, mailto: o tel:
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
} 