'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon } from 'lucide-react';
import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/industrias', label: 'Industrias' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Cerrar el menú móvil cuando se cambia de ruta
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 z-50 w-full bg-black/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo (zona izquierda) */}
        <Link href="/" className="relative z-50 flex items-center">
          <CloudflareImage
            imageId={cloudflareImages.logo.white}
            alt="Logo Gard Security"
            width={140}
            height={40}
            priority
            className="h-10 w-auto transition-transform hover:scale-105"
          />
        </Link>

        {/* Navegación (zona central) - solo visible en desktop */}
        <nav 
          className="hidden md:flex items-center justify-center space-x-8"
          role="navigation"
          aria-label="Menú principal"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                relative text-body-base font-medium transition-all duration-200
                hover:text-blue-500
                ${pathname === href 
                  ? 'text-blue-500 border-b-2 border-blue-500' 
                  : 'text-white'}
              `}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Acciones (zona derecha) */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/contacto"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition inline-block"
          >
            <span className="hidden sm:inline">Cotiza Ahora</span>
            <span className="sm:hidden">Cotizar</span>
          </Link>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full transition-colors hover:bg-gray-800 text-white"
            aria-label="Cambiar tema"
            title="Cambiar tema"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Cambiar tema</span>
          </button>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden p-2 z-50 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background md:hidden pt-20"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
          >
            <nav 
              className="flex flex-col items-center space-y-6 p-8"
              role="navigation"
              aria-label="Navegación móvil"
            >
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`
                    text-body-lg font-medium transition-colors duration-200
                    hover:text-blue-500 hover:scale-105
                    ${pathname === href ? 'text-blue-500' : 'text-foreground'}
                  `}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
} 