
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

function isMissingCategoryI18nColumn(error: unknown) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return false;
    if (error.code !== "P2022") return false;
    const missingColumn =
        typeof error.meta?.column === "string" ? error.meta.column.toLowerCase() : "";
    return missingColumn === "" || missingColumn.includes("name_es") || missingColumn.includes("name_en");
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, name_es, name_en, slug, icon, description } = body;
        const normalizedNameEs = typeof name_es === "string" ? name_es.trim() : "";
        const normalizedNameEn = typeof name_en === "string" ? name_en.trim() : "";
        const fallbackName = typeof name === "string" ? name.trim() : "";
        const canonicalName = normalizedNameEn || normalizedNameEs || fallbackName;

        if (!canonicalName) {
            return NextResponse.json(
                { error: "At least one category name is required." },
                { status: 400 }
            );
        }

        try {
            const category = await prisma.category.update({
                where: { id },
                data: {
                    name: canonicalName,
                    name_es: normalizedNameEs || null,
                    name_en: normalizedNameEn || null,
                    slug,
                    icon,
                    description,
                },
            });

            return NextResponse.json(category);
        } catch (error) {
            if (!isMissingCategoryI18nColumn(error)) throw error;

            const category = await prisma.category.update({
                where: { id },
                data: {
                    name: canonicalName,
                    slug,
                    icon,
                    description,
                },
            });

            return NextResponse.json({
                ...category,
                name_es: null,
                name_en: null,
            });
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Error updating category" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.category.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Category deleted" });
    } catch (error) {
        return NextResponse.json(
            { error: "Error deleting category" },
            { status: 500 }
        );
    }
}
