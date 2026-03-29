import type { MarketCode } from "@/lib/market";

type LocalizableCategory = {
  name: string;
  name_es?: string | null;
  name_en?: string | null;
};

function clean(value: string | null | undefined) {
  return value?.trim() || "";
}

export function getLocalizedCategoryName(category: LocalizableCategory, market: MarketCode) {
  if (market === "RD") {
    return clean(category.name_es) || clean(category.name);
  }

  return clean(category.name_en) || clean(category.name);
}
