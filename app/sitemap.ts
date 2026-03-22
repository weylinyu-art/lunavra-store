import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { getAllSlugs } from "@/lib/content/blog";

const BASE = "https://nilechic.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ar"];
  const staticPaths = ["", "/shop", "/search", "/gift", "/about", "/checkout", "/privacy", "/faq", "/blog"];
  const blogSlugs = getAllSlugs();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${BASE}/${locale}${path ? `/${path.replace(/^\//, "")}` : ""}/`,
        lastModified: new Date(),
        changeFrequency: path === "" || path === "/shop" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }
    for (const product of products) {
      entries.push({
        url: `${BASE}/${locale}/product/${product.id}/`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
    for (const slug of blogSlugs) {
      entries.push({
        url: `${BASE}/${locale}/blog/${slug}/`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }
  }

  return entries;
}
