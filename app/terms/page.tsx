import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Terms of Service - TecnaVision",
  description:
    "Terms and conditions for using TecnaVision's website and services for security and surveillance products.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-app-text">
      <Header />
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-bold text-app-text mb-4">
            Terms of Service
          </h1>
          <p className="text-app-text-sec text-sm mb-12">
            Last updated: February 2025
          </p>

          <div className="space-y-8 text-app-text-sec leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                1. Scope and acceptance
              </h2>
              <p>
                These terms and conditions (&quot;Terms&quot;) govern the use of the TecnaVision website
                and the services offered through it (information about security products, cameras,
                NVRs, access control, distributor network, quote requests, and contact channels).
                Access to and use of the site implies acceptance of these Terms. If you do not
                agree, do not use the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                2. Site use and content
              </h2>
              <p>
                Site content (text, images, product specifications) is for informational purposes
                and may be changed without prior notice. You agree to use the site lawfully,
                without fraudulent purposes and without harming third parties or TecnaVision.
                Mass automated use (scraping), impersonation, and attempts to access restricted
                areas without authorization are not allowed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                3. Products, quotes, and purchases
              </h2>
              <p>
                Product and pricing information on the site does not constitute a binding offer.
                Sales may be made through the website, authorized distributors, or other channels;
                in each case, the specific terms communicated to you will apply. Quotes requested
                through the site are indicative and subject to confirmation. Installation and use
                of surveillance systems must comply with applicable laws in your country or
                territory.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                4. Intellectual property
              </h2>
              <p>
                All intellectual property rights related to the site, its content, and the
                TecnaVision brand are owned by TecnaVision or its licensors. Reproduction,
                distribution, or commercial use of content is not permitted without prior written
                authorization.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                5. Limitation of liability
              </h2>
              <p>
                TecnaVision will not be liable for indirect, consequential, or lost-profit damages
                arising from the use or inability to use the site or the information contained on
                it. To the extent permitted by law, our liability is limited to the warranty terms
                of the products you have purchased. The site is provided &quot;as is&quot;; we do not
                guarantee the absence of errors or interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                6. Third-party links
              </h2>
              <p>
                The site may contain links to third-party sites (for example, distributors or
                social media). We do not control the content or privacy practices of those sites;
                access to them is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                7. Changes and governing law
              </h2>
              <p>
                We reserve the right to modify these Terms at any time; changes become effective
                when published on the site. Continued use of the site after changes implies
                acceptance of the updated Terms. Governing law and competent courts will be those
                corresponding to your place of residence and applicable regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                8. Contact
              </h2>
              <p>
                For questions about these Terms, contact TecnaVision through the contact section of
                our website.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



