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
  // Additional Lingerie Sets
  {
    id: "9",
    name: "Black Elegance Set",
    nameAr: "طقم أناقة أسود",
    price: 98,
    category: "lingerie-sets",
    image: "https://placehold.co/400x500/2C2C2C/C9A962?text=Black+Set",
    images: ["https://placehold.co/400x500/2C2C2C/C9A962?text=1"],
    description:
      "Stunning black lace lingerie set with gold accents. Premium stretch lace hugs curves beautifully. Push-up bra with matching high-waist thong. A bold statement piece for confident evenings.",
    descriptionAr:
      "طقم دانتيل أسود مذهل مع لمسات ذهبية. دانتيل ممتد فاخر يلائم المنحنيات بأناقة. حمالة صدر رافع مع ثونج عالي الخصر. قطعة جريئة للأمسيات الواثقة.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["romantic-gift"],
    featured: true,
  },
  {
    id: "10",
    name: "Bridal White Collection",
    nameAr: "مجموعة العروس البيضاء",
    price: 125,
    category: "lingerie-sets",
    image: "https://placehold.co/400x500/FFFEF9/D4A5A5?text=Bridal",
    images: ["https://placehold.co/400x500/FFFEF9/D4A5A5?text=1"],
    description:
      "Dreamy bridal lingerie in pure white. Intricate floral lace with pearl embellishments. Longline bra and garter belt included. The ultimate wedding night essential.",
    descriptionAr:
      "ملابس داخلية عروس بيضاء نقية. دانتيل زهري مع زخارف لؤلؤية. حمالة طويلة وحزام جارتر. ضروري لليلة العرس.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift", "best-seller"],
    featured: true,
  },
  {
    id: "11",
    name: "Nude Comfort Set",
    nameAr: "طقم راحة بلون البشرة",
    price: 68,
    category: "lingerie-sets",
    image: "https://placehold.co/400x500/F5E6D3/D4A5A5?text=Nude+Set",
    images: ["https://placehold.co/400x500/F5E6D3/D4A5A5?text=1"],
    description:
      "Skin-tone lingerie that disappears under any outfit. Seamless microfiber fabric. Non-padded wireless bra with matching brief. Perfect for everyday invisibility.",
    descriptionAr:
      "ملابس داخلية بلون البشرة تختفي تحت أي لباس. قماش ميكروفايبر سلس. حمالة لاسلكية بدون بطانة مع سروال مطابق. مثالي للاختفاء اليومي.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["best-seller"],
    featured: false,
  },
  // Additional Bras
  {
    id: "12",
    name: "Push-Up Plunge Bra",
    nameAr: "حمالة صدر غاطسة رافعة",
    price: 55,
    category: "bras",
    image: "https://placehold.co/400x500/F8E8E8/E8C4C4?text=Plunge+Bra",
    images: ["https://placehold.co/400x500/F8E8E8/E8C4C4?text=1"],
    description:
      "Dramatic plunge neckline with enhanced lift. Perfect for low-cut tops and dresses. Contour padding creates natural shape. Available in black, nude, and blush.",
    descriptionAr:
      "خط عنق غاطس مع رفع محسّن. مثالي للتيشيرتات والفساتين المفتوحة. بطانة كنتور تعطي شكلاً طبيعياً. متوفر بالأسود واللون الطبيعي والوردي.",
    sizes: ["32B", "32C", "34B", "34C", "36B", "36C"],
    tags: ["best-seller"],
    featured: true,
  },
  {
    id: "13",
    name: "Sports Comfort Bra",
    nameAr: "حمالة صدر رياضية مريحة",
    price: 42,
    category: "bras",
    image: "https://placehold.co/400x500/FAF8F5/D4A5A5?text=Sports+Bra",
    images: ["https://placehold.co/400x500/FAF8F5/D4A5A5?text=1"],
    description:
      "Light support bralette ideal for yoga and lounging. Soft bamboo blend fabric. Racerback design. Breathable and comfortable for all-day wear.",
    descriptionAr:
      "براليت دعم خفيف مثالي لليوجا والراحة. قماش بامبو ناعم. تصميم راسرباك. منفس ومريح للبس طوال اليوم.",
    sizes: ["XS", "S", "M", "L"],
    tags: [],
    featured: false,
  },
  {
    id: "14",
    name: "Sheer Mesh Longline",
    nameAr: "حمالة طويلة شفافة",
    price: 65,
    category: "bras",
    image: "https://placehold.co/400x500/FFFEF9/C9A962?text=Longline",
    images: ["https://placehold.co/400x500/FFFEF9/C9A962?text=1"],
    description:
      "Elegant sheer mesh longline bra with underwire. Extends to waist for a smooth silhouette. Delicate lace cups. A vintage-inspired statement piece.",
    descriptionAr:
      "حمالة طويلة شفافة أنيقة مع سلك داعم. تمتد للخصر لظل سلس. كوبات دانتيل رقيقة. قطعة مستوحاة من الفينتاج.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift"],
    featured: false,
  },
  // Additional Sleepwear
  {
    id: "15",
    name: "Satin Robe",
    nameAr: "رداء ساتان",
    price: 78,
    category: "sleepwear",
    image: "https://placehold.co/400x500/F8E8E8/C9A962?text=Satin+Robe",
    images: ["https://placehold.co/400x500/F8E8E8/C9A962?text=1"],
    description:
      "Luxurious satin robe with tie waist. Lightweight and perfect for layering over lingerie. Available in blush, champagne, and black. Makes getting ready feel indulgent.",
    descriptionAr:
      "رداء ساتان فاخر مع ربط عند الخصر. خفيف ومثالي للطبقات فوق الملابس الداخلية. متوفر بالوردي والشامبانيا والأسود. يجعل الاستعداد ممتعاً.",
    sizes: ["S", "M", "L", "XL"],
    tags: ["romantic-gift"],
    featured: true,
  },
  {
    id: "16",
    name: "Cotton Pajama Set",
    nameAr: "طقم بيجاما قطني",
    price: 58,
    category: "sleepwear",
    image: "https://placehold.co/400x500/FAF8F5/E8C4C4?text=Pajama+Set",
    images: ["https://placehold.co/400x500/FAF8F5/E8C4C4?text=1"],
    description:
      "Cozy cotton pajama set with button-down top and relaxed pants. Classic striped design. Breathable for year-round comfort. Perfect for lazy mornings.",
    descriptionAr:
      "طقم بيجاما قطني مريح مع بلوزة أزرار وسراويل مريحة. تصميم مخطط كلاسيكي. منفس للراحة طوال السنة. مثالي للصباح البطيء.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["best-seller"],
    featured: false,
  },
  {
    id: "17",
    name: "Lace Kimono",
    nameAr: "كيمونو دانتيل",
    price: 82,
    category: "sleepwear",
    image: "https://placehold.co/400x500/F5E6D3/D4A5A5?text=Lace+Kimono",
    images: ["https://placehold.co/400x500/F5E6D3/D4A5A5?text=1"],
    description:
      "Elegant lace trim kimono in flowing chiffon. Three-quarter sleeves. Floral lace detailing along the front. A versatile piece for at-home glamour.",
    descriptionAr:
      "كيمونو دانتيل أنيق بقماش شيفون متدفق. أكمام ثلاثة أرباع. تفاصيل دانتيل زهرية على الأمام. قطعة متعددة الاستخدامات للأناقة المنزلية.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift"],
    featured: false,
  },
  {
    id: "18",
    name: "Velvet Night Dress",
    nameAr: "فستان نوم مخملي",
    price: 95,
    category: "sleepwear",
    image: "https://placehold.co/400x500/4A4A4A/C9A962?text=Velvet+Dress",
    images: ["https://placehold.co/400x500/4A4A4A/C9A962?text=1"],
    description:
      "Opulent velvet night dress with deep V-neck. Mid-length hem. Gold button accents. A winter-ready piece that feels incredibly luxurious against skin.",
    descriptionAr:
      "فستان نوم مخملي فاخر مع خط عنق V عميق. ذيل منتصف الطول. أزرار ذهبية. قطعة شتوية تشعر بالفخامة على البشرة.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift", "best-seller"],
    featured: true,
  },
];

export const categories = [
  { id: "lingerie-sets", slug: "lingerie-sets" },
  { id: "bras", slug: "bras" },
  { id: "sleepwear", slug: "sleepwear" },
] as const;
