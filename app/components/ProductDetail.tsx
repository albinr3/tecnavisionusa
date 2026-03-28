"use client";

import Image from "next/image";
import { type FormEvent, type MouseEvent, useState } from "react";
import { Product, ProductVariant, Category } from "@prisma/client";

type ProductWithRelations = Product & {
    category: Category | null;
    variants: ProductVariant[];
};

interface ProductDetailProps {
    product: ProductWithRelations;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
        product.variants.length > 0 ? product.variants[0].id : null
    );
    const [activeImage, setActiveImage] = useState<string>(product.mainImage || "");
    const [isZoomActive, setIsZoomActive] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [clientEmail, setClientEmail] = useState("");
    const [quoteMessage, setQuoteMessage] = useState("");
    const [isSendingQuote, setIsSendingQuote] = useState(false);
    const [quoteError, setQuoteError] = useState<string | null>(null);
    const [quoteSuccess, setQuoteSuccess] = useState<string | null>(null);

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId);

    // Merge logic: Variant overrides > Product base
    // Use fallback to product fields if variant doesn't have them (or if they are explicit nulls in logic, but here schema says optional strings)
    // Note: Schema says manual/datasheet are overrides. Name is mandatory for variant.

    const displayData = {
        name: selectedVariant ? `${product.name} (${selectedVariant.name})` : `${product.name} ${product.model}`,
        subtitle: product.subtitle || "",
        description: selectedVariant?.description || product.description || "",
        manual: selectedVariant?.manual || null, // You might want a product level manual too if schema supports it, for now using variants or nothing? 
        // Wait, schema has no manual on Product? Let's check. 
        // Schema: Product has no manual field. Variant has manual. 
        // If no variant selected, we rely on hardcoded "Consultar" or similar?
        // Actually, the previous hardcoded page had manual buttons.
        datasheet: selectedVariant?.datasheet || null,
    };

    const images = {
        main: product.mainImage || "",
        gallery: product.galleryImages || [],
        night_vision: product.nightVisionImg || "/NIGHT.webp",
        app_demo: product.appDemoImg || product.mainImage || "",
    };

    const specs = {
        protection: product.protection || "N/A",
        compression: product.compression || "N/A",
        lens: product.lens || "N/A",
        power: product.power || "N/A",
        resolution_options: product.resolutionOpts || [],
    };

    const features = {
        ai_detection: product.aiDetection || [],
        guarantee: product.guarantee || "Consultar",
        support: product.support || "Soporte técnico",
    };

    const appShowcase = {
        badge: product.appDemoBadge || "Live Monitoring",
        title: product.appDemoTitle || "Control total en la palma de tu mano.",
        description: product.appDemoDesc || "Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.",
    };

    const sectionIcons = {
        ai: product.aiSectionIcon || "psychology",
        nightVision: product.nightVisionIcon || "nightlight_round",
        specs: product.specsSectionIcon || "settings_suggest",
        guarantee: product.guaranteeIcon || "verified_user",
        support: product.supportIcon || "support_agent",
    };

    const isNvrProduct = (product.category?.slug || "").toLowerCase().includes("nvr")
        || (product.category?.name || "").toLowerCase().includes("nvr");
    const activeImageSrc = activeImage || images.main;
    const isMainImageActive = !activeImage || activeImage === images.main;
    const quoteProductName = selectedVariant
        ? `${product.name} ${product.model} (${selectedVariant.name})`
        : `${product.name} ${product.model}`;

    const getDefaultQuoteMessage = () => {
        return [
            "Hola equipo de TecnaVision,",
            "",
            `Deseo una cotización para el producto: ${quoteProductName}.`,
            "",
            "Quedo atento(a) a su respuesta.",
        ]
            .filter(Boolean)
            .join("\n");
    };

    const openQuoteModal = () => {
        setQuoteError(null);
        setQuoteSuccess(null);
        setQuoteMessage(getDefaultQuoteMessage());
        setIsQuoteModalOpen(true);
    };

    const submitQuote = async (e: FormEvent) => {
        e.preventDefault();
        setQuoteError(null);
        setQuoteSuccess(null);

        const email = clientEmail.trim().toLowerCase();
        if (!email) {
            setQuoteError("Ingresa un correo electrónico.");
            return;
        }

        setIsSendingQuote(true);

        try {
            const res = await fetch("/api/quotes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productSlug: product.slug,
                    productName: quoteProductName,
                    clientEmail: email,
                    message: quoteMessage.trim(),
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || "No se pudo enviar la solicitud.");
            }

            setQuoteSuccess("Solicitud enviada. Puedes verla en /admin/quotes.");
            setTimeout(() => {
                setIsQuoteModalOpen(false);
            }, 900);
        } catch (error) {
            setQuoteError(error instanceof Error ? error.message : "No se pudo enviar la solicitud.");
        } finally {
            setIsSendingQuote(false);
        }
    };

    const handleImageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };

    return (
        <div className="bg-app-bg text-app-text antialiased selection:bg-primary selection:text-white">
            {/* Product Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start mb-24 md:mb-32">
                {/* Product Image */}
                <div className="relative">
                    <div
                        className="aspect-square bg-app-surface rounded-3xl overflow-hidden shadow-sm border border-app-border flex items-center justify-center p-8 relative cursor-zoom-in"
                        onMouseEnter={() => setIsZoomActive(true)}
                        onMouseLeave={() => setIsZoomActive(false)}
                        onMouseMove={handleImageMouseMove}
                    >
                        {activeImageSrc ? (
                            <Image
                                key={activeImageSrc}
                                alt={`${product.name} view`}
                                className="object-contain mix-blend-multiply dark:mix-blend-normal"
                                fill
                                priority={isMainImageActive}
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                src={activeImageSrc}
                            />
                        ) : null}
                        {activeImageSrc && isZoomActive && (
                            <div
                                className="hidden lg:block absolute w-28 h-28 rounded-md border border-white/80 shadow-lg bg-white/10 pointer-events-none"
                                style={{
                                    left: `${zoomPosition.x}%`,
                                    top: `${zoomPosition.y}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        )}
                    </div>
                    <div
                        className={`hidden lg:block absolute left-full ml-4 top-0 w-96 aspect-square rounded-3xl overflow-hidden border border-app-border shadow-sm bg-app-surface transition-opacity duration-150 z-20 ${isZoomActive && activeImageSrc ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    >
                        {activeImageSrc && (
                            <div
                                className="w-full h-full bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${activeImageSrc})`,
                                    backgroundSize: "280%",
                                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                }}
                            />
                        )}
                    </div>
                    {images.gallery.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2">
                            {[images.main, ...images.gallery].filter(Boolean).map((img, idx) => (
                                <button
                                    key={`${img}-${idx}`}
                                    type="button"
                                    onClick={() => setActiveImage(img)}
                                    className={`rounded-lg overflow-hidden border transition-colors ${activeImage === img ? "border-primary" : "border-app-border hover:border-primary/60"}`}
                                >
                                    <img
                                        alt={`Vista ${idx + 1}`}
                                        className="w-full h-16 object-cover"
                                        decoding="async"
                                        fetchPriority="low"
                                        loading="lazy"
                                        src={img}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl opacity-50"></div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center h-full space-y-8">
                    <div>
                        {product.badge && (
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                                    {product.badge}
                                </span>
                            </div>
                        )}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-app-text leading-tight">
                            {product.name} <span className="text-primary">{product.model}</span>
                        </h1>
                        {displayData.subtitle && (
                            <p className="text-base md:text-lg text-app-text-sec mb-4">
                                {displayData.subtitle}
                            </p>
                        )}
                        <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
                            <div className="flex text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`material-icons-outlined text-lg ${i < product.rating ? "" : "text-app-border"}`}>star</span>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-app-text-sec">Grade A Security</span>
                        </div>

                        {/* Description depends on variant */}
                        <p className="text-lg text-app-text-sec leading-relaxed font-light transition-all duration-300">
                            {(selectedVariant?.description) ? (
                                <span className="font-medium text-primary block mb-1">
                                    [{selectedVariant.name}]
                                </span>
                            ) : null}
                            {displayData.description}
                        </p>
                    </div>

                    {/* Variants Selector */}
                    {product.variants.length > 0 && (
                        <div className="py-6 border-t border-b border-app-border">
                            <label className="block text-xs font-bold uppercase tracking-wider text-app-text-sec mb-4">
                                Seleccionar Versión
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {product.variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariantId(variant.id)}
                                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${selectedVariantId === variant.id
                                            ? "bg-primary text-white border border-primary shadow-lg shadow-primary/30 transform scale-105"
                                            : "border border-app-border hover:border-primary hover:bg-app-bg-subtle"
                                            }`}
                                    >
                                        {variant.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Resolution Options (Legacy/Base) - Show if no variants or just as info */}
                    {product.variants.length === 0 && specs.resolution_options.length > 0 && (
                        <div className="py-6 border-t border-b border-app-border">
                            <label className="block text-xs font-bold uppercase tracking-wider text-app-text-sec mb-4">Resoluciones Disponibles</label>
                            <div className="flex flex-wrap gap-3">
                                {specs.resolution_options.map((res: string, i: number) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-lg text-xs font-medium border border-app-border bg-app-bg-subtle text-app-text-sec"
                                    >
                                        {res}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quote CTA */}
                    <div className="space-y-4" id="quote">
                        <button
                            type="button"
                            onClick={openQuoteModal}
                            className="w-full bg-primary hover:bg-primary-dark text-white text-lg font-semibold py-5 px-8 rounded-2xl shadow-xl shadow-primary/25 transform hover:-translate-y-1 transition-all duration-300 flex flex-wrap items-center justify-center gap-3 text-center"
                        >
                            <span className="material-icons-outlined">request_quote</span>
                            Solicitar Cotización {selectedVariant ? `(${selectedVariant.name})` : ""}
                        </button>

                        {(displayData.manual || displayData.datasheet) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {displayData.manual && (
                                    <a href={displayData.manual} target="_blank" className="w-full bg-app-surface hover:bg-app-bg-subtle text-app-text border border-app-border font-semibold py-4 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm">
                                        <span className="material-icons-outlined text-app-text-sec group-hover:text-primary transition-colors">menu_book</span>
                                        Manual
                                    </a>
                                )}
                                {displayData.datasheet && (
                                    <a href={displayData.datasheet} target="_blank" className="w-full bg-app-surface hover:bg-app-bg-subtle text-app-text border border-app-border font-semibold py-4 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm">
                                        <span className="material-icons-outlined text-app-text-sec group-hover:text-primary transition-colors">description</span>
                                        Ficha Técnica
                                    </a>
                                )}
                            </div>
                        )}

                        <p className="text-center text-xs text-app-text-sec">
                            Respuesta garantizada en menos de 2 horas hábiles.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-icons-outlined">{sectionIcons.guarantee}</span>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-app-text">Garantía Extendida</p>
                                <p className="text-xs text-app-text-sec mt-1">{features.guarantee}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-icons-outlined">{sectionIcons.support}</span>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-app-text">Soporte Dedicado</p>
                                <p className="text-xs text-app-text-sec mt-1">{features.support}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isNvrProduct ? (
                <>
                    <div className="mb-32">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-4 text-app-text">Rendimiento NVR para Operación Continua</h2>
                            <p className="text-app-text-sec">Diseñado para monitoreo profesional con procesamiento eficiente, almacenamiento confiable y acceso rápido a evidencia.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="group bg-app-surface rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-app-border">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white mb-6">
                                    <span className="material-symbols-outlined">{sectionIcons.ai}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-app-text">Inteligencia de Datos</h3>
                                <p className="text-sm text-app-text-sec mb-6 leading-relaxed">
                                    Motor de análisis Deep Learning integrado para clasificación de objetos, búsqueda rápida de eventos y reconocimiento de atributos en tiempo real.
                                </p>
                                <ul className="space-y-3">
                                    {(features.ai_detection.length ? features.ai_detection : ["Búsqueda por atributos", "Filtrado Persona/Vehículo", "Mapas de calor"]).slice(0, 3).map((feature: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-app-text">
                                            <span className="material-icons-outlined text-primary text-lg">check</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="group bg-app-surface rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-app-border flex flex-col">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white mb-6">
                                    <span className="material-symbols-outlined">storage</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-app-text">Almacenamiento Inteligente</h3>
                                <p className="text-sm text-app-text-sec mb-6 leading-relaxed">
                                    Optimización de espacio con compresión avanzada que reduce el ancho de banda y el consumo de almacenamiento sin perder calidad.
                                </p>
                                <div className="mt-auto rounded-xl overflow-hidden h-40 relative group bg-app-bg-subtle border border-app-border flex items-center justify-center">
                                    <img
                                        alt="Gráfico NVR"
                                        className="w-full h-full object-cover"
                                        decoding="async"
                                        fetchPriority="low"
                                        loading="lazy"
                                        src="/graficonvr.webp"
                                    />
                                </div>
                            </div>
                            <div className="group bg-app-surface rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-app-border">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white mb-6">
                                    <span className="material-symbols-outlined">settings_input_component</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-app-text">Especificaciones NVR</h3>
                                <p className="text-sm text-app-text-sec mb-6 leading-relaxed">
                                    Arquitectura de hardware diseñada para la continuidad operativa y alta disponibilidad de video.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                        <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">HDD</p>
                                        <p className="font-semibold text-primary">{specs.protection !== "N/A" ? specs.protection : "2x HDD"}</p>
                                    </div>
                                    <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                        <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Megapixeles</p>
                                        <p className="font-semibold text-primary">{specs.compression !== "N/A" ? specs.compression : "8 MP"}</p>
                                    </div>
                                    <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                        <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Salida de Video</p>
                                        <p className="font-semibold text-primary">{specs.lens !== "N/A" ? specs.lens : "4K UHD"}</p>
                                    </div>
                                    <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                        <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">PoE</p>
                                        <p className="font-semibold text-primary">{specs.power}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 mb-24">
                        <div className="absolute inset-0">
                            <img
                                alt="Control room monitoring background"
                                className="w-full h-full object-cover opacity-20"
                                decoding="async"
                                fetchPriority="low"
                                loading="lazy"
                                src={images.app_demo}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent"></div>
                        </div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-5 sm:p-8 md:p-20">
                            <div className="text-white space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#1801b0]"></span>
                                    <span className="text-xs font-medium tracking-wide">{appShowcase.badge}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold leading-tight">{appShowcase.title}</h2>
                                <p className="text-gray-400 text-lg font-light max-w-md">{appShowcase.description}</p>
                            </div>
                            <div className="flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-lg aspect-video bg-gray-800 rounded-xl border-4 border-gray-700 shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                                    <img
                                        alt="Vista NVR con cámaras"
                                        className="w-full h-full object-cover"
                                        decoding="async"
                                        fetchPriority="low"
                                        loading="lazy"
                                        src="/nvrcamaras.webp"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    {/* Technology Features */}
                    <div className="mb-32">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold mb-4 text-app-text">Tecnología Superior</h2>
                            <p className="text-app-text-sec">Diseñada para operar en las condiciones más difíciles con la mayor inteligencia.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* AI Detection */}
                            <div className="group bg-app-surface rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-app-border">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white mb-6">
                                    <span className="material-symbols-outlined">{sectionIcons.ai}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-app-text">Detección AI</h3>
                                <p className="text-sm text-app-text-sec mb-6 leading-relaxed">
                                    Algoritmos de aprendizaje profundo que clasifican objetivos humanos y vehiculares para filtrar alarmas irrelevantes.
                                </p>
                                <ul className="space-y-3">
                                    {features.ai_detection.map((feature: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-app-text">
                                            <span className="material-icons-outlined text-primary text-lg">check</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Night Vision */}
                            <div className="group bg-app-surface rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-app-border flex flex-col">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white mb-6">
                                    <span className="material-symbols-outlined">{sectionIcons.nightVision}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-app-text">Visión Nocturna EXIR</h3>
                                <p className="text-sm text-app-text-sec mb-6 leading-relaxed">
                                    Tecnología infrarroja avanzada que proporciona una iluminación uniforme y de largo alcance hasta 30 metros en oscuridad total (0 Lux).
                                </p>
                                <div className="mt-auto rounded-xl overflow-hidden h-40 relative group">
                                    <img
                                        alt="Night vision sample"
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        decoding="async"
                                        fetchPriority="low"
                                        loading="lazy"
                                        src={images.night_vision}
                                        onError={(event) => {
                                            event.currentTarget.onerror = null;
                                            event.currentTarget.src = "/NIGHT.webp";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <span className="absolute bottom-3 left-3 text-xs text-white font-medium px-2 py-1 bg-black/50 rounded backdrop-blur-sm">Modo Nocturno</span>
                                </div>
                            </div>

                            {/* Pro Specs */}
                            <div className="group bg-app-surface rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-app-border">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white mb-6">
                                    <span className="material-symbols-outlined">{sectionIcons.specs}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-app-text">Especificaciones Pro</h3>
                                <p className="text-sm text-app-text-sec mb-6 leading-relaxed">
                                    Hardware robusto preparado para integraciones profesionales y condiciones climáticas adversas.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                        <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Protección IP</p>
                                        <p className="font-semibold text-primary">{specs.protection}</p>
                                    </div>
                                    <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                        <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Compresión</p>
                                        <p className="font-semibold text-primary">{specs.compression}</p>
                                    </div>
                                    <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                        <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Lente</p>
                                        <p className="font-semibold text-primary">{specs.lens}</p>
                                    </div>
                                    <div className="bg-app-bg-subtle p-3 rounded-xl border border-app-border">
                                        <p className="text-[10px] uppercase text-app-text-sec font-bold mb-1">Alimentación</p>
                                        <p className="font-semibold text-primary">{specs.power}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile App Showcase */}
                    <section className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 mb-24">
                        <div className="absolute inset-0">
                            <img
                                alt="Modern home interior blurred"
                                className="w-full h-full object-cover opacity-20"
                                decoding="async"
                                fetchPriority="low"
                                loading="lazy"
                                src={images.app_demo}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent"></div>
                        </div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-5 sm:p-8 md:p-20">
                            <div className="text-white space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-xs font-medium tracking-wide">{appShowcase.badge}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold leading-tight">{appShowcase.title}</h2>
                                <p className="text-gray-400 text-lg font-light max-w-md">
                                    {appShowcase.description}
                                </p>
                            </div>
                            <div className="flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-64 h-[500px] bg-gray-800 rounded-[2.5rem] border-[8px] border-gray-700 shadow-2xl overflow-hidden transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                                    <div className="bg-gray-900 h-14 flex items-center justify-between px-4 text-white z-10 relative">
                                        <span className="material-icons-outlined text-sm">menu</span>
                                        <span className="font-medium text-sm">TecnoVision</span>
                                        <span className="material-icons-outlined text-sm">notifications</span>
                                    </div>
                                    <div className="relative h-48 bg-gray-800">
                                        <img
                                            alt="Security footage on phone"
                                            className="w-full h-full object-cover opacity-80"
                                            decoding="async"
                                            fetchPriority="low"
                                            loading="lazy"
                                            src="/humano.webp"
                                        />
                                        <div className="absolute top-2 right-2 bg-red-600 rounded-full h-2 w-2 animate-pulse"></div>
                                        <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-1 rounded">Cam 01 - Exterior</div>
                                    </div>
                                    <div className="p-4 bg-gray-50 h-full">
                                        <div className="space-y-3">
                                            <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500 flex gap-3">
                                                <div className="bg-red-50 p-2 rounded-full text-red-500 shrink-0">
                                                    <span className="material-icons-outlined text-sm">warning</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-800">Cruce de línea detectado</p>
                                                    <p className="text-[10px] text-gray-500">Perímetro Norte • Hace 1 min</p>
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-primary flex gap-3">
                                                <div className="bg-blue-50 p-2 rounded-full text-primary shrink-0">
                                                    <span className="material-icons-outlined text-sm">directions_car</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-800">Vehículo en zona de carga</p>
                                                    <p className="text-[10px] text-gray-500">Acceso Sur • Hace 3 min</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {isQuoteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-xl rounded-2xl border border-app-border bg-app-surface shadow-2xl">
                        <div className="flex items-center justify-between border-b border-app-border px-5 py-4">
                            <h3 className="text-lg font-bold text-app-text">Solicitar cotización</h3>
                            <button
                                type="button"
                                onClick={() => setIsQuoteModalOpen(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-app-text-sec hover:bg-app-bg-subtle"
                                aria-label="Cerrar modal de cotización"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={submitQuote} className="space-y-4 px-5 py-5">
                            <div>
                                <p className="text-sm font-semibold text-app-text">{quoteProductName}</p>
                            </div>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-app-text">Correo electrónico</span>
                                <input
                                    type="email"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    placeholder="tu-correo@empresa.com"
                                    className="h-11 rounded-lg border border-app-border bg-app-bg-subtle px-3 text-sm text-app-text focus:border-primary focus:outline-none"
                                    required
                                />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-app-text">Mensaje</span>
                                <textarea
                                    value={quoteMessage}
                                    onChange={(e) => setQuoteMessage(e.target.value)}
                                    rows={7}
                                    className="rounded-lg border border-app-border bg-app-bg-subtle px-3 py-2 text-sm text-app-text focus:border-primary focus:outline-none resize-y"
                                    required
                                />
                            </label>

                            {quoteError && (
                                <p className="text-sm text-red-600">{quoteError}</p>
                            )}
                            {quoteSuccess && (
                                <p className="text-sm text-green-600">{quoteSuccess}</p>
                            )}

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsQuoteModalOpen(false)}
                                    className="h-10 rounded-lg border border-app-border px-4 text-sm font-semibold text-app-text hover:bg-app-bg-subtle"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSendingQuote}
                                    className="h-10 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
                                >
                                    {isSendingQuote ? "Enviando..." : "Enviar solicitud"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
