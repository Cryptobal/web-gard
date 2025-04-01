import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import CloudflareImage from '@/components/CloudflareImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CallToAction } from '@/components/ui/CallToAction';
import { 
  Leaf, 
  Zap, 
  Recycle, 
  Lightbulb, 
  Check, 
  ArrowRight,
  Globe,
  Home,
  Factory,
  AlertTriangle
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Política Ambiental y Seguridad Responsable - Gard Security",
  description: "Conoce cómo Gard Security combina tecnología, seguridad y sostenibilidad para proteger instalaciones y el medio ambiente.",
  keywords: [
    "empresa de seguridad sostenible",
    "guardias con responsabilidad ambiental",
    "política ambiental de seguridad privada",
    "ODS en seguridad"
  ]
};

export default function PoliticaAmbientalPage() {
  return (
    <main className="flex-grow bg-white dark:bg-gray-900">
      {/* Hero Principal */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <CloudflareImage
            imageId="1b09642f-da1e-4247-52c6-acd8362d1a00"
            alt="Gard Security: Seguridad Responsable con el Medio Ambiente"
            fill
            className="object-cover"
            objectPosition="center"
            priority
          />
          {/* Overlay verde */}
          <div className="absolute inset-0 bg-green-900/40 dark:bg-green-900/60 z-10"></div>
          <div className="bg-gradient-to-t from-green-900/50 to-transparent absolute inset-0 z-10"></div>
        </div>
        
        {/* Contenido */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight max-w-4xl mb-6">
            Gard Security: Seguridad Responsable con el Medio Ambiente
          </h1>
          <p className="text-white text-xl max-w-2xl mb-8">
            Integramos sostenibilidad y tecnología para proteger lo que más importa: tu entorno y el planeta.
          </p>
          <Link 
            href="#compromisos" 
            className="gard-btn gard-btn-primary gard-btn-lg bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold inline-flex items-center"
          >
            Ver nuestros compromisos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Sección 1: Compromiso Ambiental */}
      <section id="compromisos" className="py-16 md:py-24 bg-green-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 text-green-900 dark:text-emerald-400 mb-6">Compromiso Ambiental</h2>
            <p className="text-body-lg text-green-800 dark:text-gray-300 max-w-3xl mx-auto">
              En Gard Security, no solo protegemos personas e instalaciones: también protegemos el futuro del planeta. Nuestra <strong>política ambiental</strong> impulsa la eficiencia energética, la reducción de huella de carbono, la gestión responsable de recursos y el uso de tecnología limpia para minimizar el impacto ambiental de nuestros servicios de seguridad privada.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tarjeta 1 */}
            <Card className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800 hover:shadow-md hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40 inline-flex">
                  <Zap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-green-800 dark:text-emerald-400 mt-4">Eficiencia Energética</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-green-700 dark:text-gray-300">
                Uso eficiente de energía en operaciones y monitoreo con sistemas de bajo consumo.
              </CardContent>
            </Card>

            {/* Tarjeta 2 */}
            <Card className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800 hover:shadow-md hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40 inline-flex">
                  <Recycle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-green-800 dark:text-emerald-400 mt-4">Política de Reciclaje</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-green-700 dark:text-gray-300">
                Reciclaje activo en oficinas y centros operativos para reducir nuestra huella ambiental.
              </CardContent>
            </Card>

            {/* Tarjeta 3 */}
            <Card className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800 hover:shadow-md hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40 inline-flex">
                  <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-green-800 dark:text-emerald-400 mt-4">Recursos Responsables</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-green-700 dark:text-gray-300">
                Gestión responsable de recursos en todos nuestros servicios de seguridad.
              </CardContent>
            </Card>

            {/* Tarjeta 4 */}
            <Card className="bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800 hover:shadow-md hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/40 inline-flex">
                  <Lightbulb className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-xl text-green-800 dark:text-emerald-400 mt-4">Innovación Limpia</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-green-700 dark:text-gray-300">
                Desarrollo e implementación de tecnologías de seguridad sustentables.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección 2: Seguridad Responsable */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Forma decorativa */}
        <div className="absolute -top-16 right-0 w-64 h-64 bg-green-100 dark:bg-green-900/20 rounded-full opacity-60 -z-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full opacity-40 -z-10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 order-2 md:order-1">
              <h2 className="text-heading-2 text-green-900 dark:text-emerald-400 mb-6">Seguridad Responsable</h2>
              <p className="text-body-lg text-green-800 dark:text-gray-300 mb-6">
                La sostenibilidad forma parte del ADN de Gard. Desde nuestros <strong>guardias de seguridad</strong> hasta nuestros sistemas inteligentes, aplicamos prácticas respetuosas con el medioambiente sin comprometer la eficiencia.
              </p>
              <p className="text-body-base text-green-700 dark:text-gray-400 mb-8">
                Implementamos soluciones innovadoras como:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-green-800 dark:text-gray-300">Drones con baterías de bajo impacto ambiental</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-green-800 dark:text-gray-300">Monitoreo remoto que reduce patrullaje físico</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-green-800 dark:text-gray-300">Formación en sostenibilidad para nuestro equipo operativo</span>
                </li>
              </ul>
              <Button 
                variant="outline"
                className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-900/30 font-medium"
              >
                Descargar política ambiental PDF
              </Button>
            </div>
            <div className="flex-1 order-1 md:order-2 relative h-72 md:h-96 w-full rounded-2xl overflow-hidden">
              <CloudflareImage
                imageId="1b09642f-da1e-4247-52c6-acd8362d1a00"
                alt="Seguridad responsable con el medio ambiente"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Acciones Concretas */}
      <section className="py-16 md:py-24 bg-emerald-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 text-green-900 dark:text-emerald-400 mb-6">Acciones Concretas</h2>
            <p className="text-body-lg text-green-800 dark:text-gray-300 max-w-3xl mx-auto">
              Nuestro compromiso ambiental se traduce en iniciativas reales y medibles que aplicamos en el día a día de nuestras operaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-all">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mr-4">
                  <Factory className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-emerald-400">Plan de transición hacia vehículos 100% eléctricos</h3>
                  <p className="text-green-700 dark:text-gray-300 mt-2">Reducimos emisiones de CO2 con nuestra flota en transición ecológica.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-all">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mr-4">
                  <Lightbulb className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-emerald-400">Inteligencia artificial para minimizar consumo energético</h3>
                  <p className="text-green-700 dark:text-gray-300 mt-2">Optimizamos recursos con tecnología inteligente de bajo consumo.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-all">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mr-4">
                  <Recycle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-emerald-400">Gestión de residuos electrónicos y reciclaje interno</h3>
                  <p className="text-green-700 dark:text-gray-300 mt-2">Procesamos responsablemente todos los residuos tecnológicos generados.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-all">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mr-4">
                  <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-emerald-400">Capacitaciones ambientales para todo el personal</h3>
                  <p className="text-green-700 dark:text-gray-300 mt-2">Formamos a nuestros colaboradores en buenas prácticas ambientales.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-all md:col-span-2">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mr-4">
                  <Home className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-emerald-400">Colaboración con clientes para soluciones sostenibles</h3>
                  <p className="text-green-700 dark:text-gray-300 mt-2">Trabajamos junto a nuestros clientes para diseñar estrategias de seguridad con menor impacto ambiental, adaptando nuestros servicios a sus propias políticas de sostenibilidad.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: ODS */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 text-green-900 dark:text-emerald-400 mb-6">Objetivos de Desarrollo Sostenible (ODS)</h2>
            <p className="text-body-lg text-green-800 dark:text-gray-300 max-w-3xl mx-auto">
              Gard Security se alinea con los siguientes <strong>ODS de las Naciones Unidas</strong>, contribuyendo a un futuro más sostenible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* ODS 7 */}
            <div className="flex flex-col items-center text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-emerald-400 mb-2">ODS 7</h3>
              <p className="text-green-700 dark:text-gray-300">Energía asequible y no contaminante</p>
            </div>

            {/* ODS 11 */}
            <div className="flex flex-col items-center text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mb-4">
                <Home className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-emerald-400 mb-2">ODS 11</h3>
              <p className="text-green-700 dark:text-gray-300">Ciudades y comunidades sostenibles</p>
            </div>

            {/* ODS 12 */}
            <div className="flex flex-col items-center text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-amber-800 rounded-full flex items-center justify-center mb-4">
                <Recycle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-emerald-400 mb-2">ODS 12</h3>
              <p className="text-green-700 dark:text-gray-300">Producción y consumo responsable</p>
            </div>

            {/* ODS 13 */}
            <div className="flex flex-col items-center text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-emerald-400 mb-2">ODS 13</h3>
              <p className="text-green-700 dark:text-gray-300">Acción por el clima</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <div className="mb-16">
        <CallToAction
          title="Confía en una empresa de seguridad privada con compromiso ambiental"
          buttonText="Cotiza con Gard Security"
          href="/cotizar"
          variant="primary"
          contrast="soft"
        />
      </div>
    </main>
  );
} 