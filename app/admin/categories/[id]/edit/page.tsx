import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import EditCategoryForm from "./EditCategoryForm";
import { Prisma } from "@prisma/client";

interface EditCategoryPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditCategoryPage(props: EditCategoryPageProps) {
    const params = await props.params;
    const { id } = params;

    let category: {
        id: string;
        name: string;
        name_es?: string | null;
        name_en?: string | null;
        slug: string;
        icon: string | null;
        description: string | null;
    } | null = null;

    try {
        category = await prisma.category.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                name_es: true,
                name_en: true,
                slug: true,
                icon: true,
                description: true,
            },
        });
    } catch (error) {
        const isMissingI18n =
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2022";

        if (!isMissingI18n) throw error;

        const fallback = await prisma.category.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                slug: true,
                icon: true,
                description: true,
            },
        });

        category = fallback
            ? { ...fallback, name_es: null, name_en: null }
            : null;
    }

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
                        <Link href="/admin/categories" className="hover:text-primary transition-colors">Categories</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-app-text font-medium">Edit</span>
                    </div>
                    <h2 className="text-app-text text-2xl font-bold tracking-tight">Edit Category</h2>
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


