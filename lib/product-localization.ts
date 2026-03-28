import type { MarketCode } from "@/lib/market";

type LocalizableProduct = {
  name: string;
  description: string | null;
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
