import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { prisma } from "@/lib/db";
import { getSiteMarket } from "@/lib/market";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const activeMarket = getSiteMarket();
  const lastModified = new Date();
  const products = await prisma.product.findMany({
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
