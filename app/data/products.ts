export interface Product {
    slug: string;
    name: string;
    model: string;
    subtitle: string;
    description: string;
    price?: string;
    badge?: string;
    rating: number;
    reviews_count: number;
    images: {
        main: string;
        night_vision?: string;
        app_demo?: string;
        gallery?: string[];
    };
    specs: {
        protection: string;
        compression: string;
        lens: string;
        power: string;
        resolution_options: string[];
    };
    features: {
        ai_detection: string[];
        guarantee: string;
        support: string;
    };
}

export const products: Product[] = [
    {
        slug: "bullet-cam-pro-ai",
        name: "Bullet Cam",
        model: "Pro AI",
        subtitle: "Vigilancia de última generación para entornos exigentes.",
        description: "Combinando óptica de precisión con inteligencia artificial avanzada para una detección proactiva y cero falsas alarmas.",
        badge: "Enterprise Series",
        rating: 5,
        reviews_count: 120,
        images: {
            main: "https://lh3.googleusercontent.com/aida-public/AB6AXuABVysAT65FMCOcGdgwnXhM53Op4tLtw_xD_kDMj8HFqMJTRzvq2LnKZriqyN4UZGimVCYAxU8ykqEJFfFHciulJlh6q4evmbR002AgL6pvmKyAT78t_VrC_oM984lDecA4hWYaWQhhjzDWEM4f1shw8Eec6hKaLP1tovEM4nyYLOsksLGqdtKwaWH0kzvWjbxGiA8-FVmlrhUwTnu8aBOblwS8neu5SKqkNmFpwWL5FO159Ru4wtGH6u972e5CsNgi7PWgj6ea0plb",
            night_vision: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT2XFS6isbNQRUL19NfHoe_m1lTVIpFLX2y16lJGNNLcHiKv4W6D1UgRgOaY5hN6EJeoldybn4xQlJzdvq9DMpymO8C0JdkXpAlaKyaDM5RUS0j09yTWM7PIstXpuY1gzaE8AwLsa_YeFYn5wMfXj12UQPWeVUnVc4cA-emsVSgILJarVr1bU5yM3ic5g7lEBTyLvKyWfHNgHyH09h_Ivw0qmoT46y-RZIKkLUqBUlvbUuMjTwg_glP6RK3uZN6Y3KX79ibF7DwWRq",
            app_demo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWlH9yHrE2h1zJmXyJHHtbS8sLMwvxVREstM8-0x769YxFsrcdlyfDi4ivRRshQfpqTue1Yd107WtF_4vdSvcW-0b87VMd6aR_6uGK2Ui0hCxfWDYknnE_bIURxH8SApUKEM2wQx6iRC54bGfLSftnsVpbtG_4g_ufAQMc_nB4vgtC5ryqtqIXUANBBaugxAyXtSJK1dGoE_iNLb5iut7cQhh-TcksthYJYC0fWT8xjpOl5pmgWlnDwd7vn2998EyjB7cqdIF2Vn2x"
        },
        specs: {
            protection: "IP67 Rating",
            compression: "H.265+",
            lens: "2.8mm Wide",
            power: "PoE / 12V",
            resolution_options: ["4 Megapixel", "6 Megapixel", "8 MP (4K Ultra)"]
        },
        features: {
            ai_detection: ["Cruce de línea", "Intrusión de área", "Reconocimiento facial"],
            guarantee: "3 años de cobertura",
            support: "Línea directa B2B"
        }
    },
    {
        slug: "guardian-eye-360",
        name: "Guardian Eye",
        model: "360 PTZ",
        subtitle: "Control total sin puntos ciegos.",
        description: "Cámara PTZ motorizada con seguimiento automático y visión panorámica para cobertura completa de grandes espacios.",
        badge: "Best Seller",
        rating: 4,
        reviews_count: 85,
        images: {
            main: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcYVFB5kC7tjun_jwirTNe-5FVNKA3v-sbXYtmN3MPur7_T7v9im_4RF2ZWsep4E1QLbMt_NoEM-d760biLKeUTAy-m3QbcfFNXtWdMDimcYjT_uMsO3d43SpHULpU1pss2Ef6JAs_-mWjewmLnDKSyRey2gZweZjxkbG9aXmlPyiMQHOFCP6em9tcO7CyqjnNmI98WT0Cmsb-gmRKtUXYSefSkoQFcPDk9E0MdfsnZeNGJednbeP26msYLwTjT_oYE9sLqXF300Rk",
            night_vision: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT2XFS6isbNQRUL19NfHoe_m1lTVIpFLX2y16lJGNNLcHiKv4W6D1UgRgOaY5hN6EJeoldybn4xQlJzdvq9DMpymO8C0JdkXpAlaKyaDM5RUS0j09yTWM7PIstXpuY1gzaE8AwLsa_YeFYn5wMfXj12UQPWeVUnVc4cA-emsVSgILJarVr1bU5yM3ic5g7lEBTyLvKyWfHNgHyH09h_Ivw0qmoT46y-RZIKkLUqBUlvbUuMjTwg_glP6RK3uZN6Y3KX79ibF7DwWRq" // Reusing for demo
        },
        specs: {
            protection: "IP66 Indoor/Outdoor",
            compression: "H.265",
            lens: "3.6mm - 12mm Zoom",
            power: "PoE+",
            resolution_options: ["1080p HD", "2K QHD"]
        },
        features: {
            ai_detection: ["Seguimiento de Movimiento", "Detección de Humanos", "Alerta de Sonido"],
            guarantee: "2 años de cobertura",
            support: "Chat 24/7"
        }
    }
];

// Default products array - used as fallback
export const defaultProducts = products;

// Get product by slug - for server-side, uses static data
// For client-side with localStorage, use the admin pages which handle localStorage directly
export function getProductBySlug(slug: string): Product | undefined {
    // Server-side: check static products first
    const staticProduct = products.find(p => p.slug === slug);
    if (staticProduct) return staticProduct;

    // Note: localStorage is only available client-side
    // The dynamic product page uses this for SSR, so we rely on static data
    // New products added via admin will need a page refresh or client-side fetching
    return undefined;
}

// Get all products - returns the static product list
export function getAllProducts(): Product[] {
    return products;
}
