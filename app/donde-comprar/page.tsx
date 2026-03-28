import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/site-url";
import DondeComprarClient from "./DondeComprarClient";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: "Dónde comprar - Distribuidores TecnaVision",
    description:
        "Encuentra distribuidores autorizados de TecnaVision en República Dominicana para cámaras IP, NVR y soluciones de seguridad.",
    alternates: {
        canonical: "/donde-comprar",
    },
    openGraph: {
        title: "Dónde comprar - Distribuidores TecnaVision",
        description:
            "Encuentra distribuidores autorizados de TecnaVision en República Dominicana para cámaras IP, NVR y soluciones de seguridad.",
        url: "/donde-comprar",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dónde comprar - Distribuidores TecnaVision",
        description:
            "Encuentra distribuidores autorizados de TecnaVision en República Dominicana para cámaras IP, NVR y soluciones de seguridad.",
    },
};

export default async function DondeComprarPage() {
    const initialDistributors = await prisma.distributor.findMany({
        where: {
            isActive: true,
        },
        select: {
            id: true,
            name: true,
            icon: true,
            address: true,
            city: true,
            state: true,
            phone: true,
            email: true,
            mapUrl: true,
        },
        orderBy: {
            name: "asc",
        },
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        name: "Distribuidores TecnaVision",
                        url: `${siteUrl}/donde-comprar`,
                        numberOfItems: initialDistributors.length,
                        itemListElement: initialDistributors.slice(0, 20).map((distributor, index) => ({
                            "@type": "ListItem",
                            position: index + 1,
                            item: {
                                "@type": "LocalBusiness",
                                name: distributor.name,
                                address: distributor.address,
                                telephone: distributor.phone,
                                email: distributor.email,
                                url: distributor.mapUrl || `${siteUrl}/donde-comprar`,
                            },
                        })),
                    }),
                }}
            />
            <DondeComprarClient initialDistributors={initialDistributors} />
        </>
    );
}
