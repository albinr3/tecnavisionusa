import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { prisma } from "@/lib/db";
import { getSiteMarket } from "@/lib/market";
import { Prisma } from "@prisma/client";

function isMissingAvailableMarketsColumn(error: unknown) {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return false;
  }

  if (error.code !== "P2022") {
    return false;
  }

  const missingColumn =
    typeof error.meta?.column === "string" ? error.meta.column : "";

  return missingColumn === "" || missingColumn.includes("availableMarkets");
}

async function getSitemapProducts(activeMarket: ReturnType<typeof getSiteMarket>) {
  try {
    return await prisma.product.findMany({
      where: {
        availableMarkets: {
          has: activeMarket,
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  } catch (error) {
    if (!isMissingAvailableMarketsColumn(error)) {
      throw error;
    }

    console.warn(
      'Missing "availableMarkets" column while building sitemap. Falling back to products without market filtering.'
    );

    return prisma.product.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const activeMarket = getSiteMarket();
  const lastModified = new Date();
  let products: Array<{ slug: string; updatedAt: Date }> = [];

  try {
    products = await getSitemapProducts(activeMarket);
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/products`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/donde-comprar`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/sobre-nosotros`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contacto`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/terminos`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
