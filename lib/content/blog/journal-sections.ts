import type { BlogPost } from "./types";

/** Modular Journal columns — each post maps to exactly one section for browsing. */
export type JournalSectionId = "fit" | "fabrics" | "style" | "occasion" | "brand";

export const JOURNAL_SECTION_ORDER: JournalSectionId[] = ["fit", "fabrics", "style", "occasion", "brand"];

export const SLUG_TO_JOURNAL_SECTION: Record<string, JournalSectionId> = {
  "minimalist-lingerie-capsule-wardrobe": "style",
  "silk-vs-satin-sleepwear": "fabrics",
  "modern-bra-fit-guide": "fit",
  "lace-lingerie-care-washing-storing": "fabrics",
  "bridal-lingerie-timeline": "occasion",
  "nude-tones-neutrals-power-move": "style",
  "european-inspired-silhouettes": "style",
  "confidence-in-fabric": "fabrics",
  "sheer-panels-strategic-coverage": "style",
  "bodysuits-beyond-basics": "style",
  "high-waist-briefs-support-shape": "fit",
  "psychology-private-elegance": "brand",
  "anniversary-gifting-lingerie": "occasion",
  "sleepwear-sets-travel-packing": "occasion",
  "strapless-convertible-bras-outfits": "fit",
  "embroidery-applique-craft-lingerie": "fabrics",
  "sustainable-luxury-intimates": "fabrics",
  "body-diversity-inclusive-fit-online": "fit",
  "lighting-lingerie-photography-mirror": "style",
  "mixing-textures-lace-mesh-silk": "fabrics",
  "lingerie-drawer-to-closet-cohesion": "style",
  "seasonal-fabrics-lingerie": "fabrics",
  "monochrome-lingerie-sets": "style",
  "stretch-lace-comfort": "fabrics",
  "corsetry-today-modern": "fit",
  "garters-hosiery-classic-accents": "style",
  "maternity-postpartum-intimates": "occasion",
  "athletic-influences-lingerie-design": "style",
  "quiet-luxury-aesthetic-lingerie": "brand",
  "measure-at-home-size-guide-companion": "fit",
  "nightgowns-vs-chemises": "occasion",
  "shopping-for-someone-else-lingerie": "occasion",
  "layering-lingerie-under-tailoring": "style",
  "color-theory-skin-undertones-lingerie": "style",
  "t-shirt-bra-evolution": "fit",
  "ruffles-soft-volume-lingerie": "style",
  "building-trust-brand-transparency": "brand",
  "capsule-bridal-trousseau": "occasion",
  "mesh-panels-ventilation-lingerie": "fabrics",
  "hand-wash-vs-machine-delicates": "fabrics",
  "thread-count-lace-quality": "fabrics",
  "everyday-elegance-baseline": "brand",
  "navigating-sale-seasons-lingerie": "style",
  "climate-fabric-hot-humid-days": "fabrics",
  "intimates-as-mood-dressing-inner-layer": "brand",
  "privacy-packaging-online-lingerie": "brand",
  "statement-straps-functional-design": "fit",
  "wardrobe-editing-lingerie-drawer": "style",
  "first-nilechic-order-expectations": "brand",
  "curated-confidence-nilechic-philosophy": "brand",
};

export function getSectionForSlug(slug: string): JournalSectionId {
  return SLUG_TO_JOURNAL_SECTION[slug] ?? "style";
}

export function groupPostsBySection(posts: BlogPost[]): Record<JournalSectionId, BlogPost[]> {
  const empty: Record<JournalSectionId, BlogPost[]> = {
    fit: [],
    fabrics: [],
    style: [],
    occasion: [],
    brand: [],
  };
  for (const p of posts) {
    const id = getSectionForSlug(p.slug);
    empty[id].push(p);
  }
  return empty;
}

export function getRelatedInSection(
  sectionId: JournalSectionId,
  posts: BlogPost[],
  excludeSlug: string,
  limit = 4
): BlogPost[] {
  return posts
    .filter((p) => getSectionForSlug(p.slug) === sectionId && p.slug !== excludeSlug)
    .slice(0, limit);
}
