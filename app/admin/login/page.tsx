"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeLogo from "@/app/components/ThemeLogo";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/admin");
                router.refresh();
            } else {
                setError(data.error || "Error al iniciar sesión");
            }
        } catch {
            setError("Error de conexión");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-app-bg-subtle px-4">
            <div className="w-full max-w-md">
                <div className="bg-app-surface rounded-2xl shadow-xl border border-app-border p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <ThemeLogo className="h-12 w-auto" />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center text-app-text mb-2">
                        Panel de Administración
                    </h1>
                    <p className="text-sm text-app-text-sec text-center mb-8">
                        Ingresa tus credenciales para acceder
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-app-text">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-sec material-symbols-outlined text-xl">
                                    mail
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="correo@ejemplo.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-app-bg-subtle border border-app-border text-app-text placeholder-app-text-sec/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-app-text">
                                Contraseña
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-sec material-symbols-outlined text-xl">
                                    lock
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-app-bg-subtle border border-app-border text-app-text placeholder-app-text-sec/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                                    Iniciando sesión...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-xl">login</span>
                                    Iniciar Sesión
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-app-text-sec mt-6">
                    © {new Date().getFullYear()} TecnaVision. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
}
