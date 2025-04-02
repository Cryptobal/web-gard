'use client';

import Link from 'next/link';
import CloudflareImage from './CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { X, MessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer 
      className="bg-gradient-to-r from-[#1a2a90] to-[#2333a8] dark:from-[#0f172a] dark:to-[#1e293b] py-16 px-8 md:px-20"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 gap-y-8">
          {/* Columna 1: Identidad */}
          <div className="flex flex-col space-y-6 items-center sm:items-start">
            <Link href="/" className="inline-block" aria-label="Página Principal">
              <div itemProp="logo">
                <CloudflareImage
                  imageId={cloudflareImages.logo.white}
                  alt="Gard Security Logo"
                  width={200}
                  height={60}
                  className="h-10 md:h-14 w-auto"
                />
              </div>
            </Link>
            <p className="text-white/80 text-sm md:text-base mt-4 max-w-xs text-center sm:text-left" itemProp="description">
              Soluciones de seguridad de clase mundial para empresas exigentes. Protegemos lo que más importa.
            </p>
            
            {/* Redes Sociales */}
            <div className="flex space-x-5 mt-6">
              <a 
                href="https://www.linkedin.com/company/gard-security" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn - Visita nuestro perfil de LinkedIn"
                className="text-blue-100 hover:text-white hover:scale-110 transition-all duration-300"
                itemProp="sameAs"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com/gard_cl" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="X (Twitter) - Síguenos en X"
                className="text-blue-100 hover:text-white hover:scale-110 transition-all duration-300"
                itemProp="sameAs"
              >
                <X className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/gardsecuritycl" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram - Síguenos en Instagram"
                className="text-blue-100 hover:text-white hover:scale-110 transition-all duration-300"
                itemProp="sameAs"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61556809303758" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook - Síguenos en Facebook"
                className="text-blue-100 hover:text-white hover:scale-110 transition-all duration-300"
                itemProp="sameAs"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://wa.me/56941137976" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp - Contáctanos por WhatsApp"
                className="text-blue-100 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <MessageSquare className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces */}
          <div className="sm:col-span-1">
            <h3 className="font-semibold text-white text-lg mb-6">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Inicio"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/servicios" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Servicios"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link 
                  href="/industrias" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Industrias"
                >
                  Industrias
                </Link>
              </li>
              <li>
                <Link 
                  href="/sobre-nosotros" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Sobre Nosotros"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/reclutamiento" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Trabaja con Nosotros"
                >
                  Trabaja con Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacto" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Contacto"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div className="sm:col-span-1">
            <h3 className="font-semibold text-white text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/privacidad" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Política de Privacidad"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  href="/terminos" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Términos de Servicio"
                >
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/politica-ambiental" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="Política Ambiental"
                >
                  Política Ambiental
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="sm:col-span-1">
            <h3 className="font-semibold text-white text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                <span 
                  className="text-sm md:text-base text-blue-100"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">Camino Los Trapenses 2140</span>, 
                  <span itemProp="addressLocality">Lo Barnechea</span>, 
                  <span itemProp="addressRegion">Santiago</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                <a 
                  href="tel:+56941137976" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="+56 9 4113 7976"
                  itemProp="telephone"
                >
                  +56 9 4113 7976
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                <a 
                  href="mailto:comercial@gard.cl" 
                  className="text-sm md:text-base text-blue-100 hover:text-white transition-colors"
                  aria-label="comercial@gard.cl"
                  itemProp="email"
                >
                  comercial@gard.cl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-blue-100/80 text-sm md:text-base" itemProp="name">
            © {currentYear} Gard Security. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
} 