import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ProductDetail from "@/app/components/ProductDetail";
import prisma from "@/lib/db";
import { getSiteUrl } from "@/lib/site-url";

// Define Props locally as Next.js types can be tricky
type Props = {
    params: Promise<{ slug: string }>;
};

// Helper to get product from DB
async function getProduct(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
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
    const product = await getProduct(slug);
    const siteUrl = getSiteUrl();

    if (!product) {
        return {
            title: "Producto no encontrado - TecnaVision",
        };
    }

    const productPath = `/products/${product.slug}`;
    const imageUrl = toAbsoluteUrl(
        product.mainImage || "/web-app-manifest-512x512.png",
        siteUrl
    );
    const title = `${product.name} ${product.model} - TecnaVision`;
    const description = product.description || product.subtitle || "Producto TecnaVision";

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
                    alt: `${product.name} ${product.model}`,
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

    // Fetch product with variants
    const product = await prisma.product.findUnique({
        where: { slug },
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
    const productName = `${product.name} ${product.model}`.trim();
    const description = product.description || product.subtitle || "Producto TecnaVision";
    const additionalProperty = [
        product.protection ? { "@type": "PropertyValue", name: "Protección", value: product.protection } : null,
        product.compression ? { "@type": "PropertyValue", name: "Compresión", value: product.compression } : null,
        product.lens ? { "@type": "PropertyValue", name: "Lente", value: product.lens } : null,
        product.power ? { "@type": "PropertyValue", name: "Alimentación", value: product.power } : null,
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
        category: product.category?.name || "Seguridad",
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
                name: "Inicio",
                item: `${siteUrl}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Productos",
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
                <ProductDetail product={product} />
            </main>

            <Footer />
        </div>
    );
}
