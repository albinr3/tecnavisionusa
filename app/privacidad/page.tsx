import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Política de privacidad - TecnaVision",
  description:
    "Política de privacidad de TecnaVision. Cómo recopilamos, usamos y protegemos tus datos en relación con nuestros productos de seguridad y vigilancia.",
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-app-text">
      <Header />
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-bold text-app-text mb-4">
            Política de privacidad
          </h1>
          <p className="text-app-text-sec text-sm mb-12">
            Última actualización: febrero 2025
          </p>

          <div className="prose prose-app max-w-none space-y-8 text-app-text-sec leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                1. Responsable del tratamiento
              </h2>
              <p>
                TecnaVision (&quot;nosotros&quot;, &quot;nuestra&quot; o &quot;la empresa&quot;) es
                el responsable del tratamiento de los datos personales que recopilamos a través de
                nuestro sitio web, tienda en línea, formularios de contacto, red de distribuidores
                y en el marco de la venta e instalación de sistemas de seguridad y vigilancia
                (cámaras, NVR, control de acceso y accesorios).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                2. Datos que recopilamos
              </h2>
              <p className="mb-2">
                Podemos recopilar los siguientes tipos de datos en función de tu interacción con
                nosotros:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong className="text-app-text">Datos de identificación:</strong> nombre,
                  apellidos, correo electrónico, teléfono, dirección (para envíos o instalación).
                </li>
                <li>
                  <strong className="text-app-text">Datos de compra y postventa:</strong> pedidos,
                  facturación, garantías, soporte técnico y consultas sobre productos de seguridad.
                </li>
                <li>
                  <strong className="text-app-text">Datos de navegación:</strong> IP, tipo de
                  navegador, páginas visitadas y cookies (ver nuestra política de cookies).
                </li>
                <li>
                  <strong className="text-app-text">Datos de contacto comercial:</strong> cuando
                  solicitas cotización, información de distribuidores o soporte.
                </li>
              </ul>
              <p className="mt-3">
                No recopilamos ni tratamos datos de imágenes o grabaciones de tus sistemas de
                vigilancia; el tratamiento de esas grabaciones queda bajo tu exclusiva
                responsabilidad y la de los instaladores autorizados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                3. Finalidad y base legal
              </h2>
              <p className="mb-2">
                Utilizamos tus datos para: gestionar pedidos y entregas, atención al cliente y
                garantías, envío de información comercial (con consentimiento), mejora del sitio y
                de nuestros productos, y cumplimiento de obligaciones legales. La base legal es la
                ejecución del contrato, tu consentimiento o el interés legítimo de TecnaVision,
                según el caso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                4. Conservación y seguridad
              </h2>
              <p>
                Conservamos los datos durante el tiempo necesario para las finalidades indicadas y
                para cumplir obligaciones legales. Aplicamos medidas técnicas y organizativas
                adecuadas para proteger tus datos personales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                5. Destinatarios y transferencias
              </h2>
              <p>
                Tus datos pueden ser compartidos con distribuidores autorizados (para instalación o
                servicio en tu zona), proveedores de logística y pasarelas de pago, siempre con
                garantías adecuadas. No realizamos transferencias internacionales fuera del
                Espacio Económico Europeo salvo que sea estrictamente necesario y con las
                garantías previstas por la normativa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                6. Tus derechos
              </h2>
              <p className="mb-2">
                Puedes ejercer los derechos de acceso, rectificación, supresión, limitación del
                tratamiento, portabilidad y oposición, así como retirar tu consentimiento, dirigiéndote
                a nosotros (por ejemplo a través de la sección de contacto del sitio). Tienes
                derecho a reclamar ante la autoridad de control de protección de datos
                competente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                7. Contacto
              </h2>
              <p>
                Para cualquier consulta sobre esta política o sobre el ejercicio de tus derechos,
                contáctanos a través de la página de contacto de TecnaVision o al correo que
                figure en el sitio.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
