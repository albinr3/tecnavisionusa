import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/products - List all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            name,
            model,
            subtitle,
            description,
            badge,
            mainImage,
            galleryImages,
            nightVisionImg,
            appDemoImg,
            appDemoBadge,
            appDemoTitle,
            appDemoDesc,
            aiSectionIcon,
            nightVisionIcon,
            specsSectionIcon,
            guaranteeIcon,
            supportIcon,
            categoryId,
            protection,
            compression,
            lens,
            power,
            resolutionOpts,
            aiDetection,
            guarantee,
            support,
        } = body;

        // Generate slug from name and model
        const slug = `${name}-${model}`
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        // Check if slug already exists
        const existing = await prisma.product.findUnique({ where: { slug } });
        if (existing) {
            return NextResponse.json(
                { error: "A product with this name and model already exists" },
                { status: 400 }
            );
        }

        const product = await prisma.product.create({
            data: {
                slug,
                name,
                model,
                subtitle,
                description,
                badge,
                mainImage,
                galleryImages: galleryImages || [],
                nightVisionImg,
                appDemoImg,
                appDemoBadge,
                appDemoTitle,
                appDemoDesc,
                aiSectionIcon,
                nightVisionIcon,
                specsSectionIcon,
                guaranteeIcon,
                supportIcon,
                categoryId: categoryId || null,
                protection,
                compression,
                lens,
                power,
                resolutionOpts: resolutionOpts || [],
                aiDetection: aiDetection || [],
                guarantee,
                support,
                variants: {
                    create: body.variants?.map((v: any) => ({
                        name: v.name,
                        description: v.description,
                        manual: v.manual,
                        datasheet: v.datasheet
                    })) || []
                }
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
