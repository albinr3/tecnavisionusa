import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
    console.log("🌱 Seeding database...");

    // Create categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: "camaras-interior" },
            update: {},
            create: {
                name: "Cámaras Interior",
                slug: "camaras-interior",
                icon: "videocam",
                description: "Cámaras de vigilancia para interiores",
            },
        }),
        prisma.category.upsert({
            where: { slug: "camaras-exterior" },
            update: {},
            create: {
                name: "Cámaras Exterior",
                slug: "camaras-exterior",
                icon: "outdoor_garden",
                description: "Cámaras resistentes para exteriores",
            },
        }),
        prisma.category.upsert({
            where: { slug: "camaras-ptz" },
            update: {},
            create: {
                name: "Cámaras PTZ",
                slug: "camaras-ptz",
                icon: "360",
                description: "Cámaras con movimiento Pan-Tilt-Zoom",
            },
        }),
        prisma.category.upsert({
            where: { slug: "nvr-grabadores" },
            update: {},
            create: {
                name: "NVR / Grabadores",
                slug: "nvr-grabadores",
                icon: "dns",
                description: "Grabadores de video en red",
            },
        }),
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // Create products
    const bulletCam = await prisma.product.upsert({
        where: { slug: "bullet-cam-pro-ai" },
        update: {},
        create: {
            slug: "bullet-cam-pro-ai",
            name: "Bullet Cam",
            model: "Pro AI",
            subtitle: "Vigilancia de última generación para entornos exigentes.",
            description: "Combinando óptica de precisión con inteligencia artificial avanzada para una detección proactiva y cero falsas alarmas.",
            badge: "Enterprise Series",
            rating: 5,
            reviewsCount: 120,
            mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuABVysAT65FMCOcGdgwnXhM53Op4tLtw_xD_kDMj8HFqMJTRzvq2LnKZriqyN4UZGimVCYAxU8ykqEJFfFHciulJlh6q4evmbR002AgL6pvmKyAT78t_VrC_oM984lDecA4hWYaWQhhjzDWEM4f1shw8Eec6hKaLP1tovEM4nyYLOsksLGqdtKwaWH0kzvWjbxGiA8-FVmlrhUwTnu8aBOblwS8neu5SKqkNmFpwWL5FO159Ru4wtGH6u972e5CsNgi7PWgj6ea0plb",
            nightVisionImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT2XFS6isbNQRUL19NfHoe_m1lTVIpFLX2y16lJGNNLcHiKv4W6D1UgRgOaY5hN6EJeoldybn4xQlJzdvq9DMpymO8C0JdkXpAlaKyaDM5RUS0j09yTWM7PIstXpuY1gzaE8AwLsa_YeFYn5wMfXj12UQPWeVUnVc4cA-emsVSgILJarVr1bU5yM3ic5g7lEBTyLvKyWfHNgHyH09h_Ivw0qmoT46y-RZIKkLUqBUlvbUuMjTwg_glP6RK3uZN6Y3KX79ibF7DwWRq",
            appDemoImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWlH9yHrE2h1zJmXyJHHtbS8sLMwvxVREstM8-0x769YxFsrcdlyfDi4ivRRshQfpqTue1Yd107WtF_4vdSvcW-0b87VMd6aR_6uGK2Ui0hCxfWDYknnE_bIURxH8SApUKEM2wQx6iRC54bGfLSftnsVpbtG_4g_ufAQMc_nB4vgtC5ryqtqIXUANBBaugxAyXtSJK1dGoE_iNLb5iut7cQhh-TcksthYJYC0fWT8xjpOl5pmgWlnDwd7vn2998EyjB7cqdIF2Vn2x",
            protection: "IP67 Rating",
            compression: "H.265+",
            lens: "2.8mm Wide",
            power: "PoE / 12V",
            resolutionOpts: ["4 Megapixel", "6 Megapixel", "8 MP (4K Ultra)"],
            aiDetection: ["Cruce de línea", "Intrusión de área", "Reconocimiento facial"],
            guarantee: "3 años de cobertura",
            support: "Línea directa B2B",
            categoryId: categories[1].id, // Exterior
        },
    });

    const guardianEye = await prisma.product.upsert({
        where: { slug: "guardian-eye-360" },
        update: {},
        create: {
            slug: "guardian-eye-360",
            name: "Guardian Eye",
            model: "360 PTZ",
            subtitle: "Control total sin puntos ciegos.",
            description: "Cámara PTZ motorizada con seguimiento automático y visión panorámica para cobertura completa de grandes espacios.",
            badge: "Best Seller",
            rating: 4,
            reviewsCount: 85,
            mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcYVFB5kC7tjun_jwirTNe-5FVNKA3v-sbXYtmN3MPur7_T7v9im_4RF2ZWsep4E1QLbMt_NoEM-d760biLKeUTAy-m3QbcfFNXtWdMDimcYjT_uMsO3d43SpHULpU1pss2Ef6JAs_-mWjewmLnDKSyRey2gZweZjxkbG9aXmlPyiMQHOFCP6em9tcO7CyqjnNmI98WT0Cmsb-gmRKtUXYSefSkoQFcPDk9E0MdfsnZeNGJednbeP26msYLwTjT_oYE9sLqXF300Rk",
            nightVisionImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT2XFS6isbNQRUL19NfHoe_m1lTVIpFLX2y16lJGNNLcHiKv4W6D1UgRgOaY5hN6EJeoldybn4xQlJzdvq9DMpymO8C0JdkXpAlaKyaDM5RUS0j09yTWM7PIstXpuY1gzaE8AwLsa_YeFYn5wMfXj12UQPWeVUnVc4cA-emsVSgILJarVr1bU5yM3ic5g7lEBTyLvKyWfHNgHyH09h_Ivw0qmoT46y-RZIKkLUqBUlvbUuMjTwg_glP6RK3uZN6Y3KX79ibF7DwWRq",
            protection: "IP66 Indoor/Outdoor",
            compression: "H.265",
            lens: "3.6mm - 12mm Zoom",
            power: "PoE+",
            resolutionOpts: ["1080p HD", "2K QHD"],
            aiDetection: ["Seguimiento de Movimiento", "Detección de Humanos", "Alerta de Sonido"],
            guarantee: "2 años de cobertura",
            support: "Chat 24/7",
            categoryId: categories[2].id, // PTZ
        },
    });

    console.log(`✅ Created products: ${bulletCam.name}, ${guardianEye.name}`);

    console.log("🎉 Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
