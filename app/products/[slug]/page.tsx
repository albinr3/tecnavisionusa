import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ProductDetail from "@/app/components/ProductDetail";
import prisma from "@/lib/db";
import { getSiteMarket, type MarketCode } from "@/lib/market";
import { getLocalizedProductDescription, getLocalizedProductName } from "@/lib/product-localization";
import { getLocalizedCategoryName } from "@/lib/category-localization";
import { getSiteUrl } from "@/lib/site-url";

// Define Props locally as Next.js types can be tricky
type Props = {
    params: Promise<{ slug: string }>;
};

// Helper to get product from DB
async function getProduct(slug: string, market: MarketCode) {
    return prisma.product.findFirst({
        where: {
            slug,
            availableMarkets: {
                has: market,
            },
        },
        include: { category: true },
    });
}

function toAbsoluteUrl(pathOrUrl: string, siteUrl: string) {
    if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
        return pathOrUrl;
    }
    return `${siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

// SEO Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const activeMarket = getSiteMarket();
    const product = await getProduct(slug, activeMarket);
    const siteUrl = getSiteUrl();

    if (!product) {
        return {
            title: "Product not found - TecnaVision",
        };
    }

    const productPath = `/products/${product.slug}`;
    const localizedName = getLocalizedProductName(product, activeMarket);
    const localizedDescription = getLocalizedProductDescription(product, activeMarket) || product.subtitle || "TecnaVision product";
    const imageUrl = toAbsoluteUrl(
        product.mainImage || "/web-app-manifest-512x512.png",
        siteUrl
    );
    const title = `${localizedName} ${product.model} - TecnaVision`;
    const description = localizedDescription;
    return {
        title,
        description,
        alternates: {
            canonical: productPath,
        },
        openGraph: {
            title,
            description,
            type: "website",
            url: productPath,
            images: [
                {
                    url: imageUrl,
                    alt: `${localizedName} ${product.model}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}

// Page Component
export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const activeMarket = getSiteMarket();

    // Fetch product with variants
    const product = await prisma.product.findFirst({
        where: {
            slug,
            availableMarkets: {
                has: activeMarket,
            },
        },
        include: {
            category: true,
            variants: true // Fetch variants
        },
    });

    if (!product) {
        notFound();
    }
    const siteUrl = getSiteUrl();
    const productPath = `/products/${product.slug}`;
    const productUrl = `${siteUrl}${productPath}`;
    const imageUrl = toAbsoluteUrl(product.mainImage || "/web-app-manifest-512x512.png", siteUrl);
    const localizedName = getLocalizedProductName(product, activeMarket);
    const localizedDescription = getLocalizedProductDescription(product, activeMarket) || product.subtitle || "TecnaVision product";
    const localizedCategoryName = product.category
        ? getLocalizedCategoryName(product.category, activeMarket)
        : activeMarket === "RD"
            ? "Seguridad"
            : "Security";
    const productName = `${localizedName} ${product.model}`.trim();
    const description = localizedDescription;
    const localizedProduct = {
        ...product,
        name: localizedName,
        description: localizedDescription || product.description,
    };
    const additionalProperty = [
        product.protection ? { "@type": "PropertyValue", name: "Protection", value: product.protection } : null,
        product.compression ? { "@type": "PropertyValue", name: "Compression", value: product.compression } : null,
        product.lens ? { "@type": "PropertyValue", name: "Lens", value: product.lens } : null,
        product.power ? { "@type": "PropertyValue", name: "Power", value: product.power } : null,
    ].filter((value): value is { "@type": "PropertyValue"; name: string; value: string } => Boolean(value));

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productName,
        image: [imageUrl, ...product.galleryImages.map((img) => toAbsoluteUrl(img, siteUrl))],
        description,
        sku: product.model,
        brand: {
            "@type": "Brand",
            name: "TecnaVision",
        },
        category: localizedCategoryName,
        url: productUrl,
        additionalProperty,
        ...(product.reviewsCount > 0 ? {
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviewsCount,
            },
        } : {}),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${siteUrl}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: `${siteUrl}/products`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: productName,
                item: productUrl,
            },
        ],
    };

    return (
        <div className="bg-app-bg text-app-text antialiased selection:bg-primary selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <ProductDetail product={localizedProduct} />
            </main>

            <Footer />
        </div>
    );
}


