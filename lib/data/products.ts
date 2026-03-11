export type ProductTag = "best-seller" | "romantic-gift" | "new" | "popular";

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  category: "lingerie-sets" | "bras" | "sleepwear" | "panties";
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
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    ],
    description:
      "An exquisite ivory lace lingerie set featuring delicate floral motifs and French lace trim. The matching bra and panty set is crafted from premium soft-touch fabric for all-day comfort. Perfect for brides or romantic occasions.",
    descriptionAr:
      "طقم ملابس داخلية عاجي دانتيل بأناقة مع زخارف زهرية رقيقة وتفاصيل فرنسية. مصنوع من أقمشة فاخرة مريحة طوال اليوم. مثالي للعروس أو المناسبات الرومانسية.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["best-seller", "romantic-gift", "new"],
    featured: true,
  },
  {
    id: "2",
    name: "Champagne Silk Set",
    nameAr: "طقم حرير شامبانيا",
    price: 95,
    category: "lingerie-sets",
    image: "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
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
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    ],
    description:
      "A romantic blush pink lingerie set with delicate lace overlay and comfortable stretch fabric. The underwire bra offers gentle support while the high-waist brief provides a flattering silhouette. Ideal for everyday elegance.",
    descriptionAr:
      "طقم ملابس داخلية وردي رومانسي مع قماش دانتيل رقيق ومريح. حمالة الصدر توفر دعم لطيف والسروال عالي الخصر يعطي ظل أنيق. مثالي للأناقة اليومية.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["best-seller", "popular"],
    featured: false,
  },
  // Bras
  {
    id: "4",
    name: "Rose Blush Underwire",
    nameAr: "حمالة صدر وردية",
    price: 45,
    category: "bras",
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
    ],
    description:
      "Soft rose blush underwire bra with comfortable support and adjustable straps. Features padded cups and a seamless design that disappears under clothing. Our most popular everyday bra.",
    descriptionAr:
      "حمالة صدر وردية ناعمة مع سلك داعم مريح وأحزمة قابلة للتعديل. كوبات مبطنة وتصميم سلس يختفي تحت الملابس. حمالة الصدر الأكثر مبيعاً للاستخدام اليومي.",
    sizes: ["32A", "32B", "34A", "34B", "34C", "36B", "36C"],
    tags: ["best-seller", "popular"],
    featured: true,
  },
  {
    id: "5",
    name: "Gold Trim Bralette",
    nameAr: "براليت ذهبي",
    price: 52,
    category: "bras",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
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
    image: "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
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
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
    description:
      "Dreamy bridal lingerie in pure white. Intricate floral lace with pearl embellishments. Longline bra and garter belt included. The ultimate wedding night essential.",
    descriptionAr:
      "ملابس داخلية عروس بيضاء نقية. دانتيل زهري مع زخارف لؤلؤية. حمالة طويلة وحزام جارتر. ضروري لليلة العرس.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift", "best-seller", "new"],
    featured: true,
  },
  {
    id: "31",
    name: "Lace High-Waist Brief",
    nameAr: "سروال دانتيل عالي الخصر",
    price: 32,
    category: "panties",
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop", "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
    description:
      "Delicate lace high-waist brief. Comfortable cotton gusset. Pairs perfectly with any bra. Available in ivory, blush, and black.",
    descriptionAr:
      "سروال دانتيل عالي الخصر رقيق. قطنة مريحة في المنتصف. يتناسق مع أي حمالة. متوفر بالعاجي والوردي والأسود.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["new", "best-seller"],
    featured: true,
  },
  {
    id: "32",
    name: "Silk French Knicker",
    nameAr: "سروال فرنسي حريري",
    price: 38,
    category: "panties",
    image: "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop"],
    description:
      "Elegant silk French knicker with lace trim. Luxurious feel. Part of our romantic collection.",
    descriptionAr:
      "سروال فرنسي حريري أنيق مع دانتيل. ملمس فاخر. جزء من مجموعتنا الرومانسية.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift", "popular"],
    featured: true,
  },
  {
    id: "33",
    name: "Seamless Thong",
    nameAr: "ثونج سلس",
    price: 24,
    category: "panties",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
    description:
      "Invisible seamless thong. No visible lines. The everyday essential. Available in nude, black, white.",
    descriptionAr:
      "ثونج سلس غير مرئي. بدون خطوط ظاهرة. الأساسي اليومي. متوفر بلون البشرة والأسود والأبيض.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["best-seller"],
    featured: false,
  },
  {
    id: "34",
    name: "Bikini with Bow",
    nameAr: "بيكيني مع ربطة",
    price: 28,
    category: "panties",
    image: "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop"],
    description:
      "Cute bikini cut with delicate bow detail. Soft stretch fabric. A feminine everyday choice.",
    descriptionAr:
      "قطع بيكيني لطيف مع تفصيل ربطة رقيق. قماش ممتد ناعم. خيار أنثوي يومي.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["new"],
    featured: false,
  },
  {
    id: "11",
    name: "Nude Comfort Set",
    nameAr: "طقم راحة بلون البشرة",
    price: 68,
    category: "lingerie-sets",
    image: "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
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
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop"],
    description:
      "Opulent velvet night dress with deep V-neck. Mid-length hem. Gold button accents. A winter-ready piece that feels incredibly luxurious against skin.",
    descriptionAr:
      "فستان نوم مخملي فاخر مع خط عنق V عميق. ذيل منتصف الطول. أزرار ذهبية. قطعة شتوية تشعر بالفخامة على البشرة.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift", "best-seller", "new"],
    featured: true,
  },
  // More Lingerie Sets
  {
    id: "19",
    name: "Plum Lace Duo",
    nameAr: "طقم دانتيل بلون البرقوق",
    price: 92,
    category: "lingerie-sets",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
    description:
      "Romantic plum lace bra and brief set with scalloped edges. Soft mesh lining and adjustable straps. A luxurious choice for special moments.",
    descriptionAr:
      "طقم حمالة وسروال دانتيل بلون البرقوق بحواف متموجة. بطانة شبكية ناعمة وأحزمة قابلة للتعديل. خيار فاخر للحظات خاصة.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["romantic-gift"],
    featured: false,
  },
  {
    id: "20",
    name: "Coral Sheer Set",
    nameAr: "طقم مرجاني شفاف",
    price: 86,
    category: "lingerie-sets",
    image: "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop"],
    description:
      "Delicate coral sheer set with embroidered details. Breathable and lightweight. Perfect for warmer days and romantic getaways.",
    descriptionAr:
      "طقم مرجاني شفاف رقيق مع تفاصيل مطرزة. منفس وخفيف. مثالي للأيام الدافئة والرحلات الرومانسية.",
    sizes: ["S", "M", "L"],
    tags: ["best-seller"],
    featured: true,
  },
  {
    id: "21",
    name: "Emerald Silk Bralette Set",
    nameAr: "طقم براليت حريري زمردي",
    price: 102,
    category: "lingerie-sets",
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop"],
    description:
      "Stunning emerald green silk bralette with matching high-waist panty. Bold and luxurious. Makes a striking statement.",
    descriptionAr:
      "براليت حريري زمردي مذهل مع سروال عالي الخصر مطابق. جريء وفاخر. يترك أثراً قوياً.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift"],
    featured: false,
  },
  // More Bras
  {
    id: "22",
    name: "Nude T-Shirt Bra",
    nameAr: "حمالة تي شيرت بلون البشرة",
    price: 44,
    category: "bras",
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop"],
    description:
      "Invisible under any top. Smooth molded cups and seamless design. The everyday staple every wardrobe needs.",
    descriptionAr:
      "غير مرئية تحت أي بلوزة. كوبات مصبوبة سلسة وتصميم بدون لحامات. الأساسي اليومي الذي تحتاجه كل خزانة.",
    sizes: ["32A", "32B", "34A", "34B", "34C", "36B", "36C", "38C"],
    tags: ["best-seller"],
    featured: true,
  },
  {
    id: "23",
    name: "Lace Balconette Bra",
    nameAr: "حمالة بالكونيت دانتيل",
    price: 58,
    category: "bras",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
    description:
      "Classic balconette style with delicate lace. Lifts and shapes naturally. Perfect for sweetheart necklines.",
    descriptionAr:
      "تصميم بالكونيت كلاسيكي مع دانتيل رقيق. يرفع ويعطي شكلاً طبيعياً. مثالي لخطوط العنق الحلوة.",
    sizes: ["32B", "32C", "34B", "34C", "36B", "36C"],
    tags: ["romantic-gift"],
    featured: false,
  },
  {
    id: "24",
    name: "Strapless Wonder",
    nameAr: "حمالة بلا أكتاف",
    price: 62,
    category: "bras",
    image: "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop"],
    description:
      "Convertible strapless with silicone grip. Stays put all day. Ideal for off-shoulder and backless outfits.",
    descriptionAr:
      "حمالة بدون أكتاف قابلة للتحويل مع قبضة سيليكون. تظل ثابتة طوال اليوم. مثالية للفساتين ذات الأكتاف العارية والظهر المفتوح.",
    sizes: ["32B", "32C", "34B", "34C", "36B", "36C"],
    tags: ["best-seller"],
    featured: false,
  },
  // More Sleepwear
  {
    id: "25",
    name: "Bamboo Sleep Set",
    nameAr: "طقم نوم بامبو",
    price: 65,
    category: "sleepwear",
    image: "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop"],
    description:
      "Eco-friendly bamboo viscose cami and shorts set. Soft, breathable, and temperature-regulating. Sustainable luxury.",
    descriptionAr:
      "طقم كامي وشورت من بامبو صديق للبيئة. ناعم ومنفس ومنظم للحرارة. فخامة مستدامة.",
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["best-seller"],
    featured: false,
  },
  {
    id: "26",
    name: "Short Satin Slip",
    nameAr: "قميص قصير ساتان",
    price: 72,
    category: "sleepwear",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
    description:
      "Short slip in luxurious satin. Slit detail at the side. Perfect for layering or wearing alone on warm nights.",
    descriptionAr:
      "قميص قصير من ساتان فاخر. تفصيل شق على الجانب. مثالي للطبقات أو للبس وحده في الليالي الدافئة.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift"],
    featured: true,
  },
  {
    id: "27",
    name: "Cropped Pajama Top & Shorts",
    nameAr: "بلوزة وبنطلون نوم قصير",
    price: 55,
    category: "sleepwear",
    image: "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=400&h=500&fit=crop"],
    description:
      "Cute cropped pajama top with matching shorts. Lightweight cotton blend. Adorable for sleepovers and cozy nights.",
    descriptionAr:
      "بلوزة نوم قصيرة لطيفة مع شورت مطابق. قطن ممزوج خفيف. جميل للحفلات المنزلية والليالي المريحة.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["best-seller"],
    featured: false,
  },
  {
    id: "28",
    name: "Long Satin Gown",
    nameAr: "فستان نوم طويل ساتان",
    price: 108,
    category: "sleepwear",
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=400&h=500&fit=crop"],
    description:
      "Floor-length satin gown with spaghetti straps. Elegant and luxurious. The ultimate indulgence for bedtime.",
    descriptionAr:
      "فستان نوم ساتان طويل بأكتاف رفيعة. أنيق وفاخر. المتعة القصوى لوقت النوم.",
    sizes: ["S", "M", "L", "XL"],
    tags: ["romantic-gift", "best-seller"],
    featured: true,
  },
  {
    id: "29",
    name: "Scarf-Wrap Robe",
    nameAr: "رداء بالوشاح",
    price: 88,
    category: "sleepwear",
    image: "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=400&h=500&fit=crop"],
    description:
      "Elegant wrap robe with scarf collar. Lightweight fabric perfect for spa days or morning routines.",
    descriptionAr:
      "رداء أنيق مع طوق وشاح. قماش خفيف مثالي لأيام السبا أو الروتين الصباحي.",
    sizes: ["S", "M", "L"],
    tags: ["romantic-gift"],
    featured: false,
  },
  {
    id: "30",
    name: "Lace Bodysuit",
    nameAr: "بدلة دانتيل",
    price: 94,
    category: "lingerie-sets",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop",
    images: ["https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=400&h=500&fit=crop"],
    description:
      "Statement lace bodysuit with snap closure. Sophisticated one-piece design. Perfect under blazers or as a bold standalone.",
    descriptionAr:
      "بدلة دانتيل ملفتة مع إغلاق ب snaps. تصميم قطعة واحدة أنيق. مثالي تحت البلازرات أو كقطعة جريئة وحدها.",
    sizes: ["XS", "S", "M", "L"],
    tags: ["romantic-gift", "best-seller"],
    featured: true,
  },
];

export const categories = [
  {
    id: "lingerie-sets",
    slug: "lingerie-sets",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=600&h=600&fit=crop",
  },
  {
    id: "bras",
    slug: "bras",
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=600&h=600&fit=crop",
  },
  {
    id: "panties",
    slug: "panties",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=600&h=600&fit=crop",
  },
  {
    id: "sleepwear",
    slug: "sleepwear",
    image: "https://images.unsplash.com/photo-1709422122379-79776f76bd87?w=600&h=600&fit=crop",
  },
] as const;
