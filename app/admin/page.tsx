import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
    const [productsCount, pendingQuotesCount, categoriesCount] = await Promise.all([
        prisma.product.count(),
        prisma.quote.count({ where: { status: "pending" } }),
        prisma.category.count(),
    ]);

    return (
        <>
            {/* Page Header */}
            <header className="bg-app-surface border-b border-app-border px-8 py-5 flex-shrink-0 z-10">
                <h2 className="text-app-text text-2xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-[#645e8d] text-sm mt-1">Bienvenido al panel de administración</p>
            </header>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-5xl">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-app-surface rounded-xl border border-app-border p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-2xl">inventory_2</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-app-text">{productsCount}</p>
                                    <p className="text-sm text-[#645e8d]">Productos Activos</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-app-surface rounded-xl border border-app-border p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-600 text-2xl">request_quote</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-app-text">{pendingQuotesCount}</p>
                                    <p className="text-sm text-[#645e8d]">Cotizaciones Pendientes</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-app-surface rounded-xl border border-app-border p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-orange-600 text-2xl">category</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-app-text">{categoriesCount}</p>
                                    <p className="text-sm text-[#645e8d]">Categorías</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-app-surface rounded-xl border border-app-border p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-app-text mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">bolt</span>
                            Acciones Rápidas
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href="/admin/products/new"
                                className="flex items-center gap-4 p-4 border border-app-border rounded-lg hover:bg-app-bg-subtle hover:border-primary/50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-primary">add</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-app-text">Añadir Producto</p>
                                    <p className="text-sm text-[#645e8d]">Crear un nuevo producto</p>
                                </div>
                            </Link>
                            <Link
                                href="/admin/products"
                                className="flex items-center gap-4 p-4 border border-app-border rounded-lg hover:bg-app-bg-subtle hover:border-primary/50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-primary">list</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-app-text">Ver Productos</p>
                                    <p className="text-sm text-[#645e8d]">Gestionar catálogo</p>
                                </div>
                            </Link>
                            <Link
                                href="/admin/distribuidores"
                                className="flex items-center gap-4 p-4 border border-app-border rounded-lg hover:bg-app-bg-subtle hover:border-primary/50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-primary">store</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-app-text">Distribuidores</p>
                                    <p className="text-sm text-[#645e8d]">Gestionar red de distribuidores</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
