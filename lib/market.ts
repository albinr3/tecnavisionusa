export const SUPPORTED_MARKETS = ["RD", "US"] as const;

export type MarketCode = (typeof SUPPORTED_MARKETS)[number];

const DEFAULT_MARKET: MarketCode = "US";

export function normalizeMarket(value: string | null | undefined): MarketCode | null {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  if (normalized === "RD" || normalized === "US") return normalized;
  return null;
}

export function getSiteMarket(): MarketCode {
  return (
    normalizeMarket(process.env.SITE_MARKET) ||
    normalizeMarket(process.env.NEXT_PUBLIC_SITE_MARKET) ||
    DEFAULT_MARKET
  );
}

export function sanitizeMarkets(value: unknown): MarketCode[] {
  if (!Array.isArray(value)) return [];

  const uniqueMarkets = new Set<MarketCode>();
  for (const item of value) {
    const market = normalizeMarket(typeof item === "string" ? item : "");
    if (market) uniqueMarkets.add(market);
  }

  return [...uniqueMarkets];
}
