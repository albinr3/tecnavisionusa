"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type CategoryFilterOption = {
    id: string;
    name: string;
    slug: string;
};

interface ProductsFiltersSidebarProps {
    categories: CategoryFilterOption[];
    resolutions: string[];
    features: string[];
    selectedCategories: string[];
    selectedResolutions: string[];
    selectedFeatures: string[];
    requestedQuery: string;
}

export default function ProductsFiltersSidebar({
    categories,
    resolutions,
    features,
    selectedCategories,
    selectedResolutions,
    selectedFeatures,
    requestedQuery,
}: ProductsFiltersSidebarProps) {
    const router = useRouter();
    const desktopFormRef = useRef<HTMLFormElement>(null);
    const mobileFormRef = useRef<HTMLFormElement>(null);
    const [isPending, startTransition] = useTransition();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const selectedCategorySet = new Set(selectedCategories.map((value) => value.toLowerCase()));
    const selectedResolutionSet = new Set(selectedResolutions);
    const selectedFeatureSet = new Set(selectedFeatures);
    const selectedFiltersCount = selectedCategories.length + selectedResolutions.length + selectedFeatures.length;

    useEffect(() => {
        if (typeof document === "undefined") return;
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    const buildSearchParamsFromForm = (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const params = new URLSearchParams();

        formData.getAll("category").forEach((value) => {
            const normalized = String(value).trim();
            if (normalized) params.append("category", normalized);
        });
        formData.getAll("resolution").forEach((value) => {
            const normalized = String(value).trim();
            if (normalized) params.append("resolution", normalized);
        });
        formData.getAll("feature").forEach((value) => {
            const normalized = String(value).trim();
            if (normalized) params.append("feature", normalized);
        });

        if (requestedQuery) params.set("q", requestedQuery);
        return params;
    };

    const navigateWithParams = (params: URLSearchParams) => {
        const query = params.toString();
        startTransition(() => {
            router.push(query ? `/products?${query}` : "/products");
        });
    };

    const applyDesktopFilters = () => {
        if (!desktopFormRef.current) return;
        const params = buildSearchParamsFromForm(desktopFormRef.current);
        navigateWithParams(params);
    };

    const applyMobileFilters = () => {
        if (!mobileFormRef.current) return;
        const params = buildSearchParamsFromForm(mobileFormRef.current);
        navigateWithParams(params);
        setIsMobileOpen(false);
    };

    const clearMobileFilters = () => {
        const params = new URLSearchParams();
        if (requestedQuery) params.set("q", requestedQuery);
        navigateWithParams(params);
        setIsMobileOpen(false);
    };

    return (
        <>
            <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-app-border bg-app-bg-subtle/50 p-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
                <h3 className="text-lg font-bold mb-6 text-app-text">Filtros</h3>
                <form ref={desktopFormRef} onChange={applyDesktopFilters}>
                    {requestedQuery && <input type="hidden" name="q" value={requestedQuery} />}

                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Categorías</h4>
                        <div className="space-y-3">
                            {categories.map((item) => (
                                <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value={item.slug}
                                        defaultChecked={selectedCategorySet.has(item.slug.toLowerCase())}
                                        disabled={isPending}
                                        className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                    />
                                    <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Resolución</h4>
                        <div className="space-y-3">
                            {resolutions.map((item) => (
                                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="resolution"
                                        value={item}
                                        defaultChecked={selectedResolutionSet.has(item)}
                                        disabled={isPending}
                                        className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                    />
                                    <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Características</h4>
                        <div className="space-y-3">
                            {features.map((item) => (
                                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="feature"
                                        value={item}
                                        defaultChecked={selectedFeatureSet.has(item)}
                                        disabled={isPending}
                                        className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                    />
                                    <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </form>
            </aside>

            <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
                <button
                    type="button"
                    onClick={() => setIsMobileOpen(true)}
                    className="w-full h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                    Filtrar
                    {selectedFiltersCount > 0 && (
                        <span className="inline-flex min-w-6 h-6 px-2 items-center justify-center rounded-full bg-white/20 text-xs font-extrabold">
                            {selectedFiltersCount}
                        </span>
                    )}
                </button>
            </div>

            {isMobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <button
                        type="button"
                        onClick={() => setIsMobileOpen(false)}
                        aria-label="Cerrar filtros"
                        className="absolute inset-0 bg-black/45"
                    />
                    <div className="absolute inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl bg-app-surface border-t border-app-border shadow-2xl flex flex-col">
                        <div className="px-5 py-4 border-b border-app-border flex items-center justify-between">
                            <h3 className="text-lg font-bold text-app-text">Filtros</h3>
                            <button
                                type="button"
                                onClick={() => setIsMobileOpen(false)}
                                className="size-9 rounded-full border border-app-border text-app-text"
                                aria-label="Cerrar"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>

                        <form ref={mobileFormRef} className="flex-1 overflow-y-auto px-5 py-4">
                            {requestedQuery && <input type="hidden" name="q" value={requestedQuery} />}

                            <div className="mb-8">
                                <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Categorías</h4>
                                <div className="space-y-3">
                                    {categories.map((item) => (
                                        <label key={`mobile-${item.id}`} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="category"
                                                value={item.slug}
                                                defaultChecked={selectedCategorySet.has(item.slug.toLowerCase())}
                                                disabled={isPending}
                                                className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                            />
                                            <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Resolución</h4>
                                <div className="space-y-3">
                                    {resolutions.map((item) => (
                                        <label key={`mobile-resolution-${item}`} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="resolution"
                                                value={item}
                                                defaultChecked={selectedResolutionSet.has(item)}
                                                disabled={isPending}
                                                className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                            />
                                            <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-app-text-sec mb-4 uppercase tracking-wider">Características</h4>
                                <div className="space-y-3">
                                    {features.map((item) => (
                                        <label key={`mobile-feature-${item}`} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="feature"
                                                value={item}
                                                defaultChecked={selectedFeatureSet.has(item)}
                                                disabled={isPending}
                                                className="size-4 rounded border-app-border bg-transparent text-primary focus:ring-primary focus:ring-offset-app-surface"
                                            />
                                            <span className="text-sm text-app-text group-hover:text-primary transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </form>

                        <div className="p-4 border-t border-app-border grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={clearMobileFilters}
                                disabled={isPending}
                                className="h-11 rounded-xl border border-app-border text-app-text font-semibold disabled:opacity-50"
                            >
                                Limpiar
                            </button>
                            <button
                                type="button"
                                onClick={applyMobileFilters}
                                disabled={isPending}
                                className="h-11 rounded-xl bg-primary text-white font-bold disabled:opacity-50"
                            >
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
