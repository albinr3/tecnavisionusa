import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
    title: "Contacto - TecnaVision",
    description: "Estamos aquí para asegurar tu tranquilidad. Hablemos de tus necesidades de seguridad hoy mismo.",
    alternates: {
        canonical: "/contacto",
    },
    openGraph: {
        title: "Contacto - TecnaVision",
        description: "Estamos aquí para asegurar tu tranquilidad. Hablemos de tus necesidades de seguridad hoy mismo.",
        url: "/contacto",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contacto - TecnaVision",
        description: "Estamos aquí para asegurar tu tranquilidad. Hablemos de tus necesidades de seguridad hoy mismo.",
    },
};

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-app-bg">
            <Header />

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 sm:py-16">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4 mb-16 max-w-2xl">
                        <h1 className="text-app-text text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
                            Contáctanos
                        </h1>
                        <p className="text-app-text-sec text-lg sm:text-xl font-normal leading-relaxed">
                            Estamos aquí para asegurar tu tranquilidad. Hablemos de tus necesidades de seguridad hoy mismo.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        {/* Left Column: Info & Map */}
                        <div className="flex flex-col gap-8 order-2 lg:order-1">
                            {/* Contact Details Card */}
                            <div className="bg-app-surface rounded-2xl p-6 sm:p-8 shadow-sm border border-app-border">
                                <h3 className="text-app-text font-bold text-xl mb-6">Información de Contacto</h3>
                                <div className="flex flex-col gap-1">
                                    {/* Address */}
                                    <div className="flex items-start gap-4 py-4 border-b border-app-border last:border-0">
                                        <div className="shrink-0 flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary dark:bg-white/15 dark:text-white dark:border dark:border-white/20">
                                            <span className="material-symbols-outlined">location_on</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-app-text-sec uppercase tracking-wider mb-1">Ubicación</p>
                                            <p className="text-app-text text-base font-medium">Cibao, República Dominicana</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4 py-4 border-b border-app-border last:border-0">
                                        <div className="shrink-0 flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary dark:bg-white/15 dark:text-white dark:border dark:border-white/20">
                                            <span className="material-symbols-outlined">call</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-app-text-sec uppercase tracking-wider mb-1">Teléfono</p>
                                            <p className="text-app-text text-base font-medium break-all">+1 829-796-0509</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-4 py-4 border-b border-app-border last:border-0">
                                        <div className="shrink-0 flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary dark:bg-white/15 dark:text-white dark:border dark:border-white/20">
                                            <span className="material-symbols-outlined">mail</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-app-text-sec uppercase tracking-wider mb-1">Correo Electrónico</p>
                                            <p className="text-app-text text-base font-medium break-all">Tecnavision1@gmail.com</p>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex items-start gap-4 py-4 border-b border-app-border last:border-0">
                                        <div className="shrink-0 flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary dark:bg-white/15 dark:text-white dark:border dark:border-white/20">
                                            <span className="material-symbols-outlined">schedule</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-app-text-sec uppercase tracking-wider mb-1">Horario de Atención</p>
                                            <p className="text-app-text text-base font-medium">Lun - Vie: 9:00 AM - 6:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm group">
                                {/* Map Image */}
                                <Image
                                    alt="Ubicación de TecnaVision en la región del Cibao, República Dominicana"
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                                    fill
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJNQ0FrOGvGts1oFUdzPT-4OaeFRS9QFjfUyEQIg36VHW8SIhkwGEBAkoD1kt507T0ANm1RJ-0a1GKHZ3X1glnGQG4SmepUY-3q_c4j3BOfmvtLzumMdmsUyfqQ2Xyu8zK7VicfQZHYTM84jJ1XlV_36RHxuRoKjT-ZC_9s8jEqDNgMJ7Bw0pAt1hgyWOVORQvyQ-iIKZmb2D3PuOSYsWunHegLLts4BtQgMTHhLX_r4O9zYO7LRbT2FPh5BIPaaWqpSRZFKEPmoBY"
                                />
                                {/* Overlay Pin */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="relative flex items-center justify-center">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <div className="relative inline-flex rounded-full h-12 w-12 bg-primary text-white items-center justify-center shadow-lg">
                                            <span className="material-symbols-outlined text-2xl">location_on</span>
                                        </div>
                                    </div>
                                </div>
                                {/* View on maps badge */}
                                <div className="absolute bottom-4 right-4">
                                    <button className="bg-app-surface/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm text-app-text flex items-center gap-1 hover:bg-app-surface transition-colors">
                                        Ver en Mapa
                                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="bg-app-surface rounded-2xl p-6 sm:p-10 shadow-lg shadow-app-border/50 order-1 lg:order-2">
                            <h2 className="text-2xl font-bold text-app-text mb-6">Envíanos un mensaje</h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
