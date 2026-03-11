import { products, type Product } from "./data/products";
import type { Locale } from "./i18n/locale";

const categoryKeywords: Record<string, string[]> = {
  "lingerie-sets": ["lingerie", "set", "ensemble", "طقم", "دانتيل", "قطعتين"],
  bras: ["bra", "bralette", "حمالة", "صدر"],
  panties: ["panty", "panties", "ملابس داخلية", "سروال"],
  sleepwear: ["sleep", "nightgown", "chemise", "pajama", "لأنام", "قميص", "بيجاما"],
  bridal: ["bridal", "bride", "wedding", "عروس", "عرس"],
};

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((s) => s.length >= 2);
}

function matchText(text: string, tokens: string[]): boolean {
  const lower = text.toLowerCase();
  return tokens.some((t) => lower.includes(t));
}

export function searchProducts(q: string, locale: Locale): Product[] {
  const trimmed = q.trim();
  if (!trimmed) return [];
  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return [];

  return products.filter((p) => {
    if (matchText(p.name, tokens) || matchText(p.nameAr, tokens)) return true;
    const desc = locale === "ar" ? p.descriptionAr : p.description;
    if (matchText(desc, tokens)) return true;
    const catKeywords = categoryKeywords[p.category] ?? [];
    if (catKeywords.some((kw) => matchText(kw, tokens))) return true;
    const tagStr = (p.tags ?? []).join(" ");
    if (matchText(tagStr, tokens)) return true;
    if (matchText(p.category, tokens)) return true;
    return false;
  });
}
