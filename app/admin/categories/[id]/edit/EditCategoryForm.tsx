"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditableCategory = {
    id: string;
    name: string;
    name_es?: string | null;
    name_en?: string | null;
    slug: string;
    icon: string | null;
    description: string | null;
};

interface EditCategoryFormProps {
    category: EditableCategory;
}

export default function EditCategoryForm({ category }: EditCategoryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: category.name,
        name_es: category.name_es || "",
        name_en: category.name_en || "",
        slug: category.slug,
        icon: category.icon || "",
        description: category.description || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!formData.name_es.trim() && !formData.name_en.trim() && !formData.name.trim()) {
                throw new Error("Please provide at least one category name (ES or EN).");
            }
            const res = await fetch(`/api/categories/${category.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update category");

            router.push("/admin/categories");
            router.refresh();
        } catch (err) {
            alert("Error updating category");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                />
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
                    />
                    <div className="w-12 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <span className="material-symbols-outlined">{formData.icon || "category"}</span>
                    </div>
                </div>
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
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}

