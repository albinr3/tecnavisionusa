import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductForm from "@/app/components/ProductForm";

interface EditProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function EditProductPage(props: EditProductPageProps) {
    const params = await props.params;
    const { slug } = params;

    const [product, categories] = await Promise.all([
        prisma.product.findUnique({
            where: { slug },
            include: { variants: true }
        }),
        prisma.category.findMany({
            orderBy: { name: 'asc' }
        })
    ]);

    if (!product) {
        notFound();
    }

    return (
        <>
            {/* Page Header */}
            <header className="bg-app-surface border-b border-app-border px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0 z-10">
                <div>
                    <div className="flex items-center gap-2 text-[#645e8d] text-sm mb-1">
                        <Link href="/admin/products" className="hover:text-primary transition-colors">
                            Productos
                        </Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-app-text font-medium">Editar Detalle</span>
                    </div>
                    <h2 className="text-app-text text-2xl font-bold tracking-tight">Editar Producto</h2>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/products"
                        className="flex h-10 items-center justify-center rounded-lg px-4 border border-app-border bg-app-surface text-app-text text-sm font-semibold hover:bg-app-bg-subtle transition-colors"
                    >
                        Cancelar
                    </Link>
                    <button
                        form="product-form"
                        type="submit"
                        className="flex h-10 items-center justify-center rounded-lg px-6 bg-primary text-white text-sm font-semibold shadow-sm hover:bg-blue-800 transition-colors gap-2 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Guardar Cambios
                    </button>
                </div>
            </header>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <ProductForm categories={categories} initialData={product} />
            </div>
        </>
    );
}
