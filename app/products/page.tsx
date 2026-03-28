import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { prisma } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import type { Prisma } from "@prisma/client";
import ProductsFiltersSidebar from "./ProductsFiltersSidebar";

const PRODUCTS_PER_PAGE = 9;
const EAGER_PRODUCT_IMAGE_COUNT = 8;

async function getProducts(
    categoryFilters: string[] = [],
    resolutionFilters: string[] = [],
    featureFilters: string[] = [],
    searchFilter?: string,
    page = 1
) {
    try {
        const filters: Prisma.ProductWhereInput[] = [];

        if (categoryFilters.length > 0) {
            filters.push({
                category: {
                    is: {
                        OR: [
                            ...categoryFilters.map((categoryFilter) => ({
                                slug: { equals: categoryFilter, mode: "insensitive" as const },
                            })),
                            ...categoryFilters.map((categoryFilter) => ({
                                name: { contains: categoryFilter.replace(/-/g, " "), mode: "insensitive" as const },
                            })),
                        ],
                    },
                },
            });
        }

        if (resolutionFilters.length > 0) {
            filters.push({
                resolutionOpts: {
                    hasSome: resolutionFilters,
                },
            });
        }

        if (featureFilters.length > 0) {
            filters.push({
                aiDetection: {
                    hasSome: featureFilters,
                },
            });
        }

        if (searchFilter) {
            filters.push({
                OR: [
                    { name: { contains: searchFilter, mode: "insensitive" } },
                    { model: { contains: searchFilter, mode: "insensitive" } },
                    { subtitle: { contains: searchFilter, mode: "insensitive" } },
                    { description: { contains: searchFilter, mode: "insensitive" } },
                ],
            });
        }

        const where: Prisma.ProductWhereInput | undefined = filters.length > 0
            ? { AND: filters }
            : undefined;

        const total = await prisma.product.count({ where });
        const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
        const safePage = Math.min(Math.max(page, 1), totalPages);

        const items = await prisma.product.findMany({
            where,
            include: {
                category: true
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: (safePage - 1) * PRODUCTS_PER_PAGE,
            take: PRODUCTS_PER_PAGE,
        });

        return { total, items, page: safePage, totalPages };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { total: 0, items: [], page: 1, totalPages: 1 };
    }
}

type SearchParamsInput = Record<string, string | string[] | undefined>;

interface ShopPageProps {
    searchParams?: SearchParamsInput | Promise<SearchParamsInput>;
}

function resolveFirstParam(value: string | string[] | undefined) {
    if (Array.isArray(value)) return value[0] || "";
    return value || "";
}

function resolveParamList(value: string | string[] | undefined) {
    if (!value) return [];
    const values = Array.isArray(value) ? value : [value];
    return values.map((item) => item.trim()).filter(Boolean);
}

export async function generateMetadata({ searchParams }: ShopPageProps): Promise<Metadata> {
    const resolvedSearchParams = searchParams
        ? ("then" in searchParams ? await searchParams : searchParams)
        : {};

    const requestedCategories = resolveParamList(resolvedSearchParams.category);
    const requestedResolutions = resolveParamList(resolvedSearchParams.resolution);
    const requestedFeatures = resolveParamList(resolvedSearchParams.feature);
    const requestedQuery = resolveFirstParam(resolvedSearchParams.q).trim();
    const requestedPage = Number.parseInt(resolveFirstParam(resolvedSearchParams.page), 10);
    const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const shouldNoindex =
        requestedCategories.length > 0
        || requestedResolutions.length > 0
        || requestedFeatures.length > 0
        || Boolean(requestedQuery)
        || currentPage > 1;

    return {
        title: "Catálogo de Productos - TecnaVision",
        description: "Explora nuestra gama completa de cámaras de seguridad con IA, visión nocturna y tecnología 4K.",
        alternates: {
            canonical: "/products",
        },
        robots: shouldNoindex
            ? { index: false, follow: true }
            : { index: true, follow: true },
        openGraph: {
            title: "Catálogo de Productos - TecnaVision",
            description: "Explora nuestra gama completa de cámaras de seguridad con IA, visión nocturna y tecnología 4K.",
            url: "/products",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Catálogo de Productos - TecnaVision",
            description: "Explora nuestra gama completa de cámaras de seguridad con IA, visión nocturna y tecnología 4K.",
        },
    };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const resolvedSearchParams = searchParams
        ? ("then" in searchParams ? await searchParams : searchParams)
        : {};

    const requestedCategories = resolveParamList(resolvedSearchParams.category);
    const requestedResolutions = resolveParamList(resolvedSearchParams.resolution);
    const requestedFeatures = resolveParamList(resolvedSearchParams.feature);
    const requestedQuery = resolveFirstParam(resolvedSearchParams.q).trim();
    const requestedPage = Number.parseInt(resolveFirstParam(resolvedSearchParams.page), 10);
    const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const { total, items: products, page: safeCurrentPage, totalPages } = await getProducts(
        requestedCategories,
        requestedResolutions,
        requestedFeatures,
        requestedQuery || undefined,
        currentPage
    );
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const categoryFilters = categories.length > 0
        ? categories
        : [
            { id: "camaras-ip", name: "Camaras IP", slug: "camaras-ip" },
            { id: "nvr-grabadores", name: "NVR / Grabadores", slug: "nvr-grabadores" },
            { id: "cerraduras-inteligentes", name: "Cerraduras Inteligentes", slug: "cerraduras-inteligentes" },
            { id: "accesorios", name: "Accesorios", slug: "accesorios" },
        ];
    const filterSourceProducts = await prisma.product.findMany({
        select: {
            resolutionOpts: true,
            aiDetection: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const resolutionFilters = Array.from(
        new Set(
            filterSourceProducts
                .flatMap((product) => product.resolutionOpts)
                .map((value) => value.trim())
                .filter(Boolean)
        )
    );
    const featureFilters = Array.from(
        new Set(
            filterSourceProducts
                .flatMap((product) => product.aiDetection)
                .map((value) => value.trim())
                .filter(Boolean)
        )
    );
    const safeResolutionFilters = resolutionFilters.length > 0
        ? resolutionFilters
        : ["4 Megapixel", "6 Megapixel", "8 MP (4K Ultra)"];
    const safeFeatureFilters = featureFilters.length > 0
        ? featureFilters
        : ["Cruce de linea", "Intrusion de area", "Reconocimiento facial"];
    const activeCategoryName = requestedCategories.length === 1
        ? (products[0]?.category?.name || requestedCategories[0].replace(/-/g, " "))
        : "Todas las categorías";
    const createPageHref = (page: number) => {
        const params = new URLSearchParams();
        requestedCategories.forEach((category) => params.append("category", category));
        requestedResolutions.forEach((resolution) => params.append("resolution", resolution));
        requestedFeatures.forEach((feature) => params.append("feature", feature));
        if (requestedQuery) params.set("q", requestedQuery);
        if (page > 1) params.set("page", String(page));
        const query = params.toString();
        return query ? `/products?${query}` : "/products";
    };

    return (
        <div className="bg-app-bg text-app-text antialiased selection:bg-primary selection:text-white min-h-screen flex flex-col">
            <Header />

            <div className="flex flex-1 w-full max-w-7xl mx-auto">
                <ProductsFiltersSidebar
                    categories={categoryFilters}
                    resolutions={safeResolutionFilters}
                    features={safeFeatureFilters}
                    selectedCategories={requestedCategories}
                    selectedResolutions={requestedResolutions}
                    selectedFeatures={requestedFeatures}
                    requestedQuery={requestedQuery}
                />

                {/* Main Content */}
                <main className="flex-1 flex flex-col p-6 pb-28 lg:p-10 lg:pb-10">
                    <h1 className="text-app-text text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                        Catálogo de Productos de Seguridad
                    </h1>

                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <Link className="text-app-text-sec text-sm font-medium hover:text-primary transition-colors" href="/">Inicio</Link>
                        <span className="text-gray-300 text-sm font-medium">/</span>
                        <Link className="text-app-text-sec text-sm font-medium hover:text-primary transition-colors" href="/products">Productos</Link>
                        <span className="text-gray-300 text-sm font-medium">/</span>
                        <span className="text-app-text text-sm font-medium">{activeCategoryName}</span>
                    </div>

                    {/* Controls Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <form action="/products" method="get" className="relative w-full md:max-w-md">
                            {requestedCategories.map((category) => (
                                <input key={`search-category-${category}`} type="hidden" name="category" value={category} />
                            ))}
                            {requestedResolutions.map((resolution) => (
                                <input key={`search-resolution-${resolution}`} type="hidden" name="resolution" value={resolution} />
                            ))}
                            {requestedFeatures.map((feature) => (
                                <input key={`search-feature-${feature}`} type="hidden" name="feature" value={feature} />
                            ))}
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                            </div>
                            <input
                                name="q"
                                defaultValue={requestedQuery}
                                className="block w-full pl-10 pr-4 py-3 border-none rounded-xl bg-app-bg-subtle text-app-text placeholder:text-app-text-sec focus:ring-2 focus:ring-primary sm:text-sm shadow-sm"
                                placeholder="Buscar modelo, SKU o característica..."
                            />
                        </form>
                        <div className="flex w-full flex-wrap items-center justify-between gap-3 md:w-auto md:justify-end">
                            <p className="text-app-text-sec text-sm whitespace-nowrap hidden sm:block">Mostrando {products.length} de {total} productos</p>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-app-text-sec text-sm font-medium whitespace-nowrap">Ordenar por:</span>
                                <div className="relative">
                                    <select className="appearance-none bg-transparent border-none text-app-text text-sm font-bold pr-8 focus:ring-0 cursor-pointer">
                                        <option>Novedades</option>
                                        <option>Precio: Bajo a Alto</option>
                                        <option>Precio: Alto a Bajo</option>
                                        <option>Popularidad</option>
                                    </select>
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-app-text text-xl">expand_more</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.length === 0 ? (
                            <div className="col-span-full py-20 text-center">
                                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">inventory_2</span>
                                <p className="text-app-text-sec">No se encontraron productos disponibles.</p>
                            </div>
                        ) : (
                            products.map((product, index) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    className="group flex flex-col bg-app-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-app-border hover:border-primary/20"
                                >
                                    <div className="relative w-full aspect-square bg-app-bg-subtle p-6 flex items-center justify-center overflow-hidden">
                                        {/* First cards are likely LCP candidates on desktop/tablet viewports. */}
                                        <Image
                                            alt={product.name}
                                            className="object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
                                            fetchPriority={index < EAGER_PRODUCT_IMAGE_COUNT ? "high" : "auto"}
                                            fill
                                            loading={index === 0 ? undefined : index < EAGER_PRODUCT_IMAGE_COUNT ? "eager" : "lazy"}
                                            priority={index === 0}
                                            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                            src={product.mainImage || "/placeholder-camera.png"}
                                        />
                                        {product.badge && (
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{product.badge}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex-1">
                                            <h3 className="text-app-text text-lg font-bold mb-2 group-hover:text-primary transition-colors">{product.name} {product.model}</h3>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="text-[11px] font-medium text-app-text-sec bg-app-bg-subtle px-2 py-1 rounded-md">{product.category?.name || 'General'}</span>
                                                {product.resolutionOpts.slice(0, 2).map((opt) => (
                                                    <span key={opt} className="text-[11px] font-medium text-app-text-sec bg-app-bg-subtle px-2 py-1 rounded-md">{opt}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-4 w-full h-10 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 text-sm font-bold flex items-center justify-center shadow-lg shadow-primary/20">
                                            Ver Detalles
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Pagination - Static for now */}
                    {total > PRODUCTS_PER_PAGE && (
                        <div className="mt-12 flex justify-center pb-12">
                            <nav className="flex flex-wrap items-center justify-center gap-2">
                                <Link
                                    href={createPageHref(Math.max(1, safeCurrentPage - 1))}
                                    aria-disabled={safeCurrentPage <= 1}
                                    className={`size-10 flex items-center justify-center rounded-lg border border-app-border transition-colors ${safeCurrentPage <= 1 ? "text-app-text-sec/40 pointer-events-none" : "text-app-text-sec hover:bg-app-bg-subtle"}`}
                                >
                                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                                </Link>
                                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                                    <Link
                                        key={pageNum}
                                        href={createPageHref(pageNum)}
                                        className={`size-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${pageNum === safeCurrentPage ? "bg-primary text-white font-bold" : "border border-app-border text-app-text-sec hover:bg-app-bg-subtle hover:text-app-text"}`}
                                    >
                                        {pageNum}
                                    </Link>
                                ))}
                                <Link
                                    href={createPageHref(Math.min(totalPages, safeCurrentPage + 1))}
                                    aria-disabled={safeCurrentPage >= totalPages}
                                    className={`size-10 flex items-center justify-center rounded-lg border border-app-border transition-colors ${safeCurrentPage >= totalPages ? "text-app-text-sec/40 pointer-events-none" : "text-app-text-sec hover:bg-app-bg-subtle"}`}
                                >
                                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                                </Link>
                            </nav>
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}
