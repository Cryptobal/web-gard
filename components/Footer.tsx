import Link from 'next/link';
import CloudflareImage from './CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import { Mail, MapPin, Phone } from 'lucide-react';

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