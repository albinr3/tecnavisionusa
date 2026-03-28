
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, slug, icon, description } = body;

        const category = await prisma.category.update({
            where: { id },
            data: {
                name,
                slug,
                icon,
                description,
            },
        });

        return NextResponse.json(category);
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
