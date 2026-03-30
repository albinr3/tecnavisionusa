import type { MarketCode } from "@/lib/market";

type LocalizableProduct = {
  name: string;
  subtitle?: string | null;
  description: string | null;
  subtitle_es?: string | null;
  subtitle_en?: string | null;
  title_es?: string | null;
  title_en?: string | null;
  description_es?: string | null;
  description_en?: string | null;
};

function clean(value: string | null | undefined) {
  return value?.trim() || "";
}

export function getLocalizedProductName(product: LocalizableProduct, market: MarketCode) {
  if (market === "RD") {
    return clean(product.title_es) || product.name;
  }

  return clean(product.title_en) || product.name;
}

export function getLocalizedProductDescription(product: LocalizableProduct, market: MarketCode) {
  if (market === "RD") {
    return clean(product.description_es) || clean(product.description);
  }

  return clean(product.description_en) || clean(product.description);
}

export function getLocalizedProductSubtitle(product: LocalizableProduct, market: MarketCode) {
  if (market === "RD") {
    return clean(product.subtitle_es) || clean(product.subtitle);
  }

  return clean(product.subtitle_en) || clean(product.subtitle);
}
