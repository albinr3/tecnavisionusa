
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCategoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        name_es: "",
        name_en: "",
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
            ...((name === "name" || name === "name_en" || name === "name_es") && !prev.slug
                ? { slug: value.toLowerCase().replace(/ /g, "-") }
                : {}),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!formData.name_es.trim() && !formData.name_en.trim() && !formData.name.trim()) {
                throw new Error("Please provide at least one category name (ES or EN).");
            }
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
                        <Link href="/admin/categories" className="hover:text-primary transition-colors">Categories</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-app-text font-medium">New</span>
                    </div>
                    <h2 className="text-app-text text-2xl font-bold tracking-tight">New Category</h2>
                </div>
            </header>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-2xl">
                    <form onSubmit={handleSubmit} className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6 md:p-8 space-y-6">

                        {/* Names */}
                        <div>
                            <label htmlFor="name_es" className="block text-sm font-semibold text-app-text mb-2">Name (ES)</label>
                            <input
                                type="text"
                                id="name_es"
                                name="name_es"
                                value={formData.name_es}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-app-bg-subtle border border-app-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-app-text"
                                placeholder="e.g. Camaras de Seguridad"
                            />
                        </div>
                        <div>
                            <label htmlFor="name_en" className="block text-sm font-semibold text-app-text mb-2">Name (EN)</label>
                            <input
                                type="text"
                                id="name_en"
                                name="name_en"
                                value={formData.name_en}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-app-bg-subtle border border-app-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-app-text"
                                placeholder="e.g. Security Cameras"
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-app-text mb-2">Legacy/Fallback Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-app-bg-subtle border border-app-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-app-text"
                                placeholder="Optional fallback name"
                            />
                            <p className="mt-1 text-xs text-[#645e8d]">If empty, API will use EN or ES as the canonical name.</p>
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
                                placeholder="e.g. security-cameras"
                            />
                            <p className="mt-1 text-xs text-[#645e8d]">Unique identifier for the URL.</p>
                        </div>

                        {/* Icon */}
                        <div>
                            <label htmlFor="icon" className="block text-sm font-semibold text-app-text mb-2">Icon (Material Symbols)</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    id="icon"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    className="flex-1 px-4 py-2.5 bg-app-bg-subtle border border-app-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-app-text"
                                    placeholder="e.g. videocam"
                                />
                                <div className="w-12 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <span className="material-symbols-outlined">{formData.icon || "category"}</span>
                                </div>
                            </div>
                            <p className="mt-1 text-xs text-[#645e8d]">Icon name from <a href="https://fonts.google.com/icons" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Fonts</a>.</p>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-app-text mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-app-bg-subtle border border-app-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-app-text resize-none"
                                placeholder="Short category description..."
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-app-border">
                            <Link
                                href="/admin/categories"
                                className="px-4 py-2 text-sm font-semibold text-app-text-sec hover:text-app-text transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Saving..." : "Create Category"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}


