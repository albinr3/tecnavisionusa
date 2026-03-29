import "dotenv/config";
import { prisma } from "../lib/db";

type ProductForTranslation = {
    id: string;
    slug: string;
    name: string;
    title_es: string | null;
    title_en: string | null;
    description: string | null;
    description_es: string | null;
    description_en: string | null;
};

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_TRANSLATION_MODEL || "gpt-4o-mini";
const DRY_RUN = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force");

function clean(value: string | null | undefined): string | null {
    if (!value) return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function shouldTranslate(product: ProductForTranslation): boolean {
    const missingTitleEn = !clean(product.title_en);
    const missingDescriptionEn = !clean(product.description_en);
    return FORCE ? true : missingTitleEn || missingDescriptionEn;
}

function pickSourceTitle(product: ProductForTranslation): string {
    return clean(product.title_es) || clean(product.name) || product.name;
}

function pickSourceDescription(product: ProductForTranslation): string {
    return (
        clean(product.description_es) ||
        clean(product.description) ||
        clean(product.title_es) ||
        clean(product.name) ||
        product.name
    );
}

async function translateToEnglish(text: string): Promise<string> {
    if (!OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY in environment.");
    }

    const prompt = [
        "Translate the following Spanish product text to natural English.",
        "Rules:",
        "- Keep technical terms and model names unchanged when appropriate.",
        "- Keep concise commercial tone.",
        "- Return only the translated text.",
        "",
        text,
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: OPENAI_MODEL,
            input: prompt,
            temperature: 0.2,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as {
        output_text?: string;
        output?: Array<{
            content?: Array<{
                type?: string;
                text?: string;
            }>;
        }>;
    };

    let translated = clean(data.output_text);
    if (!translated && Array.isArray(data.output)) {
        const chunks: string[] = [];
        for (const item of data.output) {
            if (!Array.isArray(item?.content)) continue;
            for (const content of item.content) {
                if (typeof content?.text === "string" && content.text.trim().length > 0) {
                    chunks.push(content.text.trim());
                }
            }
        }
        translated = clean(chunks.join("\n"));
    }

    if (!translated) {
        throw new Error(
            `OpenAI response did not contain translated text. Raw keys: ${Object.keys(data).join(", ")}`
        );
    }

    return translated;
}

async function main() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            slug: true,
            name: true,
            title_es: true,
            title_en: true,
            description: true,
            description_es: true,
            description_en: true,
        },
        orderBy: { createdAt: "asc" },
    });

    const targetProducts = products.filter(shouldTranslate);
    console.log(
        `[translate-products-en] Found ${products.length} products. ${
            targetProducts.length
        } to process${FORCE ? " (force mode)" : ""}.`
    );

    let updatedCount = 0;

    for (const product of targetProducts) {
        const currentTitleEn = clean(product.title_en);
        const currentDescriptionEn = clean(product.description_en);

        const sourceTitle = pickSourceTitle(product);
        const sourceDescription = pickSourceDescription(product);

        const nextTitleEn = FORCE || !currentTitleEn ? await translateToEnglish(sourceTitle) : currentTitleEn;
        const nextDescriptionEn =
            FORCE || !currentDescriptionEn
                ? await translateToEnglish(sourceDescription)
                : currentDescriptionEn;

        if (DRY_RUN) {
            console.log(`\n[dry-run] ${product.slug}`);
            console.log(`title_en: ${nextTitleEn}`);
            console.log(`description_en: ${nextDescriptionEn}`);
            continue;
        }

        await prisma.product.update({
            where: { id: product.id },
            data: {
                title_en: nextTitleEn,
                description_en: nextDescriptionEn,
            },
        });

        updatedCount += 1;
        console.log(`[updated] ${product.slug}`);
    }

    if (DRY_RUN) {
        console.log("\n[translate-products-en] Dry run finished. No DB changes applied.");
        return;
    }

    console.log(`\n[translate-products-en] Done. Updated ${updatedCount} products.`);
}

main()
    .catch((error) => {
        console.error("[translate-products-en] Failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
