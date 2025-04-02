import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio | Gard Security',
  description: 'Términos y condiciones de servicio de Gard Security. Conozca las normas que rigen el uso de nuestros servicios y sitio web.',
};

export default function TerminosServicio() {
  return (
    <main className="gard-section bg-white dark:bg-gray-900">
      <div className="gard-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-heading-2 md:text-heading-1 text-center mb-12 text-primary dark:text-primary">
            Términos de Servicio
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section>
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Introducción</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Bienvenido a Gard Security. Estos términos y condiciones rigen su acceso y uso de nuestro sitio web, productos y servicios. Al acceder o utilizar nuestros servicios, usted acepta estar sujeto a estos términos. Si no está de acuerdo con alguna parte de estos términos, le solicitamos que no utilice nuestros servicios.
              </p>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Lea detenidamente estos términos antes de utilizar nuestro sitio web o contratar nuestros servicios.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Aceptación de términos</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Al utilizar el sitio web de Gard Security o contratar cualquiera de nuestros servicios, usted confirma que:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Ha leído y comprendido estos términos.</li>
                <li className="mb-2">Acepta cumplir con estos términos y todas las leyes y regulaciones aplicables.</li>
                <li className="mb-2">Tiene la capacidad legal para aceptar estos términos y celebrar un contrato vinculante.</li>
                <li className="mb-2">Tiene al menos 18 años de edad o la mayoría de edad legal en su jurisdicción.</li>
              </ul>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Si está aceptando estos términos en nombre de una organización o entidad, declara y garantiza que está autorizado para aceptar estos términos en nombre de dicha organización y vincularla a estos términos.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Uso del sitio web</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Usted puede usar nuestro sitio web solo para fines legítimos y de acuerdo con estos términos. Está prohibido:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Utilizar el sitio de manera que pueda dañar, deshabilitar, sobrecargar o deteriorar el sitio.</li>
                <li className="mb-2">Utilizar robots, arañas, o cualquier otro dispositivo, proceso o medio automático para acceder al sitio.</li>
                <li className="mb-2">Introducir virus, troyanos, gusanos, bombas lógicas u otro material malicioso o tecnológicamente dañino.</li>
                <li className="mb-2">Intentar obtener acceso no autorizado a cualquier parte del sitio, al servidor que aloja el sitio o a cualquier servidor, computadora o base de datos conectada al sitio.</li>
                <li className="mb-2">Atacar el sitio a través de un ataque de denegación de servicio o un ataque distribuido de denegación de servicio.</li>
              </ul>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Nos reservamos el derecho de prohibir el acceso al sitio a cualquier persona que viole estos términos y de remitir cualquier actividad ilegal a las autoridades competentes.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Servicios y contratos</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Nuestros servicios de seguridad están descritos en el sitio web. Al contratar nuestros servicios, se establecerá un contrato específico que detallará el alcance, duración y costos de los servicios contratados.
              </p>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto de nuestros servicios en cualquier momento, con o sin previo aviso. No seremos responsables si, por cualquier motivo, todo o parte del sitio no está disponible en un momento determinado.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Propiedad intelectual</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                El sitio web de Gard Security y todo su contenido, características y funcionalidades (incluyendo pero no limitado a toda la información, software, texto, imágenes, marcas y diseños) son propiedad de Gard Security, sus licenciantes u otros proveedores y están protegidos por las leyes de propiedad intelectual.
              </p>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Se prohíbe estrictamente cualquier uso del contenido, incluyendo reproducción, modificación, distribución, transmisión, republicación, descarga, exhibición o envío en cualquier forma o por cualquier medio, sin nuestro permiso previo por escrito.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Limitación de responsabilidad</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                En la medida permitida por la ley, Gard Security no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, o cualquier pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad, u otras pérdidas intangibles, resultantes de:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Su acceso o uso, o incapacidad para acceder o usar, el sitio o los servicios.</li>
                <li className="mb-2">Cualquier conducta o contenido de terceros en el sitio.</li>
                <li className="mb-2">Acceso no autorizado, uso o alteración de sus transmisiones o contenido.</li>
              </ul>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Nuestra responsabilidad por cualquier reclamación derivada de estos términos se limitará a la cantidad que usted nos haya pagado por los servicios en los 12 meses anteriores a la reclamación.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Indemnización</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Usted acepta defender, indemnizar y mantener indemne a Gard Security, sus filiales, licenciantes y proveedores de servicios, y sus respectivos directores, funcionarios, empleados, contratistas, agentes, licenciantes, proveedores, sucesores y cesionarios de y contra cualquier reclamación, responsabilidad, daño, juicio, fallo, pérdida, costo, gasto o tarifa (incluidos honorarios legales razonables) derivados de o relacionados con su incumplimiento de estos términos.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Modificaciones</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso con al menos 30 días de anticipación antes de que los nuevos términos entren en vigor.
              </p>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Lo que constituye un cambio material será determinado a nuestra sola discreción. Al continuar accediendo o utilizando nuestro sitio o servicios después de que las revisiones entren en vigor, usted acepta estar sujeto a los términos revisados.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Legislación aplicable</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Estos términos se regirán e interpretarán de acuerdo con las leyes de Chile, sin dar efecto a ningún principio de conflicto de leyes. Cualquier disputa legal que surja de estos términos será sometida a la jurisdicción exclusiva de los tribunales de Santiago, Chile.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Divisibilidad</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Si alguna disposición de estos términos se considera inválida, ilegal o inaplicable por cualquier razón por un tribunal u otra autoridad competente, dicha disposición se eliminará o limitará al mínimo para que las disposiciones restantes sigan en pleno vigor y efecto.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-heading-3 mb-4 text-gray-900 dark:text-white">Contacto</h2>
              <p className="text-body-base text-gray-700 dark:text-gray-300 mb-6">
                Si tiene preguntas sobre estos términos de servicio, contáctenos en:
              </p>
              <div className="border-l-4 border-primary pl-4 py-2 text-gray-700 dark:text-gray-300">
                <p className="mb-2"><strong>Gard Security</strong></p>
                <p className="mb-2">Email: legal@gard.cl</p>
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