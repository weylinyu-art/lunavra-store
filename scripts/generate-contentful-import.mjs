#!/usr/bin/env node
/**
 * 生成 Contentful CLI 导入所需的 JSON 文件
 * 从 products.static.json 转换为 contentful-import 格式
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCALE = "en-US";

function getExt(url) {
  try {
    const path = new URL(url).pathname;
    const ext = path.split(".").pop()?.toLowerCase();
    return ext && ["jpg", "jpeg", "png", "gif", "webp"].includes(ext) ? ext : "jpg";
  } catch {
    return "jpg";
  }
}

function getContentType(url) {
  const ext = getExt(url);
  const map = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp" };
  return map[ext] || "image/jpeg";
}

const products = JSON.parse(readFileSync(join(__dirname, "..", "lib", "data", "products.static.json"), "utf-8"));

// 收集所有图片 URL，去重并建立 id 映射
const urlToId = new Map();
let assetIndex = 0;
for (const p of products) {
  const urls = [p.image, ...(p.images || [])].filter(Boolean);
  for (const u of urls) {
    if (!urlToId.has(u)) {
      urlToId.set(u, `asset-${++assetIndex}`);
    }
  }
}

// 生成 assets
const assets = [];
for (const [url, id] of urlToId) {
  const ext = getExt(url);
  const filename = `img-${id}.${ext}`;
  assets.push({
    sys: { id },
    fields: {
      title: { [LOCALE]: filename },
      file: {
        [LOCALE]: {
          url: url.startsWith("//") ? `https:${url}` : url,
          fileName: filename,
          contentType: getContentType(url),
        },
      },
    },
  });
}

// 生成 entries
const entries = [];
for (const p of products) {
  const imageUrls = [p.image, ...(p.images || [])].filter(Boolean);
  const mainImageId = imageUrls[0] ? urlToId.get(imageUrls[0]) : null;
  const imageIds = imageUrls.map((u) => urlToId.get(u)).filter(Boolean);

  const fields = {
    name: { [LOCALE]: p.name || "" },
    nameAr: { [LOCALE]: p.nameAr || "" },
    price: { [LOCALE]: p.price ?? 0 },
    category: { [LOCALE]: p.category || "lingerie-sets" },
    description: { [LOCALE]: p.description || "" },
    descriptionAr: { [LOCALE]: p.descriptionAr || "" },
    sizes: { [LOCALE]: Array.isArray(p.sizes) ? p.sizes : [] },
    tags: { [LOCALE]: Array.isArray(p.tags) ? p.tags : [] },
    featured: { [LOCALE]: Boolean(p.featured) },
    material: { [LOCALE]: p.material || "" },
    materialAr: { [LOCALE]: p.materialAr || "" },
    care: { [LOCALE]: p.care || "" },
    careAr: { [LOCALE]: p.careAr || "" },
  };
  if (mainImageId) {
    fields.image = { [LOCALE]: { sys: { type: "Link", linkType: "Asset", id: mainImageId } } };
  }
  if (imageIds.length > 0) {
    fields.images = {
      [LOCALE]: imageIds.map((id) => ({ sys: { type: "Link", linkType: "Asset", id } })),
    };
  }

  entries.push({
    sys: {
      id: `product-${p.id}`,
      contentType: { sys: { id: "product" } },
    },
    fields,
  });
}

const output = {
  contentTypes: [],
  entries,
  assets,
  locales: [{ code: LOCALE, name: "English (United States)", fallbackCode: null, default: true }],
  webhooks: [],
  roles: [],
  editorInterfaces: [],
};

const outPath = join(__dirname, "..", "contentful-import.json");
writeFileSync(outPath, JSON.stringify(output, null, 2), "utf-8");
console.log(`已生成 ${outPath}`);
console.log(`  - ${assets.length} 个图片资源`);
console.log(`  - ${entries.length} 个商品条目`);
