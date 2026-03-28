import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { normalizeMarket, sanitizeMarkets } from "@/lib/market";

// GET /api/products - List all products
export async function GET(request: NextRequest) {
    try {
        const marketParam = request.nextUrl.searchParams.get("market");
        const market = normalizeMarket(marketParam);
        if (marketParam && !market) {
            return NextResponse.json(
                { error: "Invalid market. Use RD or US." },
                { status: 400 }
            );
        }
        const products = await prisma.product.findMany({
            where: market
                ? {
                    availableMarkets: {
                        has: market,
                    },
                }
                : undefined,
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
            availableMarkets,
            title_es,
            title_en,
            description_es,
            description_en,
        } = body;

        const sanitizedMarkets = sanitizeMarkets(availableMarkets);
        if (sanitizedMarkets.length === 0) {
            return NextResponse.json(
                { error: "Select at least one market (RD or US)." },
                { status: 400 }
            );
        }

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
                title_es: title_es?.trim() || null,
                title_en: title_en?.trim() || null,
                subtitle,
                description,
                description_es: description_es?.trim() || null,
                description_en: description_en?.trim() || null,
                availableMarkets: sanitizedMarkets,
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
