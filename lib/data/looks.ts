import type { Product } from "./products";
import { products } from "./products";

export interface Look {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  productIds: string[];
}

export const looks: Look[] = [
  {
    id: "1",
    name: "Ivory Romance",
    nameAr: "رومانسية عاجية",
    image: "https://images.unsplash.com/photo-1762195026689-fc8dea166b73?w=800&h=1000&fit=crop",
    productIds: ["1", "7", "15"],
  },
  {
    id: "2",
    name: "Champagne Evening",
    nameAr: "أمسية شامبانيا",
    image: "https://images.unsplash.com/photo-1750032542760-d161088a94a8?w=800&h=1000&fit=crop",
    productIds: ["2", "5", "29"],
  },
  {
    id: "3",
    name: "Blush & Lace",
    nameAr: "وردي ودانتيل",
    image: "https://images.unsplash.com/photo-1684712739479-2d95b85a165b?w=800&h=1000&fit=crop",
    productIds: ["3", "4", "17"],
  },
];

export function getLookProducts(look: Look): Product[] {
  return look.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p != null);
}
