import { getContentfulClient } from "./client";
import type { Product } from "@/lib/data/products";
import type { ProductTag } from "@/lib/data/products";

interface ContentfulProduct {
  name: string;
  nameAr: string;
  price: number;
  category: string;
  image?: { fields?: { file?: { url?: string } } };
  images?: Array<{ fields?: { file?: { url?: string } } }>;
  description: string;
  descriptionAr: string;
  sizes: string[] | string;
  tags?: string[];
  featured?: boolean;
  material?: string;
  materialAr?: string;
  care?: string;
  careAr?: string;
}

function toHttps(url: string): string {
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url.startsWith("http") ? url : `https://${url}`;
}

function getImageUrl(img: ContentfulProduct["image"]): string {
  if (!img || typeof img !== "object") return "";
  const url = img.fields?.file?.url;
  return url ? toHttps(url) : "";
}

function getImagesUrls(imgs: ContentfulProduct["images"]): string[] {
  if (!Array.isArray(imgs)) return [];
  return imgs
    .map((i) => i?.fields?.file?.url)
    .filter((u): u is string => Boolean(u))
    .map(toHttps);
}

function toProduct(entry: { sys: { id: string }; fields: Record<string, unknown> }): Product {
  const f = entry.fields as unknown as ContentfulProduct;
  const mainImg = getImageUrl(f.image);
  const imgs = getImagesUrls(f.images);
  const imageList = imgs.length > 0 ? imgs : (mainImg ? [mainImg] : []);
  const tags = (f.tags ?? []).filter((t): t is ProductTag =>
    ["best-seller", "romantic-gift", "new", "popular"].includes(t)
  );

  return {
    id: entry.sys.id,
    name: f.name ?? "",
    nameAr: f.nameAr ?? "",
    price: Number(f.price) ?? 0,
    category: (f.category as Product["category"]) ?? "lingerie-sets",
    image: mainImg || imageList[0] || "",
    images: imageList,
    description: f.description ?? "",
    descriptionAr: f.descriptionAr ?? "",
    sizes: Array.isArray(f.sizes) ? f.sizes : (typeof f.sizes === "string" ? f.sizes.split(",").map((s) => s.trim()) : []),
    tags,
    featured: Boolean(f.featured),
    material: f.material,
    materialAr: f.materialAr,
    care: f.care,
    careAr: f.careAr,
  };
}

export async function fetchProductsFromContentful(): Promise<Product[]> {
  const client = getContentfulClient();
  if (!client) return [];

  const res = await client.getEntries({
    content_type: "product",
    order: ["fields.name"],
    include: 2, // resolve linked assets (images)
  });

  return res.items.map(toProduct);
}
