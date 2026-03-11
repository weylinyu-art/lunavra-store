export type ProductTag = "best-seller" | "romantic-gift";

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  category: "lingerie-sets" | "bras" | "sleepwear";
  image: string;
  images: string[];
  description: string;
  descriptionAr: string;
  sizes: string[];
  tags: ProductTag[];
  featured?: boolean;
}

export const products: Product[] = [
  // Lingerie Sets
  {
    id: "1",
    name: "Ivory Lace Ensemble",
    nameAr: "طقم دانتيل عاجي",
    price: 89,
    category: "lingerie-sets",
    image: "https://placehold.co/400x500/F8E8E8/D4A5A5?text=Ivory+Lace",
    images: [
      "https://placehold.co/400x500/F8E8E8/D4A5A5?text=1",
      "https://placehold.co/400x500/FAF0E6/D4A5A5?text=2",
      "https://placehold.co/400x500/F5E6D3/D4A5A5?text=3",
    ],
    description:
      "An exquisite ivory lace lingerie set featuring delicate floral motifs and French lace trim. The matching bra and panty set is crafted from premium soft-touch fabric for all-day comfort. Perfect for brides or romantic occasions.",
    descriptionAr:
      "طقم ملابس داخلية عاجي دانتيل بأناقة مع زخارف زهرية رقيقة وتفاصيل فرنسية. مصنوع من أقمشة فاخرة مريحة طوال اليوم. مثالي للعروس أو المناسبات الرومانسية.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["best-seller", "romantic-gift"],
    featured: true,
  },
  {
    id: "2",
    name: "Champagne Silk Set",
    nameAr: "طقم حرير شامبانيا",
    price: 95,
    category: "lingerie-sets",
    image: "https://placehold.co/400x500/F5E6D3/C9A962?text=Champagne+Set",
    images: [
      "https://placehold.co/400x500/F5E6D3/C9A962?text=1",
      "https://placehold.co/400x500/FAF0E6/C9A962?text=2",
    ],
    description:
      "Luxurious champagne-colored silk lingerie set with gold accent details. The satin-finish fabric drapes beautifully and feels incredibly soft against skin. A sophisticated choice for anniversaries and special evenings.",
    descriptionAr:
      "طقم ملابس داخلية حريري بلون الشامبانيا مع تفاصيل ذهبية. قماش بلمسة حريرية يتدلى بأناقة وملمس ناعم جداً على البشرة. خيار أنيق للذكرى السنوية والأمسيات الخاصة.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift"],
    featured: true,
  },
  {
    id: "3",
    name: "Blush Rose Two-Piece",
    nameAr: "طقم وردي من قطعتين",
    price: 78,
    category: "lingerie-sets",
    image: "https://placehold.co/400x500/F8E8E8/E8C4C4?text=Blush+Rose",
    images: [
      "https://placehold.co/400x500/F8E8E8/E8C4C4?text=1",
      "https://placehold.co/400x500/FAE8EC/E8C4C4?text=2",
    ],
    description:
      "A romantic blush pink lingerie set with delicate lace overlay and comfortable stretch fabric. The underwire bra offers gentle support while the high-waist brief provides a flattering silhouette. Ideal for everyday elegance.",
    descriptionAr:
      "طقم ملابس داخلية وردي رومانسي مع قماش دانتيل رقيق ومريح. حمالة الصدر توفر دعم لطيف والسروال عالي الخصر يعطي ظل أنيق. مثالي للأناقة اليومية.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["best-seller"],
    featured: false,
  },
  // Bras
  {
    id: "4",
    name: "Rose Blush Underwire",
    nameAr: "حمالة صدر وردية",
    price: 45,
    category: "bras",
    image: "https://placehold.co/400x500/F8E8E8/D4A5A5?text=Rose+Bra",
    images: [
      "https://placehold.co/400x500/F8E8E8/D4A5A5?text=1",
      "https://placehold.co/400x500/FAF0E6/D4A5A5?text=2",
    ],
    description:
      "Soft rose blush underwire bra with comfortable support and adjustable straps. Features padded cups and a seamless design that disappears under clothing. Our most popular everyday bra.",
    descriptionAr:
      "حمالة صدر وردية ناعمة مع سلك داعم مريح وأحزمة قابلة للتعديل. كوبات مبطنة وتصميم سلس يختفي تحت الملابس. حمالة الصدر الأكثر مبيعاً للاستخدام اليومي.",
    sizes: ["32A", "32B", "34A", "34B", "34C", "36B", "36C"],
    tags: ["best-seller"],
    featured: true,
  },
  {
    id: "5",
    name: "Gold Trim Bralette",
    nameAr: "براليت ذهبي",
    price: 52,
    category: "bras",
    image: "https://placehold.co/400x500/FAF0E6/C9A962?text=Gold+Bralette",
    images: ["https://placehold.co/400x500/FAF0E6/C9A962?text=1"],
    description:
      "Delicate lace bralette with subtle gold accent trim. Wire-free comfort meets elegant design. Perfect for low-back outfits or relaxed evenings. Available in our signature ivory and champagne colors.",
    descriptionAr:
      "براليت دانتيل رقيق مع تفاصيل ذهبية أنيقة. راحة بدون سلك مع تصميم فخم. مثالي للملابس ذات الظهر المنخفض أو الأمسيات المريحة.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["romantic-gift"],
    featured: true,
  },
  {
    id: "6",
    name: "Ivory Seamless Bra",
    nameAr: "حمالة صدر عاجية سلسة",
    price: 48,
    category: "bras",
    image: "https://placehold.co/400x500/FFFEF9/D4A5A5?text=Ivory+Bra",
    images: ["https://placehold.co/400x500/FFFEF9/D4A5A5?text=1"],
    description:
      "Smooth ivory seamless bra with molded cups for a natural shape. Lightly padded for comfort without bulk. The ultimate everyday essential that pairs beautifully with any outfit.",
    descriptionAr:
      "حمالة صدر عاجية سلسة بكوبات مصبوبة لشكل طبيعي. مبطنة خفيفاً للراحة دون إ volume. الأساسي اليومي المثالي الذي يتناسق مع أي لباس.",
    sizes: ["32A", "32B", "34A", "34B", "34C", "36B", "36C"],
    tags: ["best-seller"],
    featured: false,
  },
  // Sleepwear
  {
    id: "7",
    name: "Silk Slip Nightgown",
    nameAr: "قميص نوم حريري",
    price: 85,
    category: "sleepwear",
    image: "https://placehold.co/400x500/F5E6D3/C9A962?text=Silk+Slip",
    images: [
      "https://placehold.co/400x500/F5E6D3/C9A962?text=1",
      "https://placehold.co/400x500/FAF0E6/C9A962?text=2",
    ],
    description:
      "Luxurious 100% mulberry silk slip nightgown with delicate lace trim at the neckline and hem. Lightweight and breathable for comfortable sleep. A timeless piece that makes every night feel special.",
    descriptionAr:
      "قميص نوم حريري فاخر 100% من حرير التوت مع دانتيل رقيق عند العنق والذيل. خفيف ومنفس للنوم المريح. قطعة خالدة تجعل كل ليلة مميزة.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["best-seller", "romantic-gift"],
    featured: true,
  },
  {
    id: "8",
    name: "Lace Trim Chemise",
    nameAr: "قميص دانتيل",
    price: 72,
    category: "sleepwear",
    image: "https://placehold.co/400x500/F8E8E8/D4A5A5?text=Lace+Chemise",
    images: [
      "https://placehold.co/400x500/F8E8E8/D4A5A5?text=1",
      "https://placehold.co/400x500/FAE8EC/D4A5A5?text=2",
    ],
    description:
      "Elegant chemise with flowing silhouette and delicate French lace detailing. Soft modal fabric feels like a second skin. Perfect as a romantic gift or for indulgent at-home evenings.",
    descriptionAr:
      "قميص أنيق بظل متدفق وتفاصيل دانتيل فرنسية رقيقة. قماش مودال ناعم يشعرك كالبشرة الثانية. مثالي كهدية رومانسية أو لأمسيات منزلية فاخرة.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift"],
    featured: false,
  },
];

export const categories = [
  { id: "lingerie-sets", slug: "lingerie-sets" },
  { id: "bras", slug: "bras" },
  { id: "sleepwear", slug: "sleepwear" },
] as const;
