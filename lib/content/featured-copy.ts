/** Short teasers for homepage featured grid (locale-specific). */
export const featuredCopy: Record<
  "en" | "ar",
  Record<string, { teaser: string; hoverHint: string }>
> = {
  en: {
    "1": {
      teaser: "French-inspired ivory lace with a featherlight feel—crafted for quiet confidence.",
      hoverHint: "Discover the full lace story",
    },
    "2": {
      teaser: "Champagne silk with a luminous drape—anniversary evenings, elevated.",
      hoverHint: "Explore silk tailoring",
    },
    "4": {
      teaser: "Rose blush support that disappears under tailoring—your everyday essential.",
      hoverHint: "See fit details",
    },
    "7": {
      teaser: "Mulberry silk slip: breathable, fluid, and made for restorative nights.",
      hoverHint: "Shop sleepwear",
    },
  },
  ar: {
    "1": {
      teaser: "دانتيل عاجي مستوحى من الطراز الفرنسي—خفيف وواثق.",
      hoverHint: "اكتشفي التفاصيل",
    },
    "2": {
      teaser: "حرير شامبانيا بلمعة ناعمة—لأمسيات لا تُنسى.",
      hoverHint: "استكشفي الحرير",
    },
    "4": {
      teaser: "دعم وردي يختفي تحت الملابس—أساس يومي.",
      hoverHint: "تفاصيل المقاس",
    },
    "7": {
      teaser: "قميص حرير طبيعي—مريح وأنيق للنوم.",
      hoverHint: "تسوقي ملابس النوم",
    },
  },
};

export const featuredProductIds = ["1", "2", "4", "7"] as const;
