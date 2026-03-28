"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeLogo from "@/app/components/ThemeLogo";
import ThemeToggle from "@/app/components/ThemeToggle";
import AdminSidebar from "./AdminSidebar";
import { navItems } from "./navItems";

interface AdminShellProps {
    children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (typeof document === "undefined") return;
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen md:h-screen w-full overflow-hidden bg-app-bg-subtle text-app-text antialiased">
            <AdminSidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 bg-app-surface border-b border-app-border">
                    <div className="flex items-center gap-2">
                        <ThemeLogo className="h-8 w-auto" />
                        <span className="text-sm font-semibold text-app-text">Admin</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(true)}
                            className="text-app-text p-2"
                            aria-label="Abrir menú"
                            aria-expanded={isMenuOpen}
                            aria-controls="admin-mobile-drawer"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>

                {children}
            </main>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />
            <aside
                id="admin-mobile-drawer"
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-app-surface border-r border-app-border transform transition-transform md:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                aria-hidden={!isMenuOpen}
            >
                <div className="flex items-center justify-between p-4 border-b border-app-border">
                    <div className="flex items-center gap-2">
                        <ThemeLogo className="h-8 w-auto" />
                        <span className="text-sm font-semibold text-app-text">Admin</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-app-text p-2"
                        aria-label="Cerrar menú"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <nav className="flex flex-col gap-2 p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-app-text-sec hover:bg-app-bg-subtle hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
    );
}
