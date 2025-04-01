'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import CloudflareImage from './CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '/tecnologias', label: 'Tecnologías' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Cerrar el menú móvil cuando se cambia de ruta
    setIsOpen(false);
  }, [pathname]);

  const headerClasses = `
    absolute top-0 left-0 right-0 z-50 transition-all duration-300
    ${scrolled ? 'fixed bg-background/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}
  `;

  return (
    <header className={headerClasses}>
      <div className="gard-container flex items-center justify-between">
        <Link href="/" className="relative z-50 flex items-center">
          <CloudflareImage
            imageId={scrolled || isOpen ? cloudflareImages.logo.default : cloudflareImages.logo.white}
            alt="Gard Security Logo"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                text-body-base font-medium transition-colors hover:text-primary
                ${pathname === href ? 'text-primary' : scrolled ? 'text-foreground' : 'text-white'}
              `}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle className={scrolled ? '' : 'text-white'} />
        </nav>

        {/* Botón de menú móvil */}
        <button
          className={`md:hidden p-2 z-50 ${scrolled ? 'text-foreground' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Menú móvil */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background md:hidden pt-20"
          >
            <nav className="flex flex-col items-center space-y-6 p-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`
                    text-body-lg font-medium transition-colors hover:text-primary
                    ${pathname === href ? 'text-primary' : 'text-foreground'}
                  `}
                >
                  {label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
} 