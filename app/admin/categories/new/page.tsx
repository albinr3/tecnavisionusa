
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCategoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        icon: "category",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            // Auto-generate slug from name if slug is being touched or empty
            ...(name === "name" && !prev.slug ? { slug: value.toLowerCase().replace(/ /g, "-") } : {}),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create category");

            router.push("/admin/categories");
            router.refresh();
        } catch (err) {
            alert("Error creating category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Page Header */}
            <header className="bg-app-surface border-b border-app-border px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0 z-10">
                <div>
                    <div className="flex items-center gap-2 text-[#645e8d] text-sm mb-1">
                        <Link href="/admin" className="hover:text-primary transition-colors">Dashboard</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <Link href="/admin/categories" className="hover:text-primary transition-colors">Categorías</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-app-text font-medium">Nueva</span>
                    </div>
                    <h2 className="text-app-text text-2xl font-bold tracking-tight">Nueva Categoría</h2>
                </div>
            </header>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-2xl">
                    <form onSubmit={handleSubmit} className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6 md:p-8 space-y-6">

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-app-text mb-2">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-app-bg-subtle border border-app-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-app-text"
                                placeholder="Ej. Cámaras de Seguridad"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label htmlFor="slug" className="block text-sm font-semibold text-app-text mb-2">Slug</label>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                required
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-app-bg-subtle border border-app-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-app-text"
                                placeholder="ej. camaras-de-seguridad"
                            />
                            <p className="mt-1 text-xs text-[#645e8d]">Identificador único para la URL.</p>
                        </div>

                        {/* Icon */}
                        <div>
                            <label htmlFor="icon" className="block text-sm font-semibold text-app-text mb-2">Icono (Material Symbols)</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    id="icon"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    className="flex-1 px-4 py-2.5 bg-app-bg-subtle border border-app-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-app-text"
                                    placeholder="Ej. videocam"
                                />
                                <div className="w-12 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <span className="material-symbols-outlined">{formData.icon || "category"}</span>
                                </div>
                            </div>
                            <p className="mt-1 text-xs text-[#645e8d]">Nombre del icono de <a href="https://fonts.google.com/icons" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Fonts</a>.</p>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-app-text mb-2">Descripción</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-app-bg-subtle border border-app-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-app-text resize-none"
                                placeholder="Breve descripción de la categoría..."
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-app-border">
                            <Link
                                href="/admin/categories"
                                className="px-4 py-2 text-sm font-semibold text-app-text-sec hover:text-app-text transition-colors"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Guardando..." : "Crear Categoría"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}
