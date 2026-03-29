import type { Metadata } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/site-url";
import DondeComprarClient from "./DondeComprarClient";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
    title: "Where to Buy - TecnaVision Distributors",
    description:
        "Find authorized TecnaVision distributors in the Dominican Republic for IP cameras, NVRs, and security solutions.",
    alternates: {
        canonical: "/where-to-buy",
    },
    openGraph: {
        title: "Where to Buy - TecnaVision Distributors",
        description:
            "Find authorized TecnaVision distributors in the Dominican Republic for IP cameras, NVRs, and security solutions.",
        url: "/where-to-buy",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Where to Buy - TecnaVision Distributors",
        description:
            "Find authorized TecnaVision distributors in the Dominican Republic for IP cameras, NVRs, and security solutions.",
    },
};

function isMissingCountryColumn(error: unknown) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
        return false;
    }
    if (error.code !== "P2022") {
        return false;
    }
    const missingColumn =
        typeof error.meta?.column === "string" ? error.meta.column.toLowerCase() : "";
    return missingColumn === "" || missingColumn.includes("country");
}

export default async function DondeComprarPage() {
    let initialDistributors: Array<{
        id: string;
        name: string;
        icon: string;
        country: string;
        address: string;
        city: string;
        state: string | null;
        phone: string;
        email: string;
        mapUrl: string | null;
    }> = [];

    try {
        initialDistributors = await prisma.distributor.findMany({
            where: {
                isActive: true,
            },
            select: {
                id: true,
                name: true,
                icon: true,
                country: true,
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
    } catch (error) {
        if (!isMissingCountryColumn(error)) {
            throw error;
        }

        const fallback = await prisma.distributor.findMany({
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

        initialDistributors = fallback.map((item) => ({
            ...item,
            country: "Dominican Republic",
        }));
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        name: "TecnaVision Distributors",
                        url: `${siteUrl}/where-to-buy`,
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
                                url: distributor.mapUrl || `${siteUrl}/where-to-buy`,
                            },
                        })),
                    }),
                }}
            />
            <DondeComprarClient initialDistributors={initialDistributors} />
        </>
    );
}



