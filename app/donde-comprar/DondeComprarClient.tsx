"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchFilters from "./SearchFilters";
import DistributorCard from "./DistributorCard";

type DistributorItem = {
    id: string;
    name: string;
    icon: string;
    address: string;
    city: string;
    state: string | null;
    phone: string;
    email: string;
    mapUrl: string | null;
};

interface DondeComprarClientProps {
    initialDistributors: DistributorItem[];
}

export default function DondeComprarClient({ initialDistributors }: DondeComprarClientProps) {
    const [distributors, setDistributors] = useState<DistributorItem[]>(initialDistributors);
    const [loading, setLoading] = useState(false);
    const [displayCount, setDisplayCount] = useState(6);

    const fetchDistributors = async (name: string = "", state: string = "") => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (name) params.append("search", name);
            if (state) params.append("state", state);

            const response = await fetch(`/api/distributors?${params.toString()}`, { cache: "no-store" });
            const data = await response.json();
            setDistributors(Array.isArray(data) ? data : []);
            setDisplayCount(6);
        } catch (error) {
            console.error("Error fetching distributors:", error);
            setDistributors([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (name: string, state: string) => {
        fetchDistributors(name, state);
    };

    const handleLoadMore = () => {
        setDisplayCount((prev) => prev + 6);
    };

    const displayedDistributors = distributors.slice(0, displayCount);
    const hasMore = displayCount < distributors.length;

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Header />

            <main className="flex flex-col flex-grow">
                <section className="relative bg-app-bg-subtle py-12 lg:py-16 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(#1301b2 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    ></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-4xl mx-auto text-center mb-10">
                            <h1 className="text-app-text text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                                Encuentra un Distribuidor
                            </h1>
                            <p className="text-app-text-sec text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
                                Red nacional de expertos certificados en seguridad TecnaVision. Calidad y servicio garantizado cerca de ti.
                            </p>
                        </div>
                        <SearchFilters onSearch={handleSearch} />
                    </div>
                </section>

                <section className="flex-1 bg-app-surface py-12 border-t border-app-border">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                            <h2 className="text-2xl font-bold text-app-text">Resultados de Búsqueda</h2>
                            <span className="text-sm font-medium text-app-text-sec bg-slate-100 dark:bg-white dark:text-primary px-3 py-1 rounded-full text-center">
                                {loading ? "Cargando..." : `${distributors.length} Distribuidores encontrados`}
                            </span>
                        </div>

                        {loading && (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        )}

                        {!loading && distributors.length === 0 && (
                            <div className="text-center py-20">
                                <div className="size-20 mx-auto mb-4 rounded-full bg-app-bg-subtle flex items-center justify-center text-app-text-sec">
                                    <span className="material-symbols-outlined text-4xl">search_off</span>
                                </div>
                                <h3 className="text-xl font-bold text-app-text mb-2">No se encontraron distribuidores</h3>
                                <p className="text-app-text-sec">
                                    Intenta ajustar tus filtros de búsqueda o{" "}
                                    <button
                                        onClick={() => handleSearch("", "")}
                                        className="text-primary font-semibold hover:underline dark:bg-white dark:px-2 dark:py-1 dark:rounded-lg dark:inline-block"
                                    >
                                        ver todos los distribuidores
                                    </button>
                                </p>
                            </div>
                        )}

                        {!loading && distributors.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {displayedDistributors.map((distributor) => (
                                        <DistributorCard key={distributor.id} {...distributor} />
                                    ))}
                                </div>
                                {hasMore && (
                                    <div className="mt-12 flex justify-center">
                                        <button
                                            onClick={handleLoadMore}
                                            className="flex items-center gap-2 px-6 py-3 rounded-full border border-app-border bg-app-surface text-app-text font-medium hover:bg-app-bg-subtle transition-colors shadow-sm"
                                        >
                                            Cargar más resultados
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                <section className="py-16 bg-app-bg-subtle border-t border-app-border">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 space-y-6">
                                <h2 className="text-3xl font-bold text-app-text">Cobertura Nacional</h2>
                                <p className="text-app-text-sec text-lg">
                                    Con más de 50 puntos de venta y soporte técnico en todo el país, siempre tendrás un experto TecnaVision cerca de ti para asesorarte en tus proyectos de seguridad.
                                </p>
                                <ul className="space-y-4 pt-2">
                                    <li className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-primary/10 dark:bg-white flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">check</span>
                                        </div>
                                        <span className="text-app-text font-medium">Soporte Técnico Certificado</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-primary/10 dark:bg-white flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">check</span>
                                        </div>
                                        <span className="text-app-text font-medium">Inventario Disponible Inmediato</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-primary/10 dark:bg-white flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">check</span>
                                        </div>
                                        <span className="text-app-text font-medium">Garantía Extendida Directa</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 w-full max-w-lg">
                                <div className="relative w-full aspect-[4/3] bg-app-surface rounded-2xl shadow-xl overflow-hidden border border-app-border">
                                    <div
                                        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                                        style={{
                                            backgroundImage: "url('/dr-map.webp')",
                                            opacity: 0.3,
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 bg-primary/10"></div>
                                    <div className="absolute top-[32%] left-[44%] size-4 bg-primary border-2 border-white rounded-full shadow-lg animate-pulse" title="Santiago"></div>
                                    <div className="absolute top-[56%] left-[58%] size-4 bg-primary border-2 border-white rounded-full shadow-lg" title="Santo Domingo"></div>
                                    <div className="absolute top-[48%] left-[85%] size-4 bg-primary border-2 border-white rounded-full shadow-lg" title="Punta Cana"></div>
                                    <div className="absolute bottom-6 left-6 right-6 bg-app-surface/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-app-border/20">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary rounded-lg text-white">
                                                <span className="material-symbols-outlined">public</span>
                                            </div>
                                            <div>
                                                <p className="text-xs text-app-text-sec uppercase tracking-wider font-bold">
                                                    Cobertura Nacional
                                                </p>
                                                <p className="text-sm text-app-text font-bold">República Dominicana</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
