import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Gard Security',
  description: 'Política de privacidad de Gard Security. Cómo recopilamos, usamos y protegemos su información personal.',
};

export default function PoliticaPrivacidad() {
  return (
    <main className="gard-section bg-white dark:bg-gray-900">
      <div className="gard-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-heading-2 md:text-heading-1 text-center mb-12 text-primary dark:text-primary">
            Política de Privacidad
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section>
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Introducción</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                En Gard Security, respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad describe cómo recopilamos, utilizamos, procesamos y protegemos su información cuando utiliza nuestros servicios o visita nuestra página web.
              </p>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Al acceder a nuestro sitio web o utilizar nuestros servicios, usted acepta las prácticas descritas en esta política. Le recomendamos leer detenidamente esta información para comprender cómo tratamos sus datos.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Información que recopilamos</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
                Podemos recopilar varios tipos de información, incluyendo:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">
                  <strong>Información personal:</strong> Como nombre, dirección de correo electrónico, número telefónico, empresa, cargo y otros datos similares que usted proporciona voluntariamente.
                </li>
                <li className="mb-2">
                  <strong>Información de uso:</strong> Datos sobre cómo interactúa con nuestro sitio web, incluyendo páginas visitadas, tiempo de permanencia y enlaces en los que hace clic.
                </li>
                <li className="mb-2">
                  <strong>Información técnica:</strong> Dirección IP, tipo de navegador, proveedor de servicios de Internet, sistema operativo y otra información técnica similar.
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Cómo usamos su información</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Proporcionar, mantener y mejorar nuestros servicios.</li>
                <li className="mb-2">Procesar y completar transacciones.</li>
                <li className="mb-2">Enviar información administrativa, como confirmaciones, actualizaciones técnicas y alertas de seguridad.</li>
                <li className="mb-2">Responder a sus comentarios, preguntas y solicitudes.</li>
                <li className="mb-2">Comunicarnos con usted sobre productos, servicios, ofertas y eventos.</li>
                <li className="mb-2">Analizar tendencias y actividades para mejorar la experiencia del usuario.</li>
                <li className="mb-2">Proteger la seguridad e integridad de nuestros servicios.</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Compartición de datos</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
                Gard Security no vende ni alquila su información personal a terceros. Sin embargo, podemos compartir información en las siguientes circunstancias:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Con proveedores de servicios que nos ayudan a operar nuestro negocio.</li>
                <li className="mb-2">Para cumplir con obligaciones legales, regulaciones o procedimientos legales.</li>
                <li className="mb-2">Para proteger los derechos, la propiedad o la seguridad de Gard Security, nuestros clientes u otros.</li>
                <li className="mb-2">En caso de fusión, venta o transferencia de activos, con su consentimiento previo cuando sea requerido por ley.</li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Seguridad de la información</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Implementamos medidas de seguridad técnicas, administrativas y físicas diseñadas para proteger la información personal que recopilamos. Sin embargo, ningún sistema de seguridad es impenetrable y no podemos garantizar la seguridad absoluta de su información.
              </p>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Regularmente revisamos nuestras prácticas de recopilación, almacenamiento y procesamiento de datos para actualizar nuestras medidas de seguridad.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Derechos del usuario</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Acceder a sus datos personales que tenemos.</li>
                <li className="mb-2">Solicitar la rectificación de información inexacta.</li>
                <li className="mb-2">Solicitar la eliminación de sus datos.</li>
                <li className="mb-2">Oponerse o restringir el procesamiento de sus datos.</li>
                <li className="mb-2">Solicitar la portabilidad de sus datos.</li>
                <li className="mb-2">Retirar su consentimiento en cualquier momento.</li>
              </ul>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Para ejercer estos derechos, póngase en contacto con nosotros a través de los datos de contacto proporcionados al final de esta política.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Cookies</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico y personalizar el contenido. Puede controlar las cookies a través de la configuración de su navegador, aunque esto puede limitar algunas funcionalidades del sitio.
              </p>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Utilizamos cookies esenciales para el funcionamiento del sitio, cookies analíticas para entender cómo interactúan los usuarios con nuestro sitio y cookies de marketing para ofrecerle contenido relevante.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Cambios a la política</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Podemos actualizar esta política de privacidad periódicamente para reflejar cambios en nuestras prácticas de información. Le notificaremos cualquier cambio significativo publicando la nueva política en esta página y, si los cambios son significativos, le proporcionaremos una notificación más prominente.
              </p>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Le recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos su información.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Contacto</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Si tiene preguntas o inquietudes sobre esta política de privacidad o el tratamiento de sus datos, contáctenos a:
              </p>
              <div className="border-l-4 border-primary pl-4 py-2 text-gray-700 dark:text-gray-300">
                <p className="mb-2"><strong>Gard Security</strong></p>
                <p className="mb-2">Email: privacidad@gard.cl</p>
                <p className="mb-0">Teléfono: +56 2 2345 6789</p>
              </div>
            </section>

            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
              <p>Última actualización: Mayo 2024</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 