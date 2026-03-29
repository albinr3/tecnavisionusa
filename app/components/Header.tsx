"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeLogo from "./ThemeLogo";
import ThemeToggle from "./ThemeToggle";
import LoadingLink from "./LoadingLink";
import { getLocalizedCategoryName } from "@/lib/category-localization";
import type { MarketCode } from "@/lib/market";

type MenuCategory = {
    id: string;
    name: string;
    name_es?: string | null;
    name_en?: string | null;
    slug: string;
    icon: string | null;
};

const FALLBACK_MENU_CATEGORIES: MenuCategory[] = [
    { id: "camaras-seguridad", name: "Security Cameras", name_es: "Camaras de Seguridad", name_en: "Security Cameras", slug: "camaras-seguridad", icon: "videocam" },
    { id: "grabadores-nvr", name: "Recorders (NVR)", name_es: "Grabadores (NVR)", name_en: "Recorders (NVR)", slug: "nvr-grabadores", icon: "dns" },
    { id: "control-acceso", name: "Access Control", name_es: "Control de Acceso", name_en: "Access Control", slug: "control-acceso", icon: "lock_open" },
    { id: "accesorios", name: "Accessories", name_es: "Accesorios", name_en: "Accessories", slug: "accesorios", icon: "cable" },
];

const normalizeText = (value: string) =>
    value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

const getCategoryPriority = (category: MenuCategory, market: MarketCode) => {
    const displayName = getLocalizedCategoryName(category, market);
    const key = `${normalizeText(displayName)} ${normalizeText(category.slug)}`;
    if (key.includes("camara")) return 0;
    if (key.includes("nvr") || key.includes("grabador")) return 1;
    if (key.includes("accesorio")) return 99;
    return 50;
};

const sortMenuCategories = (categories: MenuCategory[], market: MarketCode) =>
    [...categories].sort((a, b) => {
        const diff = getCategoryPriority(a, market) - getCategoryPriority(b, market);
        if (diff !== 0) return diff;
        const aName = getLocalizedCategoryName(a, market);
        const bName = getLocalizedCategoryName(b, market);
        return aName.localeCompare(bName, market === "RD" ? "es" : "en", { sensitivity: "base" });
    });

const ACTIVE_MARKET: MarketCode =
    process.env.NEXT_PUBLIC_SITE_MARKET?.trim().toUpperCase() === "RD" ? "RD" : "US";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(sortMenuCategories(FALLBACK_MENU_CATEGORIES, ACTIVE_MARKET));

    useEffect(() => {
        if (typeof document === "undefined") return;
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetch("/api/categories", { cache: "no-store" });
                if (!res.ok) return;
                const data = await res.json();
                if (!Array.isArray(data) || data.length === 0) return;
                const normalized = data
                    .filter((item) => item?.id && item?.name && item?.slug)
                    .map((item) => ({
                        id: item.id as string,
                        name: item.name as string,
                        name_es: (item.name_es as string | null) || null,
                        name_en: (item.name_en as string | null) || null,
                        slug: item.slug as string,
                        icon: (item.icon as string | null) || null,
                    }));
                if (normalized.length > 0) {
                    setMenuCategories(sortMenuCategories(normalized, ACTIVE_MARKET));
                }
            } catch {
                // Keep fallback menu when request fails.
            }
        };

        loadCategories();
    }, []);

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-app-border bg-app-surface/80 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <ThemeLogo className="h-8 w-auto" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {/* Products Dropdown */}
                        <div className="group relative">
                            <LoadingLink
                                href="/products"
                                pendingLabel="Opening catalog..."
                                className="flex items-center gap-1 text-[17px] font-medium text-app-text hover:text-primary transition-colors py-6 px-3 -mx-1 rounded-xl dark:hover:bg-white dark:hover:text-primary cursor-pointer disabled:cursor-wait disabled:opacity-80"
                            >
                                Products
                                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-180">expand_more</span>
                            </LoadingLink>

                            {/* Mega Menu Dropdown */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-app-surface rounded-2xl shadow-xl border border-app-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 p-6 z-50">
                                <div className="grid grid-cols-2 gap-4">
                                    {menuCategories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/products?category=${category.slug}`}
                                            className="flex items-center gap-3 rounded-xl border border-app-border bg-app-bg-subtle/50 p-3 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                                        >
                                            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-white text-primary shrink-0">
                                                <span className="material-symbols-outlined text-[22px]">{category.icon || "category"}</span>
                                            </span>
                                            <h3 className="font-bold text-app-text text-sm uppercase tracking-wider">{getLocalizedCategoryName(category, ACTIVE_MARKET)}</h3>
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-app-border flex justify-between items-center bg-app-bg-subtle/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-primary/10 dark:bg-white rounded-lg flex items-center justify-center text-primary shrink-0">
                                            <span className="material-symbols-outlined">hotel_class</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-app-text">Need help?</p>
                                            <p className="text-xs text-app-text-sec">Our experts advise you for free</p>
                                        </div>
                                    </div>
                                    <Link href="/contact" className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1 dark:text-white dark:hover:text-white dark:font-extrabold">
                                        Contact Support <span className="material-symbols-outlined text-[16px] dark:text-white">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link className="text-[17px] font-medium text-app-text hover:text-primary transition-colors px-3 py-2 rounded-xl dark:hover:bg-white dark:hover:text-primary" href="/about-us">About us</Link>
                        <Link className="text-[17px] font-bold text-app-text hover:text-primary transition-colors px-3 py-2 rounded-xl dark:hover:bg-white dark:hover:text-primary" href="/where-to-buy">Where to buy?</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/contact" className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-primary-dark">
                            Request a quote
                        </Link>
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(true)}
                            className="flex md:hidden items-center justify-center p-2 text-app-text"
                            aria-label="Open menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-nav-drawer"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />
            <aside
                id="mobile-nav-drawer"
                className={`fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-app-surface shadow-2xl transform transition-transform md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                aria-hidden={!isMenuOpen}
            >
                <div className="flex items-center justify-between border-b border-app-border px-6 py-4">
                    <ThemeLogo className="h-8 w-auto" />
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-app-text"
                        aria-label="Close menu"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <nav className="flex flex-col gap-3 px-6 py-4 overflow-y-auto">
                    <div>
                        <Link
                            href="/products"
                            onClick={handleNavClick}
                            className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-app-text-sec hover:text-primary transition-colors"
                        >
                            Products
                        </Link>
                        <div className="flex flex-col gap-2">
                            {menuCategories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/products?category=${category.slug}`}
                                    onClick={handleNavClick}
                                    className="flex items-center gap-3 rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm font-semibold text-app-text hover:bg-app-bg-subtle hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px] text-primary">{category.icon || "category"}</span>
                                    {getLocalizedCategoryName(category, ACTIVE_MARKET)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link
                        href="/about-us"
                        onClick={handleNavClick}
                        className="rounded-lg px-3 py-2 text-base font-medium text-app-text hover:bg-app-bg-subtle"
                    >
                        About us
                    </Link>
                    <Link
                        href="/where-to-buy"
                        onClick={handleNavClick}
                        className="rounded-lg px-3 py-2 text-base font-semibold text-primary hover:bg-primary/10"
                    >
                        Where to buy?
                    </Link>
                    <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-app-text-sec">Theme</span>
                        <ThemeToggle />
                    </div>
                    <Link
                        href="/contact"
                        onClick={handleNavClick}
                        className="mt-2 flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white"
                    >
                        Request a quote
                    </Link>
                </nav>
            </aside>
        </>
    );
}


