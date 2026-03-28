import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

type SeedCategory = {
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
};

type SeedVariant = {
  name: string;
  description: string | null;
  manual: string | null;
  datasheet: string | null;
  price: string | null;
};

type SeedProduct = {
  slug: string;
  name: string;
  model: string;
  subtitle: string | null;
  description: string | null;
  badge: string | null;
  rating: number;
  reviewsCount: number;
  mainImage: string | null;
  galleryImages: string[];
  nightVisionImg: string | null;
  appDemoImg: string | null;
  appDemoBadge: string | null;
  appDemoTitle: string | null;
  appDemoDesc: string | null;
  aiSectionIcon: string | null;
  nightVisionIcon: string | null;
  specsSectionIcon: string | null;
  guaranteeIcon: string | null;
  supportIcon: string | null;
  protection: string | null;
  compression: string | null;
  lens: string | null;
  power: string | null;
  resolutionOpts: string[];
  aiDetection: string[];
  guarantee: string | null;
  support: string | null;
  categorySlug: string | null;
  variants: SeedVariant[];
};

type SeedData = {
  exportedAt: string;
  categories: SeedCategory[];
  products: SeedProduct[];
};

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("📦 Exporting categories + products to seed-data.json...");

  const categories = await prisma.category.findMany({
    orderBy: { slug: "asc" },
  });

  const products = await prisma.product.findMany({
    include: {
      category: true,
      variants: true,
    },
    orderBy: { slug: "asc" },
  });

  const data: SeedData = {
    exportedAt: new Date().toISOString(),
    categories: categories.map((category) => ({
      name: category.name,
      slug: category.slug,
      icon: category.icon,
      description: category.description,
    })),
    products: products.map((product) => ({
      slug: product.slug,
      name: product.name,
      model: product.model,
      subtitle: product.subtitle,
      description: product.description,
      badge: product.badge,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
      mainImage: product.mainImage,
      galleryImages: product.galleryImages,
      nightVisionImg: product.nightVisionImg,
      appDemoImg: product.appDemoImg,
      appDemoBadge: product.appDemoBadge,
      appDemoTitle: product.appDemoTitle,
      appDemoDesc: product.appDemoDesc,
      aiSectionIcon: product.aiSectionIcon,
      nightVisionIcon: product.nightVisionIcon,
      specsSectionIcon: product.specsSectionIcon,
      guaranteeIcon: product.guaranteeIcon,
      supportIcon: product.supportIcon,
      protection: product.protection,
      compression: product.compression,
      lens: product.lens,
      power: product.power,
      resolutionOpts: product.resolutionOpts,
      aiDetection: product.aiDetection,
      guarantee: product.guarantee,
      support: product.support,
      categorySlug: product.category?.slug ?? null,
      variants: product.variants.map((variant) => ({
        name: variant.name,
        description: variant.description,
        manual: variant.manual,
        datasheet: variant.datasheet,
        price: variant.price === null ? null : variant.price.toString(),
      })),
    })),
  };

  const outputPath = path.join(__dirname, "seed-data.json");
  await fs.writeFile(outputPath, JSON.stringify(data, null, 2), "utf8");

  console.log(
    `✅ Export complete: ${data.categories.length} categories, ${data.products.length} products`
  );
}

main()
  .catch((error) => {
    console.error("❌ Export failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
