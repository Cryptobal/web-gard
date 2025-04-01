'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import CloudflareImage from './CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/industrias', label: 'Industrias' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/tecnologia-seguridad', label: 'Tecnologías' },
  { href: '/cotizar', label: 'Cotizar', isCTA: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar el estado inicial
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Cerrar el menú móvil cuando se cambia de ruta
    setIsOpen(false);
  }, [pathname]);

  // Determinar si estamos en un contexto oscuro
  const isDarkMode = !mounted ? false : theme === 'dark';
  
  // Determinar las clases y estilos condicionales
  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 w-full 
    transition-all duration-300 ease-in-out
    ${scrolled 
      ? `py-2 md:py-3 shadow-md ${isDarkMode ? 'bg-[#0b1120]' : 'bg-white'}`
      : `py-4 md:py-6 shadow-none ${isDarkMode ? 'bg-[#0b1120]/40' : 'bg-white/40'} backdrop-blur-md`
    }
  `;

  // Clases para elementos de navegación
  const getNavLinkClasses = (isActive: boolean, isCTA?: boolean) => {
    if (isCTA) {
      return `
        bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition
        font-semibold ${scrolled ? 'text-sm' : 'text-base'}
      `;
    }
    
    return `
      transition-all duration-300 ease-in-out font-semibold
      ${scrolled ? 'text-sm' : 'text-base'}
      ${isActive 
        ? 'text-primary font-bold' 
        : scrolled
          ? isDarkMode 
            ? 'text-white hover:text-primary' 
            : 'text-primary hover:text-primary/80'
          : isDarkMode
            ? 'text-white hover:text-primary/90' 
            : 'text-black hover:text-primary/90'
      }
    `;
  };

  return (
    <header className={headerClasses}>
      <div className="gard-container px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="relative z-50 flex items-center transition-all duration-300 ease-in-out">
          <CloudflareImage
            imageId={cloudflareImages.logo.default}
            alt="Gard Security Logo"
            width={scrolled ? 120 : 140}
            height={scrolled ? 34 : 40}
            priority
            className="transition-all duration-300 ease-in-out"
          />
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map(({ href, label, isCTA }) => (
            <Link
              key={href}
              href={href}
              className={getNavLinkClasses(pathname === href, isCTA)}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle className={`transition-all duration-300 ease-in-out ${
            scrolled 
              ? (isDarkMode ? 'text-white' : 'text-primary')
              : (isDarkMode ? 'text-white' : 'text-black')
          }`} />
        </nav>

        {/* Botón de menú móvil */}
        <button
          className={`md:hidden z-50 transition-colors duration-200 hover:bg-muted/20 rounded-md p-2 ${
            isOpen
              ? (isDarkMode ? 'text-white' : 'text-black')
              : scrolled 
                ? (isDarkMode ? 'text-white' : 'text-black')
                : (isDarkMode ? 'text-white' : 'text-black')
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Menú móvil - Siempre con fondo para mejor legibilidad */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-40 md:hidden pt-20 h-screen ${
              isDarkMode 
                ? 'bg-[#0b1120]/95 backdrop-blur-md' 
                : 'bg-white/95 backdrop-blur-md shadow-lg'
            }`}
            style={{
              height: '100vh', 
              maxHeight: '100vh',
              overflow: 'auto'
            }}
          >
            <nav className="flex flex-col items-center space-y-8 p-8 mt-4">
              {navLinks.map(({ href, label, isCTA }) => (
                <Link
                  key={href}
                  href={href}
                  className={isCTA 
                    ? "bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition text-lg font-semibold"
                    : `
                      text-lg font-semibold transition-colors
                      ${pathname === href 
                        ? 'text-primary font-bold' 
                        : isDarkMode 
                          ? 'text-white hover:text-primary' 
                          : 'text-black hover:text-primary/80'
                      }
                    `
                  }
                >
                  {label}
                </Link>
              ))}
              <div className="mt-4">
                <ThemeToggle className={isDarkMode ? 'text-white' : 'text-black'} />
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
} 