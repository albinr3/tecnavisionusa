import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Términos del servicio - TecnaVision",
  description:
    "Términos y condiciones de uso del sitio web y de los servicios de TecnaVision, productos de seguridad y vigilancia.",
  alternates: {
    canonical: "/terminos",
  },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-app-text">
      <Header />
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-bold text-app-text mb-4">
            Términos del servicio
          </h1>
          <p className="text-app-text-sec text-sm mb-12">
            Última actualización: febrero 2025
          </p>

          <div className="space-y-8 text-app-text-sec leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                1. Objeto y aceptación
              </h2>
              <p>
                Los presentes términos y condiciones (&quot;Términos&quot;) regulan el uso del sitio
                web de TecnaVision y de los servicios ofrecidos a través del mismo (información
                sobre productos de seguridad, cámaras, NVR, control de acceso, red de
                distribuidores, solicitud de cotizaciones y contacto). El acceso y uso del sitio
                implica la aceptación de estos Términos. Si no estás de acuerdo, no utilices el
                sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                2. Uso del sitio y contenido
              </h2>
              <p>
                El contenido del sitio (textos, imágenes, especificaciones de productos) es
                orientativo y puede ser modificado sin previo aviso. Te comprometes a usar el
                sitio de forma lícita, sin fines fraudulentos ni que perjudiquen a terceros o a
                TecnaVision. No está permitido el uso automatizado masivo (scraping), la
                suplantación de identidad ni el intento de acceder a áreas restringidas sin
                autorización.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                3. Productos, cotizaciones y compras
              </h2>
              <p>
                La información sobre productos y precios en el sitio no constituye una oferta
                vinculante. Las ventas pueden realizarse a través de la web, de distribuidores
                autorizados o por otros canales; en cada caso se aplicarán las condiciones
                particulares que se te comuniquen. Las cotizaciones solicitadas a través del
                sitio son orientativas y sujetas a confirmación. La instalación y el uso de
                sistemas de vigilancia deben ajustarse a la legislación aplicable en tu país o
                territorio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                4. Propiedad intelectual
              </h2>
              <p>
                Todos los derechos de propiedad intelectual sobre el sitio, el contenido y la
                marca TecnaVision son propiedad de TecnaVision o de sus licenciantes. No está
                permitida la reproducción, distribución o uso comercial del contenido sin
                autorización previa por escrito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                5. Limitación de responsabilidad
              </h2>
              <p>
                TecnaVision no será responsable de daños indirectos, consecuentes o lucro cesante
                derivados del uso o la imposibilidad de uso del sitio o de la información en él
                contenida. En la medida permitida por la ley, nuestra responsabilidad se limitará
                a los términos de la garantía de los productos que hayas adquirido. El sitio se
                ofrece &quot;tal cual&quot;; no garantizamos la ausencia de errores o interrupciones.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                6. Enlaces a terceros
              </h2>
              <p>
                El sitio puede contener enlaces a sitios de terceros (por ejemplo distribuidores o
                redes sociales). No controlamos el contenido ni las prácticas de privacidad de
                esos sitios; el acceso a los mismos es bajo tu propia responsabilidad.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                7. Modificaciones y ley aplicable
              </h2>
              <p>
                Nos reservamos el derecho de modificar estos Términos en cualquier momento; los
                cambios serán efectivos desde su publicación en el sitio. El uso continuado del
                sitio tras las modificaciones implica la aceptación de los nuevos Términos. La
                ley aplicable y los tribunales competentes serán los que correspondan según tu
                residencia y la normativa vigente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                8. Contacto
              </h2>
              <p>
                Para consultas sobre estos Términos puedes dirigirte a TecnaVision a través de
                la sección de contacto de nuestra web.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
