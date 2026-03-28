import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import EditCategoryForm from "./EditCategoryForm";

interface EditCategoryPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditCategoryPage(props: EditCategoryPageProps) {
    const params = await props.params;
    const { id } = params;

    const category = await prisma.category.findUnique({
        where: { id },
    });

    if (!category) {
        notFound();
    }

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
                        <span className="text-app-text font-medium">Editar</span>
                    </div>
                    <h2 className="text-app-text text-2xl font-bold tracking-tight">Editar Categoría</h2>
                </div>
            </header>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-2xl">
                    <EditCategoryForm category={category} />
                </div>
            </div>
        </>
    );
}
