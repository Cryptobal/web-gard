import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CloudflareImage from '@/components/CloudflareImage';
import { 
  ArrowRight, 
  Smartphone, 
  ClipboardCheck, 
  FileText,
  MessageSquare,
  Database,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import CtaFinal from '@/components/ui/shared/CtaFinal';

export const metadata: Metadata = {
  title: "Tecnología y Supervisión Inteligente - Gard Security",
  description: "Inteligencia artificial, reportería automática y control en tiempo real para transformar la seguridad privada en Chile.",
  keywords: [
    "tecnología en seguridad privada",
    "inteligencia artificial en vigilancia",
    "monitoreo en tiempo real",
    "supervisión de guardias",
    "plataforma digital de seguridad"
  ]
};

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="678cad4f-9b0d-49e6-3bbd-0d747a2fdc00"
            alt="Tecnología para Seguridad Privada Inteligente"
            fill
            className="object-cover"
            objectPosition="center"
            priority
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="bg-gradient-to-t from-black/60 to-transparent absolute inset-0 z-10"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl mb-6">
            Tecnología para Seguridad Privada Inteligente
          </h1>
          <p className="text-white text-xl max-w-2xl mb-8">
            Supervisión, reportería y control total en tiempo real con inteligencia artificial.
          </p>
          <Link 
            href="/cotizar" 
            className={cn(
              buttonVariants({ variant: "gard-primary", size: "lg" }),
              "text-base md:text-lg px-8 py-3 rounded-full"
            )}
            aria-label="Solicitar información sobre nuestra tecnología"
          >
            Conocer más
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Módulo Plataforma */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">Nuestra Plataforma Tecnológica</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Un ecosistema digital completo para la gestión, control y supervisión de seguridad privada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Smartphone className="h-12 w-12 text-primary dark:text-accent" />
                </div>
                <CardTitle className="text-heading-4">App y panel en tiempo real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Visualiza cada ronda, ingreso y evento desde una plataforma centralizada. Acceda desde cualquier dispositivo, en cualquier momento.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <ClipboardCheck className="h-12 w-12 text-primary dark:text-accent" />
                </div>
                <CardTitle className="text-heading-4">Control de rondas y asistencia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Supervisión en tiempo real de guardias con geolocalización, verificación de rondas y control biométrico de asistencia.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <FileText className="h-12 w-12 text-primary dark:text-accent" />
                </div>
                <CardTitle className="text-heading-4">Reportes automáticos con IA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Reportes generados automáticamente con inteligencia artificial que detecta patrones y previene incidentes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección Supervisión Inteligente */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-2 mb-6">Supervisión y Operación Inteligente</h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                Implementamos tecnología de punta que permite una supervisión efectiva y en tiempo real de todos los servicios de seguridad.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-accent mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Trazabilidad completa:</strong> Registro detallado de cada actividad realizada por el personal de seguridad.</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-accent mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Evidencia de cumplimiento:</strong> Verificación digital y fotográfica de cada ronda y actividad programada.</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-accent mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Coordinación remota:</strong> Comunicación inmediata y eficiente entre guardias, supervisores y clientes.</p>
                </li>
              </ul>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-md">
              <CloudflareImage
                imageId="678cad4f-9b0d-49e6-3bbd-0d747a2fdc00"
                alt="Supervisión y operación inteligente en seguridad privada"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Comunicación con Clientes */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">Comunicación en Tiempo Real</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Canales directos y efectivos entre usted y nuestro equipo de seguridad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <MessageSquare className="h-10 w-10 text-primary dark:text-accent" />
                </div>
                <CardTitle className="text-heading-4">Canales directos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Comunicación inmediata a través de nuestra app con supervisores y administradores de servicio.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <ClipboardCheck className="h-10 w-10 text-primary dark:text-accent" />
                </div>
                <CardTitle className="text-heading-4">Validación de cumplimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Acceda a validaciones en tiempo real del cumplimiento de protocolos y rondas programadas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Database className="h-10 w-10 text-primary dark:text-accent" />
                </div>
                <CardTitle className="text-heading-4">Histórico completo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-base text-muted-foreground text-center">
                  Registro histórico de todas las comunicaciones e incidentes para referencia y auditoría.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección Reportes IA */}
      <section className="gard-section py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-heading-2 mb-6">Reportes y Detección Proactiva con IA</h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                Transformamos los datos en insights accionables para mejorar constantemente su seguridad.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-accent mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Análisis de patrones:</strong> Identificación automática de patrones y situaciones de riesgo.</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-accent mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Alertas inteligentes:</strong> Notificaciones predictivas basadas en comportamientos históricos.</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-accent mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Reportería automatizada:</strong> Informes periódicos generados sin intervención humana.</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-6 w-6 text-primary dark:text-accent mr-2 shrink-0 mt-0.5" />
                  <p className="text-body-base"><strong>Dashboard personalizado:</strong> Visualización de métricas clave según sus necesidades.</p>
                </li>
              </ul>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-md order-1 lg:order-2">
              <CloudflareImage
                imageId="d0c7fd28-f94f-4138-d307-da723130fd00"
                alt="Sistema de reportes con inteligencia artificial"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Desarrollo a Medida */}
      <section className="gard-section py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-heading-2 mb-4">Desarrollo a Medida para Empresas</h2>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Adaptamos nuestra tecnología a las necesidades específicas de su industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <Code className="h-8 w-8 text-primary dark:text-accent" />
              </div>
              <div>
                <h3 className="text-heading-4 mb-2">Conectores e Integraciones</h3>
                <p className="text-body-base text-muted-foreground">
                  Integramos nuestra plataforma con sus sistemas actuales (ERP, CCTV, control de acceso).
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <Database className="h-8 w-8 text-primary dark:text-accent" />
              </div>
              <div>
                <h3 className="text-heading-4 mb-2">API Personalizada</h3>
                <p className="text-body-base text-muted-foreground">
                  Desarrollamos API a medida para transferencia de datos segura entre sistemas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <ClipboardCheck className="h-8 w-8 text-primary dark:text-accent" />
              </div>
              <div>
                <h3 className="text-heading-4 mb-2">Reportes por Industria</h3>
                <p className="text-body-base text-muted-foreground">
                  Reportería especializada según los requerimientos regulatorios de su sector.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">
                <Smartphone className="h-8 w-8 text-primary dark:text-accent" />
              </div>
              <div>
                <h3 className="text-heading-4 mb-2">Aplicaciones Móviles Personalizadas</h3>
                <p className="text-body-base text-muted-foreground">
                  Versiones específicas de nuestra aplicación adaptadas a sus procesos internos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CtaFinal 
        title="¿Quieres ver cómo operamos todo en tiempo real?"
        description="Agenda una demostración o solicita un presupuesto personalizado para tu empresa."
        ctaLabel="Agenda una Demo"
        ctaHref="/contacto"
        variant="soft"
      />
    </>
  );
}