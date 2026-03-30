import type { Metadata } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSiteUrl } from "@/lib/site-url";
import WhereToBuyClient from "./WhereToBuyClient";

const siteUrl = getSiteUrl();

const DISTRIBUTOR_SELECT = {
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
} as const;

const US_COUNTRY = "United States";

const isUnitedStates = (value: string | null | undefined) => {
  const normalized = (value ?? "").trim().toLowerCase();
  return (
    normalized === "united states" ||
    normalized === "usa" ||
    normalized === "us" ||
    normalized === "united states of america"
  );
};

export const metadata: Metadata = {
  title: "Where to Buy - TecnaVision Distributors",
  description:
    "Find authorized TecnaVision distributors across the United States for IP cameras, NVRs, and security solutions.",
  alternates: {
    canonical: "/where-to-buy",
  },
  openGraph: {
    title: "Where to Buy - TecnaVision Distributors",
    description:
      "Find authorized TecnaVision distributors across the United States for IP cameras, NVRs, and security solutions.",
    url: "/where-to-buy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Where to Buy - TecnaVision Distributors",
    description:
      "Find authorized TecnaVision distributors across the United States for IP cameras, NVRs, and security solutions.",
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

export default async function WhereToBuyPage() {
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
    const allDistributors = await prisma.distributor.findMany({
      where: {
        isActive: true,
      },
      select: DISTRIBUTOR_SELECT,
      orderBy: {
        name: "asc",
      },
    });

    initialDistributors = allDistributors.filter((item) => isUnitedStates(item.country));
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
      country: US_COUNTRY,
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
      <WhereToBuyClient initialDistributors={initialDistributors} />
    </>
  );
}
