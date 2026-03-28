"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
    id: string;
    slug: string;
    name: string;
    model: string;
    subtitle: string | null;
    badge: string | null;
    mainImage: string | null;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error loading products");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return;

        try {
            const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete product");
            setProducts(products.filter(p => p.slug !== slug));
        } catch (err) {
            alert("Error al eliminar el producto");
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
                        <span className="text-app-text font-medium">Productos</span>
                    </div>
                    <h2 className="text-app-text text-2xl font-bold tracking-tight">Gestión de Productos</h2>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex h-10 items-center justify-center rounded-lg px-6 bg-primary text-white text-sm font-semibold shadow-sm hover:bg-blue-800 transition-colors gap-2"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Añadir Producto
                </Link>
            </header>

            {/* Products List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-5xl">
                    {loading ? (
                        <div className="bg-app-surface rounded-xl border border-app-border p-12 text-center shadow-sm">
                            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-[#645e8d]">Cargando productos...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-white rounded-xl border border-red-200 p-12 text-center shadow-sm">
                            <span className="material-symbols-outlined text-red-500 text-4xl mb-4">error</span>
                            <h3 className="text-lg font-bold text-app-text mb-2">Error</h3>
                            <p className="text-[#645e8d] mb-4">{error}</p>
                            <button
                                onClick={() => { setLoading(true); setError(null); fetchProducts(); }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                                Reintentar
                            </button>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="bg-app-surface rounded-xl border border-app-border p-12 text-center shadow-sm">
                            <div className="w-16 h-16 bg-app-bg-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-gray-400 text-3xl">inventory_2</span>
                            </div>
                            <h3 className="text-lg font-bold text-app-text mb-2">No hay productos</h3>
                            <p className="text-[#645e8d] mb-6">Comienza añadiendo tu primer producto al catálogo.</p>
                            <Link
                                href="/admin/products/new"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Añadir Producto
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-app-surface rounded-xl border border-app-border shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px]">
                                <thead className="bg-app-bg-subtle border-b border-app-border">
                                    <tr>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-app-text">Producto</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-app-text hidden md:table-cell">Slug</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-app-text hidden lg:table-cell">Badge</th>
                                        <th className="text-right px-6 py-4 text-sm font-semibold text-app-text">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#dcdae7]">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-app-bg-subtle transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-app-bg-subtle overflow-hidden flex-shrink-0">
                                                        {product.mainImage && (
                                                            <img
                                                                src={product.mainImage}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-app-text">{product.name} {product.model}</p>
                                                        <p className="text-sm text-[#645e8d] line-clamp-1">{product.subtitle}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <code className="text-sm bg-app-bg-subtle px-2 py-1 rounded">{product.slug}</code>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                {product.badge && (
                                                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                                                        {product.badge}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/products/${product.slug}`}
                                                        target="_blank"
                                                        className="p-2 text-[#645e8d] hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                        title="Ver en sitio"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                    </Link>
                                                    <Link
                                                        href={`/admin/products/${product.slug}/edit`}
                                                        className="p-2 text-[#645e8d] hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                        title="Editar"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.slug)}
                                                        className="p-2 text-[#645e8d] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Eliminar"
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
