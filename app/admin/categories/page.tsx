
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
    id: string;
    slug: string;
    name: string;
    name_es?: string | null;
    name_en?: string | null;
    icon: string | null;
    description: string | null;
    _count: {
        products: number;
    };
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            if (!res.ok) throw new Error("Failed to fetch categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error loading categories");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete category");
            setCategories(categories.filter((c) => c.id !== id));
        } catch (err) {
            alert("Error deleting category");
        }
    };

    return (
        <>
            {/* Page Header */}
            <header className="bg-app-surface border-b border-app-border px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0 z-10">
                <div>
                    <div className="flex items-center gap-2 text-[#645e8d] text-sm mb-1">
                        <span>Dashboard</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-app-text font-medium">Categories</span>
                    </div>
                    <h2 className="text-app-text text-2xl font-bold tracking-tight">Category Management</h2>
                </div>
                <Link
                    href="/admin/categories/new"
                    className="flex h-10 items-center justify-center rounded-lg px-6 bg-primary text-white text-sm font-semibold shadow-sm hover:bg-blue-800 transition-colors gap-2"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Add Category
                </Link>
            </header>

            {/* Categories List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-5xl">
                    {loading ? (
                        <div className="bg-app-surface rounded-xl border border-app-border p-12 text-center shadow-sm">
                            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-[#645e8d]">Loading categories...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-white rounded-xl border border-red-200 p-12 text-center shadow-sm">
                            <span className="material-symbols-outlined text-red-500 text-4xl mb-4">error</span>
                            <h3 className="text-lg font-bold text-app-text mb-2">Error</h3>
                            <p className="text-[#645e8d] mb-4">{error}</p>
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    setError(null);
                                    fetchCategories();
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                                Retry
                            </button>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="bg-app-surface rounded-xl border border-app-border p-12 text-center shadow-sm">
                            <div className="w-16 h-16 bg-app-bg-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-gray-400 text-3xl">category</span>
                            </div>
                            <h3 className="text-lg font-bold text-app-text mb-2">No categories yet</h3>
                            <p className="text-[#645e8d] mb-6">Start by adding your first category.</p>
                            <Link
                                href="/admin/categories/new"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Add Category
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-app-surface rounded-xl border border-app-border shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px]">
                                    <thead className="bg-app-bg-subtle border-b border-app-border">
                                        <tr>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-app-text">Name (EN / ES)</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-app-text hidden md:table-cell">Slug</th>
                                            <th className="text-left px-6 py-4 text-sm font-semibold text-app-text hidden lg:table-cell">Description</th>
                                            <th className="text-center px-6 py-4 text-sm font-semibold text-app-text">Products</th>
                                            <th className="text-right px-6 py-4 text-sm font-semibold text-app-text">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#dcdae7]">
                                        {categories.map((category) => (
                                            <tr key={category.id} className="hover:bg-app-bg-subtle transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                            <span className="material-symbols-outlined">{category.icon || "category"}</span>
                                                        </div>
                                                        <span className="font-semibold text-app-text">
                                                            {(category.name_en || category.name) || "-"}
                                                            {(category.name_es ? ` / ${category.name_es}` : "")}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 hidden md:table-cell">
                                                    <code className="text-sm bg-app-bg-subtle px-2 py-1 rounded">{category.slug}</code>
                                                </td>
                                                <td className="px-6 py-4 hidden lg:table-cell text-sm text-[#645e8d]">
                                                    {category.description || "-"}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold bg-app-bg-subtle text-app-text-sec rounded-full">
                                                        {category._count.products}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/admin/categories/${category.id}/edit`}
                                                            className="p-2 text-[#645e8d] hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(category.id)}
                                                            className="p-2 text-[#645e8d] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}



