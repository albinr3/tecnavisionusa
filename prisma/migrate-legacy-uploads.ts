import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { UTApi, UTFile } from "uploadthing/server";

type ProductRecord = {
  id: string;
  slug: string;
  mainImage: string | null;
  nightVisionImg: string | null;
  appDemoImg: string | null;
  galleryImages: string[];
};

type SeedProductRecord = {
  slug: string;
  mainImage: string | null;
  nightVisionImg: string | null;
  appDemoImg: string | null;
  galleryImages: string[];
};

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

function isLegacyUploadPath(value: string | null | undefined): value is string {
  return typeof value === "string" && value.startsWith("/uploads/");
}

function isUploadThingUrl(value: string | null | undefined): value is string {
  if (typeof value !== "string") return false;
  return value.includes("uploadthing.com/") || value.includes("ufs.sh/");
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getLocalUploadsFileMap() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const entries = await fs.readdir(uploadsDir, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);

  const byName = new Map<string, string>();
  for (const fileName of files) {
    byName.set(fileName.toLowerCase(), path.join(uploadsDir, fileName));
  }
  return { uploadsDir, byName };
}

async function loadSeedProductsBySlug() {
  const seedPath = path.join(process.cwd(), "prisma", "seed-data.json");
  if (!(await fileExists(seedPath))) return new Map<string, SeedProductRecord>();

  try {
    const raw = await fs.readFile(seedPath, "utf8");
    const data = JSON.parse(raw) as { products?: SeedProductRecord[] };
    const bySlug = new Map<string, SeedProductRecord>();
    for (const product of data.products || []) {
      bySlug.set(product.slug, product);
    }
    return bySlug;
  } catch {
    return new Map<string, SeedProductRecord>();
  }
}

function extractCandidateFileNames(reference: string): string[] {
  const candidates = new Set<string>();
  const decodedRef = decodeURIComponent(reference);

  if (reference.startsWith("/uploads/")) {
    const direct = path.basename(reference);
    if (direct) candidates.add(direct);
  }

  try {
    const url = new URL(reference);
    const base = path.basename(url.pathname);
    if (base) candidates.add(base);
  } catch {
    const base = path.basename(reference.split("?")[0] || reference);
    if (base) candidates.add(base);
  }

  // Try to recover original filename if provider prefixes extra IDs in the path.
  const pieces = decodedRef.split(/[\/?#]/).filter(Boolean);
  for (const piece of pieces) {
    if (piece.includes(".")) candidates.add(piece);
  }

  return Array.from(candidates);
}

function resolveLocalFileFromReference(reference: string, byName: Map<string, string>): string | null {
  const candidates = extractCandidateFileNames(reference);
  for (const candidate of candidates) {
    const found = byName.get(candidate.toLowerCase());
    if (found) return found;
  }

  // Fallback: substring match against local filenames.
  const normalizedRef = decodeURIComponent(reference).toLowerCase();
  for (const [fileName, absolutePath] of byName.entries()) {
    if (normalizedRef.includes(fileName)) return absolutePath;
  }

  return null;
}

async function main() {
  console.log("🖼️  Migrating legacy /uploads images to UploadThing...");
  console.log(`Mode: ${isDryRun ? "DRY RUN (no upload, no DB updates)" : "APPLY CHANGES"}`);

  const products = (await prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      mainImage: true,
      nightVisionImg: true,
      appDemoImg: true,
      galleryImages: true,
    },
  })) as ProductRecord[];

  const referencedImageValues = new Set<string>();
  for (const product of products) {
    if (isLegacyUploadPath(product.mainImage) || isUploadThingUrl(product.mainImage)) {
      referencedImageValues.add(product.mainImage);
    }
    if (isLegacyUploadPath(product.nightVisionImg) || isUploadThingUrl(product.nightVisionImg)) {
      referencedImageValues.add(product.nightVisionImg);
    }
    if (isLegacyUploadPath(product.appDemoImg) || isUploadThingUrl(product.appDemoImg)) {
      referencedImageValues.add(product.appDemoImg);
    }
    for (const img of product.galleryImages || []) {
      if (isLegacyUploadPath(img) || isUploadThingUrl(img)) {
        referencedImageValues.add(img);
      }
    }
  }

  if (referencedImageValues.size === 0) {
    console.log("✅ No /uploads or UploadThing references found in Product records.");
    return;
  }

  console.log(`Found ${referencedImageValues.size} candidate image reference(s).`);

  const { byName } = await getLocalUploadsFileMap();

  const referenceToLocalPath = new Map<string, string>();
  for (const reference of referencedImageValues) {
    let absolutePath: string | null = null;

    if (isLegacyUploadPath(reference)) {
      const normalizedRelative = reference.replace(/^\//, "");
      const directPath = path.join(process.cwd(), "public", normalizedRelative);
      if (await fileExists(directPath)) {
        absolutePath = directPath;
      }
    }

    if (!absolutePath) {
      absolutePath = resolveLocalFileFromReference(reference, byName);
    }

    if (absolutePath) {
      referenceToLocalPath.set(reference, absolutePath);
    }
  }

  // Fallback for opaque UploadThing URLs: use seed-data.json per product slug.
  const seedBySlug = await loadSeedProductsBySlug();
  if (seedBySlug.size > 0) {
    for (const product of products) {
      const seed = seedBySlug.get(product.slug);
      if (!seed) continue;

      const fieldPairs: Array<[string | null, string | null]> = [
        [product.mainImage, seed.mainImage],
        [product.nightVisionImg, seed.nightVisionImg],
        [product.appDemoImg, seed.appDemoImg],
      ];

      for (const [currentValue, seedValue] of fieldPairs) {
        if (
          !currentValue ||
          referenceToLocalPath.has(currentValue) ||
          !isUploadThingUrl(currentValue) ||
          !isLegacyUploadPath(seedValue)
        ) {
          continue;
        }
        const seedAbsolutePath = path.join(process.cwd(), "public", seedValue.replace(/^\//, ""));
        if (await fileExists(seedAbsolutePath)) {
          referenceToLocalPath.set(currentValue, seedAbsolutePath);
        }
      }

      for (let i = 0; i < (product.galleryImages || []).length; i += 1) {
        const currentGalleryValue = product.galleryImages[i];
        const seedGalleryValue = (seed.galleryImages || [])[i] ?? null;
        if (
          !currentGalleryValue ||
          referenceToLocalPath.has(currentGalleryValue) ||
          !isUploadThingUrl(currentGalleryValue) ||
          !isLegacyUploadPath(seedGalleryValue)
        ) {
          continue;
        }
        const seedAbsolutePath = path.join(process.cwd(), "public", seedGalleryValue.replace(/^\//, ""));
        if (await fileExists(seedAbsolutePath)) {
          referenceToLocalPath.set(currentGalleryValue, seedAbsolutePath);
        }
      }
    }
  }

  const missingFiles = Array.from(referencedImageValues).filter(
    (reference) => !referenceToLocalPath.has(reference)
  );

  if (missingFiles.length > 0) {
    console.log(`⚠️ Missing local files for ${missingFiles.length} path(s):`);
    for (const missing of missingFiles) console.log(`   - ${missing}`);
  }

  if (isDryRun) {
    console.log(`Would upload ${referenceToLocalPath.size} file(s) to UploadThing.`);
    console.log("Dry run complete.");
    return;
  }

  if (!process.env.UPLOADTHING_TOKEN) {
    throw new Error("Missing UPLOADTHING_TOKEN in .env");
  }

  const utapi = new UTApi({ token: process.env.UPLOADTHING_TOKEN });
  const legacyToPublicUrl = new Map<string, string>();
  const uploadFailures: string[] = [];

  let processed = 0;
  for (const [legacyPath, absolutePath] of referenceToLocalPath.entries()) {
    processed += 1;
    process.stdout.write(`Uploading ${processed}/${referenceToLocalPath.size}: ${legacyPath} ... `);
    try {
      const buffer = await fs.readFile(absolutePath);
      const filename = path.basename(absolutePath);
      const file = new UTFile([buffer], filename);
      const result = await utapi.uploadFiles(file);
      if (result.error || !result.data?.ufsUrl) {
        uploadFailures.push(legacyPath);
        console.log("FAILED");
        continue;
      }
      legacyToPublicUrl.set(legacyPath, result.data.ufsUrl);
      console.log("OK");
    } catch {
      uploadFailures.push(legacyPath);
      console.log("FAILED");
    }
  }

  let updatedProducts = 0;
  for (const product of products) {
    const nextMainImage =
      product.mainImage && legacyToPublicUrl.has(product.mainImage)
        ? legacyToPublicUrl.get(product.mainImage)!
        : product.mainImage;
    const nextNightVisionImg =
      product.nightVisionImg && legacyToPublicUrl.has(product.nightVisionImg)
        ? legacyToPublicUrl.get(product.nightVisionImg)!
        : product.nightVisionImg;
    const nextAppDemoImg =
      product.appDemoImg && legacyToPublicUrl.has(product.appDemoImg)
        ? legacyToPublicUrl.get(product.appDemoImg)!
        : product.appDemoImg;
    const nextGalleryImages = (product.galleryImages || []).map((img) =>
      legacyToPublicUrl.get(img) ?? img
    );

    const changed =
      nextMainImage !== product.mainImage ||
      nextNightVisionImg !== product.nightVisionImg ||
      nextAppDemoImg !== product.appDemoImg ||
      nextGalleryImages.some((value, index) => value !== (product.galleryImages || [])[index]);

    if (!changed) continue;

    await prisma.product.update({
      where: { id: product.id },
      data: {
        mainImage: nextMainImage,
        nightVisionImg: nextNightVisionImg,
        appDemoImg: nextAppDemoImg,
        galleryImages: nextGalleryImages,
      },
    });
    updatedProducts += 1;
  }

  console.log("-----");
  console.log(`Uploaded: ${legacyToPublicUrl.size}`);
  console.log(`Upload failures: ${uploadFailures.length}`);
  console.log(`Products updated: ${updatedProducts}`);
  console.log(`Missing local files: ${missingFiles.length}`);
  console.log("✅ Migration finished.");
}

main()
  .catch((error) => {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
