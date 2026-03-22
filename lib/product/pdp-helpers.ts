import type { Product } from "@/lib/data/products";

/** Split CMS / copy on blank lines; otherwise single block. */
export function splitDescriptionParagraphs(text: string): string[] {
  const parts = text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [text.trim()];
}

export type KeyFeatureCopy = {
  keyFeatureNew: string;
  keyFeatureBestSeller: string;
  keyFeatureRomanticGift: string;
  keyFeaturePopular: string;
  keyFeatureFallback: string;
};

export function getKeyFeatureBullets(
  product: Product,
  locale: "en" | "ar",
  t: KeyFeatureCopy
): string[] {
  if (locale === "ar") {
    if (product.highlightsAr?.length) return product.highlightsAr;
    if (product.highlights?.length) return product.highlights;
  } else if (product.highlights?.length) {
    return product.highlights;
  }

  const out: string[] = [];
  const seen = new Set<string>();
  for (const tag of product.tags) {
    let line: string | undefined;
    if (tag === "new") line = t.keyFeatureNew;
    else if (tag === "best-seller") line = t.keyFeatureBestSeller;
    else if (tag === "romantic-gift") line = t.keyFeatureRomanticGift;
    else if (tag === "popular") line = t.keyFeaturePopular;
    if (line && !seen.has(line)) {
      seen.add(line);
      out.push(line);
    }
  }
  return out.length > 0 ? out : [t.keyFeatureFallback];
}
