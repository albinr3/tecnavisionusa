import { NextResponse } from "next/server";
import prisma from "@/lib/db";

type Props = {
    params: Promise<{ slug: string }>;
};

// GET /api/products/[slug] - Get a single product
export async function GET(request: Request, { params }: Props) {
    try {
        const { slug } = await params;

        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

// PUT /api/products/[slug] - Update a product
export async function PUT(request: Request, { params }: Props) {
    try {
        const { slug } = await params;
        const body = await request.json();

        const product = await prisma.product.update({
            where: { slug },
            data: {
                name: body.name,
                model: body.model,
                subtitle: body.subtitle,
                description: body.description,
                badge: body.badge,
                mainImage: body.mainImage,
                galleryImages: body.galleryImages || [],
                nightVisionImg: body.nightVisionImg,
                appDemoImg: body.appDemoImg,
                appDemoBadge: body.appDemoBadge,
                appDemoTitle: body.appDemoTitle,
                appDemoDesc: body.appDemoDesc,
                aiSectionIcon: body.aiSectionIcon,
                nightVisionIcon: body.nightVisionIcon,
                specsSectionIcon: body.specsSectionIcon,
                guaranteeIcon: body.guaranteeIcon,
                supportIcon: body.supportIcon,
                categoryId: body.categoryId || null,
                protection: body.protection,
                compression: body.compression,
                lens: body.lens,
                power: body.power,
                resolutionOpts: body.resolutionOpts || [],
                aiDetection: body.aiDetection || [],
                guarantee: body.guarantee,
                support: body.support,
            },
        });

        // Handle variants update if provided
        if (body.variants) {
            await prisma.$transaction([
                prisma.productVariant.deleteMany({
                    where: { productId: product.id }
                }),
                prisma.productVariant.createMany({
                    data: body.variants.map((v: any) => ({
                        productId: product.id,
                        name: v.name,
                        description: v.description,
                        manual: v.manual,
                        datasheet: v.datasheet
                    }))
                })
            ]);
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
        );
    }
}

// DELETE /api/products/[slug] - Delete a product
export async function DELETE(request: Request, { params }: Props) {
    try {
        const { slug } = await params;

        await prisma.product.delete({
            where: { slug },
        });

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 500 }
        );
    }
}
