
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { products: true },
                },
            },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching categories" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, slug, icon, description } = body;

        const category = await prisma.category.create({
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
            { error: "Error creating category" },
            { status: 500 }
        );
    }
}
