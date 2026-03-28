import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Política de cookies - TecnaVision",
  description:
    "Información sobre el uso de cookies y tecnologías similares en el sitio web de TecnaVision.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-app-text">
      <Header />
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-bold text-app-text mb-4">
            Política de cookies
          </h1>
          <p className="text-app-text-sec text-sm mb-12">
            Última actualización: febrero 2025
          </p>

          <div className="space-y-8 text-app-text-sec leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                1. ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web almacenan en tu
                dispositivo (ordenador, tablet o móvil) cuando los visitas. Se utilizan para
                recordar preferencias, analizar el tráfico o personalizar contenido. Esta
                política explica cómo TecnaVision utiliza cookies y tecnologías similares en su
                sitio web, en el marco de la información sobre productos de seguridad,
                vigilancia y nuestra red de distribuidores.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                2. Tipos de cookies que utilizamos
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-app-text">Cookies estrictamente necesarias:</strong> son
                  esenciales para el funcionamiento del sitio (por ejemplo, recordar tu
                  preferencia de idioma o tema claro/oscuro, y mantener la sesión). No requieren
                  consentimiento.
                </li>
                <li>
                  <strong className="text-app-text">Cookies de rendimiento o análisis:</strong> nos
                  permiten conocer cómo se usa el sitio (páginas visitadas, tiempo de estancia) para
                  mejorar la experiencia y los contenidos. Pueden ser propias o de terceros (por
                  ejemplo, herramientas de análisis web).
                </li>
                <li>
                  <strong className="text-app-text">Cookies de funcionalidad:</strong> recuerdan
                  opciones que eliges (por ejemplo, región o filtros de productos) para ofrecerte
                  una experiencia más personalizada.
                </li>
                <li>
                  <strong className="text-app-text">Cookies de marketing (si aplican):</strong> se
                  utilizan para mostrar anuncios o mensajes relevantes según tus intereses. Su uso
                  dependerá de tu consentimiento cuando la ley lo exija.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                3. Finalidad y duración
              </h2>
              <p>
                Utilizamos cookies para: garantizar el correcto funcionamiento del sitio, recordar
                tu preferencia de tema (claro/oscuro), analizar el uso del sitio de forma
                agregada, mejorar nuestros productos y la información que ofrecemos sobre
                seguridad y vigilancia, y, en su caso, gestionar el consentimiento que nos hayas
                dado. La duración varía: algunas son de sesión (se borran al cerrar el
                navegador) y otras pueden permanecer durante un tiempo determinado según su
                finalidad.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                4. Consentimiento y gestión
              </h2>
              <p>
                Cuando la normativa lo exija, te pediremos tu consentimiento para el uso de
                cookies no estrictamente necesarias. Puedes aceptar, rechazar o configurar las
                cookies a través del aviso o del panel de preferencias que te mostramos en el
                sitio. También puedes gestionar o eliminar las cookies desde la configuración de
                tu navegador; ten en cuenta que desactivar ciertas cookies puede afectar a la
                funcionalidad del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                5. Terceros
              </h2>
              <p>
                Algunas cookies pueden ser establecidas por servicios de terceros (por ejemplo,
                análisis web o redes sociales si están integradas). El tratamiento de los datos
                recabados por esos terceros se rige por sus propias políticas de privacidad y de
                cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                6. Más información
              </h2>
              <p>
                Para más detalles sobre el tratamiento de tus datos personales en relación con el
                uso del sitio y las cookies, consulta nuestra Política de privacidad. Si tienes
                dudas sobre esta política de cookies, puedes contactarnos a través de la sección
                de contacto de TecnaVision.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
