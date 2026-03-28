"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeLogo from "@/app/components/ThemeLogo";
import ThemeToggle from "@/app/components/ThemeToggle";
import { navItems } from "./navItems";

interface AdminSidebarProps {
    variant?: "desktop" | "mobile";
}

export default function AdminSidebar({ variant = "desktop" }: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    const isDesktop = variant === "desktop";
    const asideClasses = isDesktop
        ? "w-64 flex-shrink-0 bg-app-surface border-r border-app-border z-20 h-full overflow-y-auto hidden md:flex flex-col"
        : "w-72 flex-shrink-0 bg-app-surface border-r border-app-border z-20 h-full overflow-y-auto flex flex-col";

    return (
        <aside className={asideClasses}>
            <div className="p-6 flex flex-col gap-1">
                {/* Logo */}
                <div className="mb-8">
                    <ThemeLogo className="h-10 w-auto" />
                    <p className="text-app-text-sec text-[10px] font-normal mt-1 uppercase tracking-tighter opacity-70">Admin Panel</p>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive(item.href)
                                ? "bg-primary/10 text-primary"
                                : "text-app-text-sec hover:bg-app-bg-subtle hover:text-primary"
                                }`}
                        >
                            <span className={`material-symbols-outlined ${isActive(item.href) ? "fill" : ""} group-hover:text-primary transition-colors`}>
                                {item.icon}
                            </span>
                            <span className={`text-sm ${isActive(item.href) ? "font-bold" : "font-medium"}`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Theme toggle + User Profile Footer */}
            <div className="mt-auto p-6 border-t border-app-border space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-app-text-sec">Tema</span>
                    <ThemeToggle />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-app-border overflow-hidden relative">
                        <img
                            className="object-cover w-full h-full"
                            alt="Admin User Profile"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdpJO57QXABxN_0GLaXF3eizEmT74rpK89lXAwrNR11A8vYCnST8oqWYNDKHoJji4Bvi-_JVXfXvse0ASOZmX34RQSWMN5m4Q6QZzRbo6Fzx9PMOJeDWL0d_8X5yqtJkwUW4lcEnBD15jSZhc6E-YnjrXHWdE7BdKMfY9d-xatE7TdK_hlNLg6B9IcwStaoe7lBKJza5_735K3eRjuTi4WbuQqyrvR64_rZvTYSMQ4PdsJBBS0nN-R8pjfBYfRqlH1yJiCQ2npeuGU"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold text-app-text">Admin User</p>
                        <p className="text-xs text-app-text-sec">Tecnavision1@gmail.com</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">logout</span>
                    <span className="text-sm font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
