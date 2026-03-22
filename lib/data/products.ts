export type ProductTag = "best-seller" | "romantic-gift" | "new" | "popular";

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  category: "lingerie-sets" | "bras" | "sleepwear" | "panties" | "bridal";
  image: string;
  images: string[];
  description: string;
  descriptionAr: string;
  sizes: string[];
  tags: ProductTag[];
  featured?: boolean;
  material?: string;
  materialAr?: string;
  care?: string;
  careAr?: string;
  /** Related product IDs for PDP recommendations */
  relatedIds?: string[];
  /** SEO / accessibility notes for gallery order (optional) */
  imageNotes?: string[];
}

function loadProducts(): Product[] {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("./products.generated.json") as Product[];
  } catch {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("./products.static.json") as Product[];
  }
}

export const products: Product[] = loadProducts();

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
  {
    id: "bridal",
    slug: "bridal",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=600&h=600&fit=crop",
  },
] as const;
