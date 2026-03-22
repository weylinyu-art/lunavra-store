#!/usr/bin/env node
/**
 * Sync products from Contentful (or fallback to static) into lib/data/products.generated.json
 * Run before build: npm run sync-contentful && npm run build
 */
import { writeFileSync, readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "lib/data/products.generated.json");
const STATIC = join(ROOT, "lib/data/products.static.json");

async function fetchFromContentful() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!spaceId || !token) return null;

  const { createClient } = await import("contentful");
  const client = createClient({ space: spaceId, accessToken: token });
  const res = await client.getEntries({ content_type: "product", order: ["fields.name"], include: 2 });

  const toHttps = (u) => (u && (u.startsWith("//") ? `https:${u}` : u.startsWith("http") ? u : `https://${u}`)) || "";
  const tags = ["best-seller", "romantic-gift", "new", "popular"];

  return res.items.map((entry) => {
    const f = entry.fields;
    const img = f.image?.fields?.file?.url;
    const imgs = (f.images || []).map((i) => i?.fields?.file?.url).filter(Boolean).map(toHttps);
    const mainUrl = toHttps(img);
    const imageList = imgs.length ? imgs : (mainUrl ? [mainUrl] : []);
    const sizes = Array.isArray(f.sizes) ? f.sizes : (typeof f.sizes === "string" ? f.sizes.split(",").map((s) => s.trim()) : []);

    return {
      id: entry.sys.id,
      name: f.name || "",
      nameAr: f.nameAr || "",
      price: Number(f.price) || 0,
      category: f.category || "lingerie-sets",
      image: mainUrl || imageList[0] || "",
      images: imageList,
      description: f.description || "",
      descriptionAr: f.descriptionAr || "",
      sizes,
      tags: (f.tags || []).filter((t) => tags.includes(t)),
      featured: Boolean(f.featured),
      material: f.material,
      materialAr: f.materialAr,
      care: f.care,
      careAr: f.careAr,
      fulfillmentOrigin:
        f.fulfillmentOrigin === "intl" || f.fulfillmentOrigin === "ksa-local" ? f.fulfillmentOrigin : undefined,
    };
  });
}

function getStatic() {
  if (existsSync(STATIC)) {
    return JSON.parse(readFileSync(STATIC, "utf-8"));
  }
  console.warn("No lib/data/products.static.json found. Run: npx tsx scripts/extract-static-products.mjs");
  return [];
}

async function main() {
  let products;
  try {
    products = await fetchFromContentful();
  } catch (e) {
    console.warn("Contentful fetch failed:", e.message);
  }
  if (!products || products.length === 0) {
    products = getStatic();
    console.log("Using static product data (" + products.length + " items)");
  } else {
    console.log("Synced " + products.length + " products from Contentful");
  }
  writeFileSync(OUT, JSON.stringify(products, null, 2));
}

main();
