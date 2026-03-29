import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Cookie Policy - TecnaVision",
  description:
    "Information about the use of cookies and similar technologies on the TecnaVision website.",
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
            Cookie Policy
          </h1>
          <p className="text-app-text-sec text-sm mb-12">
            Last updated: February 2025
          </p>

          <div className="space-y-8 text-app-text-sec leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                1. What are cookies?
              </h2>
              <p>
                Cookies are small text files that websites store on your device (computer, tablet,
                or mobile phone) when you visit them. They are used to remember preferences,
                analyze traffic, or personalize content. This policy explains how TecnaVision uses
                cookies and similar technologies on its website in the context of information about
                security and surveillance products and our distributor network.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                2. Types of cookies we use
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-app-text">Strictly necessary cookies:</strong> these are
                  essential for website operation (for example, remembering your language or
                  light/dark theme preference and keeping your session active). They do not require
                  consent.
                </li>
                <li>
                  <strong className="text-app-text">Performance or analytics cookies:</strong> these
                  let us understand how the site is used (visited pages, time spent) to improve
                  the experience and content. They may be first-party or third-party (for example,
                  web analytics tools).
                </li>
                <li>
                  <strong className="text-app-text">Functionality cookies:</strong> these remember
                  options you choose (for example, region or product filters) to provide a more
                  personalized experience.
                </li>
                <li>
                  <strong className="text-app-text">Marketing cookies (when applicable):</strong>
                  these are used to show ads or messages relevant to your interests. Their use
                  depends on your consent when required by law.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                3. Purpose and duration
              </h2>
              <p>
                We use cookies to ensure proper site operation, remember your theme preference
                (light/dark), analyze website usage in aggregate form, improve our products and the
                information we provide about security and surveillance, and, where applicable,
                manage the consent you have given us. Duration varies: some are session cookies
                (deleted when you close the browser), while others may remain for a defined period
                depending on their purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                4. Consent and control
              </h2>
              <p>
                When required by regulation, we will ask for your consent to use non-essential
                cookies. You can accept, reject, or configure cookies through the notice or the
                preference panel shown on the site. You can also manage or delete cookies through
                your browser settings; note that disabling certain cookies may affect site
                functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                5. Third parties
              </h2>
              <p>
                Some cookies may be set by third-party services (for example, web analytics or
                social networks if integrated). Processing of data collected by those third parties
                is governed by their own privacy and cookie policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-app-text mb-3">
                6. More information
              </h2>
              <p>
                For more details on how we process your personal data in relation to website usage
                and cookies, review our Privacy Policy. If you have questions about this cookie
                policy, you can contact us through TecnaVision's contact section.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

