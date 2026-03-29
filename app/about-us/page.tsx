import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: "About us - TecnaVision",
    description:
        "Discover the history, specialization, and future vision of TecnaVision in professional video surveillance solutions.",
    alternates: {
        canonical: "/about-us",
    },
    openGraph: {
        title: "About us - TecnaVision",
        description:
            "Discover the history, specialization, and future vision of TecnaVision in professional video surveillance solutions.",
        url: "/about-us",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "About us - TecnaVision",
        description:
            "Discover the history, specialization, and future vision of TecnaVision in professional video surveillance solutions.",
    },
};

export default function AboutUs() {
    return (
        <div className="bg-app-bg text-app-text antialiased selection:bg-primary selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        name: "About us - TecnaVision",
                        url: `${siteUrl}/about-us`,
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
                                <h2 className="text-primary font-bold uppercase tracking-wider text-sm mb-4">About Us</h2>
                                <h1 className="text-4xl font-black leading-tight tracking-tight text-app-text sm:text-5xl lg:text-6xl mb-8">
                                    Reliable technology to protect what matters.
                                </h1>
                                <p className="text-xl leading-relaxed text-app-text-sec">
                                    TecnaVision was born in 2026 with a clear vision: to develop professional video surveillance solutions that combine reliable technology, smart design, and easy integration for homes and businesses.
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
                                    Designed in the United States, the brand emerges from the work of a team with experience in technology, networks, and security systems, who identified the need for stable, compatible equipment designed for real environments, beyond technical specifications.
                                </p>
                                <p>
                                    In its initial stage, TecnaVision began operations exclusively in the Dominican Republic, betting on a growing market with an increasing demand for professional security solutions. This decision allows the brand to adapt its products and distribution model to local conditions, such as climate, electrical infrastructure, and the specific needs of installers and end users.
                                </p>
                            </div>
                            <div className="relative group">
                                <div className="aspect-square rounded-3xl bg-app-surface border border-app-border shadow-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/nosotros.webp')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold tracking-tight">2026 Vision</h3>
                                        <p className="mt-1 text-blue-100 opacity-90">Innovation from the source</p>
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
                                <h2 className="text-3xl font-bold text-app-text">Our Specialization</h2>
                                <div className="prose prose-lg text-app-text-sec max-w-none">
                                    <p className="text-xl">
                                        TecnaVision specializes in the development and marketing of IP cameras, NVR recorders, and PoE switches, designed under open standards and oriented to easily integrate with existing solutions.
                                    </p>
                                    <p className="mt-6">
                                        The brand works through a network of authorized distributors and installers, ensuring the proper use of the equipment and a reliable customer experience.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-app-surface p-8 rounded-3xl border border-app-border shadow-sm flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">network_check</span>
                                    </div>
                                    <h4 className="font-bold text-lg">Open Standards</h4>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">groups</span>
                                    </div>
                                    <h4 className="font-bold text-lg">Expert Network</h4>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">support_agent</span>
                                    </div>
                                    <h4 className="font-bold text-lg">Local Warranty</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Expansion Section */}
                <section className="py-20 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <h2 className="text-3xl font-bold text-app-text">Future Projection</h2>
                            <p className="text-xl leading-relaxed text-app-text-sec">
                                With a solid base in the Dominican Republic, TecnaVision projects its gradual expansion to other countries in the region, bringing its value proposition to new markets that demand professional, scalable, and durable video surveillance solutions.
                            </p>
                            <div className="pt-8 block">
                                <div className="inline-flex flex-col items-center">
                                    <p className="text-lg font-bold text-app-text mb-4 italic">
                                        &quot;Today, TecnaVision represents a brand focused on the present, with a clear vision for the future: protecting people, businesses, and spaces with reliable, well-designed technology.&quot;
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
                                <h2 className="text-3xl lg:text-4xl font-black mb-6">Join the new generation of security</h2>
                                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                                    We are transforming electronic surveillance with solutions designed for the real world.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/products" className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl">
                                        View Products
                                    </Link>
                                    <Link href="/contact" className="bg-primary-dark/50 border border-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-colors">
                                        Become a Distributor
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
