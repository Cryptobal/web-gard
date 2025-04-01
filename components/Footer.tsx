import Link from 'next/link';
import CloudflareImage from './CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { Mail, MapPin, Phone, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="gard-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              <CloudflareImage
                imageId={cloudflareImages.logo.white}
                alt="Gard Security Logo"
                width={160}
                height={45}
              />
            </Link>
            <p className="text-body-base text-gray-300 mt-4 max-w-xs">
              Soluciones de seguridad de clase mundial para empresas exigentes. Protegemos lo que más importa.
            </p>
            
            {/* Redes Sociales */}
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.linkedin.com/company/gard-security" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/gard_cl" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/gardsecuritycl" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61556809303758" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://mastodon.social/@gard_security" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Mastodon"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21.5 8.5c0-1.7-.7-3.3-1.8-4.5-1.2-1.3-2.7-2-4.5-2H8.8c-1.7 0-3.3.7-4.5 2-1.1 1.2-1.8 2.8-1.8 4.5 0 1.8 0 3.7.2 5.6.1 2 .6 4 1.4 5.8 1.3 2.9 3.2 3.7 5.5 3.9 1.1.1 2.2.1 3.3 0 2.9-.3 4.5-1.8 4.5-1.8l-1-1.7s-1.4 1-3.9 1.1h-.8c-2.8 0-3.5-1.4-3.8-2-.2-.3-.3-.7-.3-1.2 0 0 2.4.5 5.3.7 1.6.1 3.1-.1 4.6-.5 2.9-.8 3.7-3.3 3.8-5.3 0-.8.2-4.2.2-5.6z"/>
                  <path d="M7.8 11.5v-1c0-1.9 1.2-2.7 2.5-2.7s2.5.8 2.5 2.7v4.9c0 1.9 1.2 2.7 2.5 2.7 1.2 0 2.5-.8 2.5-2.7v-1"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-span-1">
            <h3 className="text-heading-5 text-white mb-4">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/servicios" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link 
                  href="/sobre-nosotros" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/tecnologias" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Tecnologías
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div className="col-span-1">
            <h3 className="text-heading-5 text-white mb-4">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/servicios/seguridad-perimetral" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Seguridad Perimetral
                </Link>
              </li>
              <li>
                <Link 
                  href="/servicios/prevencion-intrusiones" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Prevención de Intrusiones
                </Link>
              </li>
              <li>
                <Link 
                  href="/servicios/auditoria-seguridad" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Auditoría de Seguridad
                </Link>
              </li>
              <li>
                <Link 
                  href="/servicios/consultoria" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Consultoría
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-1">
            <h3 className="text-heading-5 text-white mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                <span className="text-gray-300">
                  Av. Principal 123, Torre Empresarial, Piso 5
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3" />
                <span className="text-gray-300">
                  +123 456 7890
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <a 
                  href="mailto:comercial@gard.cl" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  comercial@gard.cl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Gard Security. Todos los derechos reservados.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link 
              href="/privacidad" 
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link 
              href="/terminos" 
              className="text-gray-400 hover:text-primary text-sm transition-colors"
            >
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 