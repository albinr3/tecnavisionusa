"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeLogo from "./ThemeLogo";
import ThemeToggle from "./ThemeToggle";
import LoadingLink from "./LoadingLink";

type MenuCategory = {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
};

const FALLBACK_MENU_CATEGORIES: MenuCategory[] = [
    { id: "camaras-seguridad", name: "Cámaras de Seguridad", slug: "camaras-seguridad", icon: "videocam" },
    { id: "grabadores-nvr", name: "Grabadores (NVR)", slug: "nvr-grabadores", icon: "dns" },
    { id: "control-acceso", name: "Control de Acceso", slug: "control-acceso", icon: "lock_open" },
    { id: "accesorios", name: "Accesorios", slug: "accesorios", icon: "cable" },
];

const normalizeText = (value: string) =>
    value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

const getCategoryPriority = (category: MenuCategory) => {
    const key = `${normalizeText(category.name)} ${normalizeText(category.slug)}`;
    if (key.includes("camara")) return 0;
    if (key.includes("nvr") || key.includes("grabador")) return 1;
    if (key.includes("accesorio")) return 99;
    return 50;
};

const sortMenuCategories = (categories: MenuCategory[]) =>
    [...categories].sort((a, b) => {
        const diff = getCategoryPriority(a) - getCategoryPriority(b);
        if (diff !== 0) return diff;
        return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
    });

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(sortMenuCategories(FALLBACK_MENU_CATEGORIES));

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
                        slug: item.slug as string,
                        icon: (item.icon as string | null) || null,
                    }));
                if (normalized.length > 0) {
                    setMenuCategories(sortMenuCategories(normalized));
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
                        {/* Productos Dropdown */}
                        <div className="group relative">
                            <LoadingLink
                                href="/products"
                                pendingLabel="Abriendo catálogo..."
                                className="flex items-center gap-1 text-[17px] font-medium text-app-text hover:text-primary transition-colors py-6 px-3 -mx-1 rounded-xl dark:hover:bg-white dark:hover:text-primary cursor-pointer disabled:cursor-wait disabled:opacity-80"
                            >
                                Productos
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
                                            <h3 className="font-bold text-app-text text-sm uppercase tracking-wider">{category.name}</h3>
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-app-border flex justify-between items-center bg-app-bg-subtle/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-primary/10 dark:bg-white rounded-lg flex items-center justify-center text-primary shrink-0">
                                            <span className="material-symbols-outlined">hotel_class</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-app-text">¿Necesitas ayuda?</p>
                                            <p className="text-xs text-app-text-sec">Nuestros expertos te asesoran gratis</p>
                                        </div>
                                    </div>
                                    <Link href="/contacto" className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1 dark:text-white dark:hover:text-white dark:font-extrabold">
                                        Contactar Soporte <span className="material-symbols-outlined text-[16px] dark:text-white">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link className="text-[17px] font-medium text-app-text hover:text-primary transition-colors px-3 py-2 rounded-xl dark:hover:bg-white dark:hover:text-primary" href="/sobre-nosotros">Sobre nosotros</Link>
                        <Link className="text-[17px] font-bold text-app-text hover:text-primary transition-colors px-3 py-2 rounded-xl dark:hover:bg-white dark:hover:text-primary" href="/donde-comprar">¿Donde comprar?</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/contacto" className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-primary-dark">
                            Solicitar cotización
                        </Link>
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(true)}
                            className="flex md:hidden items-center justify-center p-2 text-app-text"
                            aria-label="Abrir menú"
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
                        aria-label="Cerrar menú"
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
                            Productos
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
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link
                        href="/sobre-nosotros"
                        onClick={handleNavClick}
                        className="rounded-lg px-3 py-2 text-base font-medium text-app-text hover:bg-app-bg-subtle"
                    >
                        Sobre nosotros
                    </Link>
                    <Link
                        href="/donde-comprar"
                        onClick={handleNavClick}
                        className="rounded-lg px-3 py-2 text-base font-semibold text-primary hover:bg-primary/10"
                    >
                        ¿Dónde comprar?
                    </Link>
                    <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-app-text-sec">Tema</span>
                        <ThemeToggle />
                    </div>
                    <Link
                        href="/contacto"
                        onClick={handleNavClick}
                        className="mt-2 flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white"
                    >
                        Solicitar cotización
                    </Link>
                </nav>
            </aside>
        </>
    );
}
