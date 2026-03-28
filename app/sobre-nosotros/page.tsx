import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: "Sobre nosotros - TecnaVision",
    description:
        "Conoce la historia, especialización y visión de futuro de TecnaVision en soluciones de videovigilancia profesional.",
    alternates: {
        canonical: "/sobre-nosotros",
    },
    openGraph: {
        title: "Sobre nosotros - TecnaVision",
        description:
            "Conoce la historia, especialización y visión de futuro de TecnaVision en soluciones de videovigilancia profesional.",
        url: "/sobre-nosotros",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sobre nosotros - TecnaVision",
        description:
            "Conoce la historia, especialización y visión de futuro de TecnaVision en soluciones de videovigilancia profesional.",
    },
};

export default function SobreNosotros() {
    return (
        <div className="bg-app-bg text-app-text antialiased selection:bg-primary selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        name: "Sobre nosotros - TecnaVision",
                        url: `${siteUrl}/sobre-nosotros`,
                        about: {
                            "@type": "Organization",
                            name: "TecnaVision",
                            url: siteUrl,
                        },
                    }),
                }}
            />
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-app-bg-subtle">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="max-w-3xl">
                                <h2 className="text-primary font-bold uppercase tracking-wider text-sm mb-4">Sobre Nosotros</h2>
                                <h1 className="text-4xl font-black leading-tight tracking-tight text-app-text sm:text-5xl lg:text-6xl mb-8">
                                    Tecnología confiable para proteger lo que importa.
                                </h1>
                                <p className="text-xl leading-relaxed text-app-text-sec">
                                    TecnaVision nace en 2026 con una visión clara: desarrollar soluciones profesionales de videovigilancia que combinen tecnología confiable, diseño inteligente y facilidad de integración para hogares y negocios.
                                </p>
                            </div>
                            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-app-border group">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/steptodown.com932948.jpg')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
                            </div>
                        </div>
                    </div>

                    {/* Abstract Background Elements */}
                    <div className="absolute -right-20 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-50 blur-3xl dark:opacity-20"></div>
                </section>

                {/* Content Section */}
                <section className="py-20 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                            <div className="space-y-8 text-lg leading-relaxed text-app-text-sec">
                                <p>
                                    Diseñada en Estados Unidos, la marca surge del trabajo de un equipo con experiencia en tecnología, redes y sistemas de seguridad, que identificó la necesidad de equipos estables, compatibles y pensados para entornos reales, más allá de las especificaciones técnicas.
                                </p>
                                <p>
                                    En su etapa inicial, TecnaVision inicia operaciones exclusivamente en República Dominicana, apostando por un mercado en crecimiento y con una demanda cada vez mayor de soluciones de seguridad profesionales. Esta decisión permite a la marca adaptar sus productos y su modelo de distribución a las condiciones locales, como el clima, la infraestructura eléctrica y las necesidades específicas de instaladores y usuarios finales.
                                </p>
                            </div>
                            <div className="relative group">
                                <div className="aspect-square rounded-3xl bg-app-surface border border-app-border shadow-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/nosotros.webp')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold tracking-tight">Visión 2026</h3>
                                        <p className="mt-1 text-blue-100 opacity-90">Innovación desde el origen</p>
                                    </div>
                                </div>
                                {/* Decorative squares */}
                                <div className="absolute -bottom-6 -right-6 -z-10 size-24 rounded-2xl bg-primary/10"></div>
                                <div className="absolute -top-6 -left-6 -z-10 size-24 rounded-2xl bg-blue-100 dark:bg-blue-900/20"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Specialization & Strategy Section */}
                <section className="bg-app-bg-subtle py-20 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <div className="grid gap-12 lg:grid-cols-3">
                            <div className="lg:col-span-2 space-y-8">
                                <h2 className="text-3xl font-bold text-app-text">Nuestra Especialización</h2>
                                <div className="prose prose-lg text-app-text-sec max-w-none">
                                    <p className="text-xl">
                                        TecnaVision se especializa en el desarrollo y comercialización de cámaras IP, grabadores NVR y switches PoE, diseñados bajo estándares abiertos y orientados a integrarse fácilmente con soluciones existentes.
                                    </p>
                                    <p className="mt-6">
                                        La marca trabaja a través de una red de distribuidores e instaladores autorizados, asegurando un uso adecuado de los equipos y una experiencia confiable para el cliente.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-app-surface p-8 rounded-3xl border border-app-border shadow-sm flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">network_check</span>
                                    </div>
                                    <h4 className="font-bold text-lg">Estándares Abiertos</h4>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">groups</span>
                                    </div>
                                    <h4 className="font-bold text-lg">Red de Expertos</h4>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">support_agent</span>
                                    </div>
                                    <h4 className="font-bold text-lg">Garantía Local</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Expansion Section */}
                <section className="py-20 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <h2 className="text-3xl font-bold text-app-text">Proyección de Futuro</h2>
                            <p className="text-xl leading-relaxed text-app-text-sec">
                                Con una base sólida en República Dominicana, TecnaVision proyecta su expansión gradual hacia otros países de la región, llevando su propuesta de valor a nuevos mercados que demandan soluciones de videovigilancia profesionales, escalables y duraderas.
                            </p>
                            <div className="pt-8 block">
                                <div className="inline-flex flex-col items-center">
                                    <p className="text-lg font-bold text-app-text mb-4 italic">
                                        &quot;Hoy, TecnaVision representa una marca enfocada en el presente, con una visión clara hacia el futuro: proteger personas, negocios y espacios con tecnología confiable y bien diseñada.&quot;
                                    </p>
                                    <div className="h-1 w-20 bg-primary rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="pb-20 lg:pb-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <div className="bg-primary rounded-[32px] p-8 lg:p-16 text-center text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl lg:text-4xl font-black mb-6">Únete a la nueva generación de seguridad</h2>
                                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                                    Estamos transformando la vigilancia electrónica con soluciones pensadas para el mundo real.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/products" className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl">
                                        Ver Productos
                                    </Link>
                                    <Link href="/contacto" className="bg-primary-dark/50 border border-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-colors">
                                        Ser Distribuidor
                                    </Link>
                                </div>
                            </div>

                            {/* Background effect */}
                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 rounded-full bg-white/10 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-96 rounded-full bg-blue-900/20 blur-3xl"></div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
