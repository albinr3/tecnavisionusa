import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Privacy Policy - TecnaVision",
  description:
    "TecnaVision Privacy Policy. How we collect, use, and protect your data in relation to our security and surveillance products.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-app-text">
      <Header />
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-bold text-app-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-app-text-sec text-sm mb-12">
            Last updated: February 2025
          </p>

          <div className="prose prose-app max-w-none space-y-8 text-app-text-sec leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                1. Data controller
              </h2>
              <p>
                TecnaVision (&quot;we&quot;, &quot;our&quot;, or &quot;the company&quot;) is the data controller
                of the personal data we collect through our website, online store, contact forms,
                distributor network, and in connection with the sale and installation of security
                and surveillance systems (cameras, NVRs, access control, and accessories).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                2. Data we collect
              </h2>
              <p className="mb-2">
                Depending on your interaction with us, we may collect the following types of data:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong className="text-app-text">Identification data:</strong> first name, last
                  name, email, phone number, and address (for shipping or installation).
                </li>
                <li>
                  <strong className="text-app-text">Purchase and after-sales data:</strong> orders,
                  billing, warranties, technical support, and inquiries about security products.
                </li>
                <li>
                  <strong className="text-app-text">Browsing data:</strong> IP, browser type,
                  visited pages, and cookies (see our cookie policy).
                </li>
                <li>
                  <strong className="text-app-text">Business contact data:</strong> when you request
                  a quote, distributor information, or support.
                </li>
              </ul>
              <p className="mt-3">
                We do not collect or process image or recording data from your surveillance
                systems; processing of those recordings remains your sole responsibility and that
                of authorized installers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                3. Purpose and legal basis
              </h2>
              <p className="mb-2">
                We use your data to manage orders and deliveries, provide customer support and
                warranties, send commercial information (with consent), improve the website and our
                products, and comply with legal obligations. Legal basis may be contract
                performance, your consent, or TecnaVision's legitimate interest, as applicable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                4. Retention and security
              </h2>
              <p>
                We retain data for as long as necessary for the stated purposes and to comply with
                legal obligations. We apply appropriate technical and organizational measures to
                protect your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                5. Recipients and transfers
              </h2>
              <p>
                Your data may be shared with authorized distributors (for installation or service
                in your area), logistics providers, and payment gateways, always with adequate
                safeguards. We do not carry out international transfers outside the European
                Economic Area unless strictly necessary and with safeguards required by regulation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                6. Your rights
              </h2>
              <p className="mb-2">
                You can exercise your rights of access, rectification, deletion, restriction of
                processing, portability, and objection, and you may withdraw your consent by
                contacting us (for example through the site's contact section). You also have the
                right to file a complaint with the competent data protection authority.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                7. Contact
              </h2>
              <p>
                For any questions about this policy or the exercise of your rights, contact us
                through TecnaVision's contact page or the email listed on the site.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



